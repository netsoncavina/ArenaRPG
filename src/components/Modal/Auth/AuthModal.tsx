import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";
import React, { use, useEffect } from "react";
import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import { authModalState } from "@/src/atoms/authModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import ResetPassword from "./ResetPassword";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);
  const isDevolopment = process.env.NEXT_PUBLIC_IS_DEVELOPMENT;

  const handleClose = () => {
    setModalState((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (user) handleClose();
    console.log(isDevolopment);
  }, [user]);

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        {isDevolopment == "true" ? (
          <ModalContent>
            <ModalHeader textAlign="center">
              {modalState.view === "login" && "Login"}
              {modalState.view === "signup" && "Cadastro"}
              {modalState.view === "resetPassword" && "Redefinir senha"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              pb={6}
            >
              <Flex
                direction="column"
                align="center"
                justify="center"
                width="70%"
              >
                {modalState.view === "login" || modalState.view === "signup" ? (
                  <>
                    <OAuthButtons />
                    <Text color="gray.500" fontWeight={700}>
                      OU
                    </Text>
                    <AuthInputs />
                  </>
                ) : (
                  <ResetPassword />
                )}
              </Flex>
            </ModalBody>
          </ModalContent>
        ) : (
          <ModalContent
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            pb={6}
            bg="secondary"
            width="80%"
          >
            <ModalHeader
              textAlign="center"
              pt={10}
              color="primary"
              fontSize={20}
            >
              Aguarde, estamos em desenvolvimento!
            </ModalHeader>
            <ModalCloseButton color="primary" />
            <ModalBody
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              pb={6}
            >
              <Flex
                direction="column"
                align="center"
                justify="center"
                width="70%"
              >
                <Image
                  src="/images/arena_rpg_icone.png"
                  alt="Arena RPG Logo"
                  width={200}
                  height={200}
                />
                <Text color="gray.500" fontWeight={700}>
                  Em breve você poderá acessar a plataforma!
                </Text>
              </Flex>
            </ModalBody>
          </ModalContent>
        )}
      </Modal>
    </>
  );
};
export default AuthModal;
