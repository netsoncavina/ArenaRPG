import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Flex,
  MenuDivider,
  Text,
  Divider,
} from "@chakra-ui/react";
import { User, signOut } from "firebase/auth";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { auth } from "@/src/firebase/clientApp";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "@/src/atoms/authModalAtom";
import { communityState } from "@/src/atoms/communitiesAtom";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("logout error", error);
    }
  };

  return (
    <Menu>
      <>
        {user ? (
          <MenuButton
            cursor={"pointer"}
            padding="0px 6px"
            borderRadius={4}
            outline="1px solid"
            outlineColor="primary"
            _hover={{ outline: "1px solid", outlineColor: "primary" }}
          >
            <Flex align="center">
              <Flex align="center">
                {user ? (
                  <>
                    <Icon
                      fontSize={24}
                      mr={1}
                      color="gray.300"
                      as={FaRedditSquare}
                    />
                    <Flex
                      direction="column"
                      display={{ base: "none", md: "flex" }}
                      fontSize="8pt"
                      align={"center"}
                      mr={8}
                    >
                      <Text fontWeight={700} color="primary">
                        {user?.displayName || user.email?.split("@")[0]}
                      </Text>
                    </Flex>
                  </>
                ) : null}
              </Flex>
              <ChevronDownIcon />
            </Flex>
          </MenuButton>
        ) : null}
      </>

      <MenuList backgroundColor="secondary" borderColor="primary">
        {user ? (
          <Flex flexDirection="column">
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{
                bg: "primary",
                color: "white",
              }}
              color={"primary"}
              background={"secondary"}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={CgProfile} />
                Perfil
              </Flex>
            </MenuItem>
            <MenuDivider borderColor="primary" />
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{
                bg: "primary",
                color: "white",
              }}
              color={"primary"}
              background={"secondary"}
              onClick={() => {
                logout();
              }}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Sair
              </Flex>
            </MenuItem>
          </Flex>
        ) : (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{
                bg: "blue.500",
                color: "white",
              }}
              onClick={() => {
                setAuthModalState({ open: true, view: "login" });
              }}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Entrar / Cadastrar
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
