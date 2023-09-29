import { Community, communityState } from "@/src/atoms/communitiesAtom";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  Image,
  Spinner,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { RiCakeLine } from "react-icons/ri";
import moment from "moment";
import "moment/locale/pt-br";
import { useRouter } from "next/router";
import { auth, firestore, storage } from "@/src/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import useSelectFile from "@/src/hooks/useSelectFile";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useSetRecoilState } from "recoil";

type AboutProps = {
  communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const [uploadingImage, setUploadingImage] = useState(false);
  const setCommunityStateValue = useSetRecoilState(communityState);

  const onUpdateImage = async () => {
    if (!selectedFile) return;
    setUploadingImage(true);
    try {
      const imageRef = ref(storage, `communities/${communityData.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadUrl = await getDownloadURL(imageRef);
      await updateDoc(doc(firestore, "communities", communityData.id), {
        ImageUrl: downloadUrl,
      });

      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          ImageUrl: downloadUrl,
        } as Community,
      }));
    } catch (error) {
      console.log("onUpdateImage error", error);
    }
    setUploadingImage(false);
  };

  return (
    <Box position="sticky" top="14px">
      <Flex
        justify="space-between"
        align="center"
        bg="primary"
        color="white"
        p={3}
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontSize="10pt" fontWeight={700}>
          Sobre a comunidade
        </Text>
      </Flex>
      <Flex
        direction="column"
        p={3}
        bg="secondary"
        borderRadius="0px 0px 4px 4px"
      >
        <Stack>
          <Flex width="100%" p={2} fontSize="10pt" fontWeight={700}>
            <Flex direction="column" flexGrow={1} color="white">
              <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
              <Text>
                {communityData.numberOfMembers > 1 ? "Membros" : "Membro"}
              </Text>
            </Flex>
            <Flex direction="column" flexGrow={1} color="white">
              <Text>10</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex
            align="center"
            width="100%"
            p={1}
            fontWeight={500}
            fontSize="10pt"
            color="white"
          >
            <Icon as={RiCakeLine} fontSize={18} mr={2} />
            {communityData.createdAt && (
              <Text>
                Criado em{" "}
                {moment(new Date(communityData.createdAt.seconds * 1000))
                  .locale("pt-br")
                  .format("DD/MM/YYYY")}
              </Text>
            )}
          </Flex>
          <Link
            href={`/c/${communityData.id}/submit`}
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            <Button
              mt={3}
              height="30px"
              bg="primary"
              color="secondary"
              _hover={{
                backgroundColor: "primary_hover",
                color: "white",
              }}
            >
              Criar Post
            </Button>
          </Link>
          {user?.uid === communityData.creatorId && (
            <>
              <Divider />
              <Stack spacing={1} fontSize="10pt">
                <Text fontWeight={600}>Administrador</Text>
                <Flex align="center" justify="space-between">
                  <Text
                    color="primary"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => selectedFileRef.current?.click()}
                  >
                    Mudar imagem
                  </Text>
                  {communityData.ImageUrl || selectedFile ? (
                    <Image
                      src={selectedFile || communityData.ImageUrl}
                      borderRadius="full"
                      boxSize="40px"
                      alt="imagem da comunidade"
                    />
                  ) : (
                    <Image
                      src="/images/ArenaRPGLogo.svg"
                      height="44px"
                      cursor="pointer"
                      alt="imagem da comunidade"
                    />
                  )}
                </Flex>
                {selectedFile &&
                  (uploadingImage ? (
                    <Spinner />
                  ) : (
                    <Text
                      cursor="pointer"
                      onClick={onUpdateImage}
                      color="primary_hover"
                    >
                      Salvar mudanças
                    </Text>
                  ))}
                <input
                  id="file-upload"
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  hidden
                  ref={selectedFileRef}
                  onChange={onSelectFile}
                />
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
export default About;
