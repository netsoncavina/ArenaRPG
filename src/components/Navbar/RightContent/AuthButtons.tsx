import { authModalState } from "@/src/atoms/authModalAtom";
import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";

const AuthButtons: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <Flex align="center">
      <Button
        variant="outline"
        borderColor="primary"
        height="28px"
        display="flex"
        width={{
          base: "70px",
          md: "110px",
        }}
        color="primary"
        _hover={{
          borderColor: "primary_hover",
          border: "2px solid",
          color: "primary_hover",
        }}
        mr={2}
        onClick={() => setAuthModalState({ open: true, view: "login" })}
      >
        Log In
      </Button>
      <Button
        height="28px"
        display="flex"
        backgroundColor="primary"
        color="secondary"
        width={{
          base: "70px",
          md: "110px",
        }}
        _hover={{
          backgroundColor: "primary_hover",
          color: "white",
        }}
        mr={2}
        onClick={() => setAuthModalState({ open: true, view: "signup" })}
      >
        Sign Up
      </Button>
    </Flex>
  );
};
export default AuthButtons;
