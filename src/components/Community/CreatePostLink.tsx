import { authModalState } from "@/src/atoms/authModalAtom";
import { auth } from "@/src/firebase/clientApp";
import { Flex, Icon, Input, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsLink45Deg } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import useDirectory from "../../hooks/useDirectory";

type CreatePostProps = {};

const CreatePostLink: React.FC<CreatePostProps> = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const { toggleMenuOpen } = useDirectory();

  const onClick = () => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    const { communityId } = router.query;
    if (communityId) {
      router.push(`/c/${communityId}/submit`);
      return;
    }
    toggleMenuOpen();
  };
  return (
    <Flex
      justify="space-evenly"
      align="center"
      bg="secondary"
      height="56px"
      borderRadius={4}
      // border="1px solid"
      borderColor="primary"
      p={2}
      mb={4}
    >
      <Image src="/images/arena_rpg_icone.png" height="55px" />
      <Input
        placeholder="Criar Post"
        fontSize="10pt"
        _placeholder={{ color: "gray.200" }}
        _hover={{
          // bg: "white",
          border: "1px solid",
          borderColor: "primary_hover",
        }}
        _focus={{
          outline: "none",
          bg: "secondary",
          border: "1px solid",
          borderColor: "primary_hover",
        }}
        bg="secondary"
        borderColor="primary"
        height="36px"
        borderRadius={4}
        mr={4}
        onClick={onClick}
      />
      {/* <Icon
        as={IoImageOutline}
        fontSize={24}
        mr={4}
        color="primary"
        cursor="pointer"
      />
      <Icon as={BsLink45Deg} fontSize={24} color="primary" cursor="pointer" /> */}
    </Flex>
  );
};
export default CreatePostLink;
