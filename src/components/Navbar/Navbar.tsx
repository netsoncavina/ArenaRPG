import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import AuthModal from "../Modal/Auth/AuthModal";
import { auth } from "@/src/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Flex align="center">
        <Image src="/images/ArenaRPGLogo.svg" height="44px" />
        <Image
          src="/images/ArenaRPGText.svg"
          height="44px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      <SearchInput />
      <AuthModal />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
