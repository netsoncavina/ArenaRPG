import React from "react";
import { Flex, Image, Link } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import AuthModal from "../Modal/Auth/AuthModal";
import { auth } from "@/src/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import Directory from "./Directory/Directory";
import useDirectory from "@/src/hooks/useDirectory";
import { defaultMenuItem } from "@/src/atoms/directoryMenuAtom";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();
  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justify={{ md: "space-between" }}
    >
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        onClick={() => onSelectMenuItem(defaultMenuItem)}
      >
        <Link href="/">
          <Image
            src="/images/ArenaRPGLogo.svg"
            height="44px"
            cursor="pointer"
          />
        </Link>
        <Image
          src="/images/ArenaRPGText.svg"
          height="44px"
          display={{ base: "none", md: "unset" }}
          cursor="pointer"
        />
      </Flex>
      <AuthModal />
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
