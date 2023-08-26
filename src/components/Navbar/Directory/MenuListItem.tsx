import useDirectory from "@/src/hooks/useDirectory";
import { MenuItem, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { IconType } from "react-icons";

type MenuListItemProps = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageUrl?: string;
};

const MenuListItem: React.FC<MenuListItemProps> = ({
  displayText,
  link,
  icon,
  iconColor,
  imageUrl,
}) => {
  const { onSelectMenuItem } = useDirectory();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <MenuItem
      width="100%"
      fontSize="10pt"
      _hover={{
        bg: "primary",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      backgroundColor="secondary"
      onClick={() =>
        onSelectMenuItem({ displayText, link, icon, iconColor, imageUrl })
      }
    >
      <Flex align="center">
        {imageUrl ? (
          <Image
            src={imageUrl}
            borderRadius="full"
            boxSize="18px"
            mr={2}
            alt="imagem da comunidade"
          />
        ) : (
          <Icon as={icon} fontSize={20} mr={2} color={iconColor} />
        )}
        <Text color={isHovered ? "black" : "white"}>{displayText}</Text>
      </Flex>
    </MenuItem>
  );
};
export default MenuListItem;
