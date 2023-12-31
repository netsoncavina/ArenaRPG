import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Icon,
  Text,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities";
import useDirectory from "@/src/hooks/useDirectory";

const Directory: React.FC = () => {
  const { directoryState, toggleMenuOpen } = useDirectory();

  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        cursor={"pointer"}
        padding="0px 6px"
        borderRadius={4}
        outline="1px solid"
        outlineColor="primary"
        mr={2}
        ml={{ base: 0, md: 2 }}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        onClick={toggleMenuOpen}
      >
        <Flex
          align="center"
          justify="space-between"
          width={{
            base: "auto",
            lg: "150px",
          }}
        >
          <Flex align="center">
            {directoryState.selectedMenuItem.imageUrl ? (
              <Image
                src={directoryState.selectedMenuItem.imageUrl}
                borderRadius="full"
                boxSize="24px"
                mr={2}
                alt="imagem da comunidade"
              />
            ) : (
              <Icon
                fontSize={24}
                mr={{ base: 1, md: 2 }}
                as={directoryState.selectedMenuItem.icon}
                // color={directoryState.selectedMenuItem.iconColor}
                color="primary"
              />
            )}

            <Flex display={{ base: "none", lg: "flex" }}>
              <Text fontWeight={600} fontSize="10pt" color="primary">
                {directoryState.selectedMenuItem.displayText}
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList backgroundColor="secondary" borderColor="primary">
        <Communities />
      </MenuList>
    </Menu>
  );
};
export default Directory;
