import React, { useState } from "react";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import { MenuItem, Flex, Icon, Text, Box } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import { communityState } from "@/src/atoms/communitiesAtom";
import { useRecoilValue } from "recoil";
import MenuListItem from "./MenuListItem";
import { FaReddit } from "react-icons/fa";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const mySnippets = useRecoilValue(communityState).mySnippets;
  return (
    <Flex direction="column" backgroundColor="secondary">
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          Moderador
        </Text>
        {mySnippets
          .filter((snippet) => snippet.isModerator)
          .map((snippet) => (
            <MenuListItem
              key={snippet.communityId}
              icon={FaReddit}
              displayText={`${snippet.communityId}`}
              link={`/c/${snippet.communityId}`}
              iconColor="brand.100"
              imageUrl={snippet.imageUrl}
            />
          ))}
      </Box>
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          Minhas Comunidades
        </Text>
        <MenuItem
          width="100%"
          fontSize="10pt"
          _hover={{
            bg: "primary",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          backgroundColor="secondary"
          onClick={() => setOpen(true)}
        >
          <Flex align="center">
            <Icon fontSize={20} mr={2} as={GrAdd} color="red.500" />
            <Text color={isHovered ? "black" : "white"}>Criar Comunidade</Text>
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={FaReddit}
            displayText={`c/${snippet.communityId}`}
            link={`/c/${snippet.communityId}`}
            iconColor="orange.500"
            imageUrl={snippet.imageUrl}
          />
        ))}
      </Box>
    </Flex>
  );
};
export default Communities;
