import { Community } from "@/src/atoms/communitiesAtom";
import { Box, Flex, Icon, Image, Text, Button } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";
import useCommunityData from "@/src/hooks/useCommunityData";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const { communityStateValue, onJoinOrLeaveCommunity, loading } =
    useCommunityData();
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );
  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="primary" />
      <Flex
        justify="center"
        bg="secondary"
        flexGrow={1}
        border="1px solid"
        borderColor="primary"
      >
        <Flex width="95%" maxWidth="860px">
          {communityStateValue.currentCommunity?.ImageUrl ? (
            <Image
              src={communityStateValue.currentCommunity.ImageUrl}
              borderRadius="full"
              boxSize="66px"
              alt="Imagem da comunidade"
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
            />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
              borderRadius="50%"
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={600} fontSize="16pt" color="primary">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                c/{communityData.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              height="30px"
              pr={6}
              pl={6}
              color={isJoined ? "primary" : "secondary"}
              borderColor={isJoined ? "primary" : "white"}
              bg={isJoined ? "secondary" : "primary"}
              _hover={{
                backgroundColor: isJoined ? "secondary" : "primary_hover",
                color: isJoined ? "primary_hover" : "white",
                borderColor: isJoined ? "primary_hover" : "white",
                border: isJoined ? "2px solid" : "none",
              }}
              onClick={() => {
                onJoinOrLeaveCommunity(communityData, isJoined);
              }}
              isLoading={loading}
            >
              {isJoined ? "Sair" : "Unir-se"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
