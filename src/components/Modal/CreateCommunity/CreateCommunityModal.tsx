import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalCloseButton,
  Box,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  Textarea,
  Divider,
  Text,
  Stack,
  Checkbox,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { auth, firestore } from "@/src/firebase/clientApp";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import useDirectory from "@/src/hooks/useDirectory";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toggleMenuOpen } = useDirectory();

  const handleCommunityNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value.length > 21) return;
    setCommunityName(e.target.value);
    setCharsRemaining(21 - e.target.value.length);
  };

  const onCommunityTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityType(e.target.name);
  };

  const handleCreateCommunity = async () => {
    if (error) setError("");
    // Validate community name
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "O nome da comunidade deve ter pelo menos 3 caracteres e não pode conter caracteres especiais"
      );
      return;
    }

    setLoading(true);

    try {
      // Create community
      const communityDocRef = doc(firestore, "communities", communityName);

      await runTransaction(firestore, async (transaction) => {
        // Check if community already exists
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(
            `Desculpe, mas a comunidade c/${communityName} já existe. Tente outro nome.`
          );
        }
        // Create community
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        // Create communitySnippet on user
        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          {
            communityId: communityName,
            isModerator: true,
          }
        );
      });
      handleClose();
      toggleMenuOpen();
      router.push(`/c/${communityName}`);
    } catch (error: any) {
      console.error("handleCreateCommunity error: ", error);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={open} onClose={handleClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display="flex"
          flexDirection="column"
          fontSize={15}
          padding={3}
        >
          Criar Comunidade
        </ModalHeader>
        <Box pl={3} pr={3}>
          <Divider />
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" padding="10px 0px">
            <Text fontWeight={600} fontSize={15}>
              Nome da Comunidade
            </Text>
            <Text fontSize={11} color="gray.500">
              Nomes de comunidade não podem ser alterados, inclusive quanto ao
              uso de letras maiúsculas.
            </Text>
            <Text
              position="relative"
              top="28px"
              left="10px"
              width="20px"
              color={"gray.400"}
            >
              c/
            </Text>
            <Input
              position="relative"
              value={communityName}
              size="sm"
              pl="22px"
              onChange={handleCommunityNameChange}
            />
            <Text
              fontSize="9pt"
              color={charsRemaining === 0 ? "red" : "gray.500"}
            >
              {charsRemaining < 0 ? 0 : charsRemaining} caracteres restantes
            </Text>
            <Text fontSize="9pt" color="red">
              {error}
            </Text>
            <Box mt={4} mb={4}>
              <Text fontWeight={600} fontSize={15}>
                Tipo de Comunidade
              </Text>
              <Stack spacing={2}>
                <Checkbox
                  name="public"
                  isChecked={communityType === "public"}
                  onChange={onCommunityTypeChange}
                >
                  <Flex align="center">
                    <Icon
                      as={BsFillPersonFill}
                      fontSize={20}
                      mr={2}
                      color="gray.500"
                    />
                    <Text fontSize="10pt" mr={1}>
                      Público
                    </Text>
                    <Text fontSize="8pt" color="gray.500" pt={1}>
                      Qualquer um pode ver, postar e comentar nesta comunidade
                    </Text>
                  </Flex>
                </Checkbox>
                <Checkbox
                  name="restricted"
                  isChecked={communityType === "restricted"}
                  onChange={onCommunityTypeChange}
                >
                  <Flex align="center">
                    <Icon
                      as={BsFillEyeFill}
                      fontSize={20}
                      mr={2}
                      color="gray.500"
                    />
                    <Text fontSize="10pt" mr={1}>
                      Restrito
                    </Text>
                    <Text fontSize="8pt" color="gray.500" pt={1}>
                      Qualquer pessoa pode visualizar esta comunidade, mas
                      somente usuários aprovados podem postar
                    </Text>
                  </Flex>
                </Checkbox>
                <Checkbox
                  name="private"
                  isChecked={communityType === "private"}
                  onChange={onCommunityTypeChange}
                >
                  <Flex align="center">
                    <Icon
                      as={HiLockClosed}
                      fontSize={20}
                      mr={2}
                      color="gray.500"
                    />
                    <Text fontSize="10pt" mr={1}>
                      Privado
                    </Text>
                    <Text fontSize="8pt" color="gray.500" pt={1}>
                      Somente usuários aprovados podem ver e postar nesta
                      comunidade
                    </Text>
                  </Flex>
                </Checkbox>
              </Stack>
            </Box>
          </ModalBody>
        </Box>
        <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
          <Button variant="outline" height="30px" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            height="30px"
            onClick={handleCreateCommunity}
            isLoading={loading}
          >
            Criar Comunidade
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default CreateCommunityModal;
