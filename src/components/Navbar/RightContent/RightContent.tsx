import { Flex, Button } from "@chakra-ui/react";
import React from "react";
import AuthButtons from "./AuthButtons";
import { User, signOut } from "firebase/auth";
import { auth } from "@/src/firebase/clientApp";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      {/* AuthModal */}
      <Flex justify={{ base: "flex-end", md: "center" }}>
        {user ? <Icons /> : <AuthButtons />}

        <UserMenu user={user} />
      </Flex>
    </>
  );
};
export default RightContent;
