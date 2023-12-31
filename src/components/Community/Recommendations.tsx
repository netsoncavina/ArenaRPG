import { Community } from "@/src/atoms/communitiesAtom";
import { firestore } from "@/src/firebase/clientApp";
import useCommunityData from "@/src/hooks/useCommunityData";
import {
  Flex,
  Stack,
  SkeletonCircle,
  Skeleton,
  Icon,
  Button,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";
import { query, collection, orderBy, limit, getDocs } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaReddit } from "react-icons/fa";

const Recommendations: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

  const getCommunityRecommendations = async () => {
    setLoading(true);
    try {
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(5)
      );
      const communityDocs = await getDocs(communityQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunities(communities as Community[]);
    } catch (error) {
      console.log("getCommunityRecommendations error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCommunityRecommendations();
  }, []);

  return (
    <Flex
      position="sticky"
      top="14px"
      direction="column"
      bg="secondary"
      borderRadius={4}
      border="1px solid"
      borderColor="primary"
    >
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        height="70px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={700}
        bgImage="url(/images/top_comunities.jpg)"
        backgroundSize="cover"
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
        url('images/top_comunities.jpg')"
      >
        Principais comunidades
      </Flex>
      <Flex direction="column">
        {loading ? (
          <Stack mt={2} p={3}>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
          </Stack>
        ) : (
          <>
            {communities.map((item, index) => {
              const isJoined = !!communityStateValue.mySnippets.find(
                (snippet) => snippet.communityId === item.id
              );
              return (
                <Link key={item.id} href={`/c/${item.id}`}>
                  <Flex
                    position="relative"
                    align="center"
                    fontSize="10pt"
                    borderBottom="1px solid"
                    borderColor="primary"
                    p="10px 12px"
                  >
                    <Flex width="80%" align="center">
                      <Flex width="15%">
                        <Text color="primary" fontSize="12pt" fontWeight={700}>
                          {index + 1}
                        </Text>
                      </Flex>
                      <Flex align="center" width="80%">
                        {item.ImageUrl ? (
                          <Image
                            src={item.ImageUrl}
                            borderRadius="full"
                            boxSize="28px"
                            mr={2}
                            alt="imagem da comunidade"
                          />
                        ) : (
                          <Flex
                            borderRadius="full"
                            borderColor="primary"
                            border="1px solid"
                            boxSize="28px"
                            mr={2}
                            bg="white"
                            align="center"
                            justify="center"
                          >
                            <Image
                              src="/images/arena_rpg_icone.png"
                              height="30px"

                              // mr={1}
                            />
                          </Flex>
                        )}
                        <span
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            color: "white",
                          }}
                        >
                          {`r/${item.id}`}
                        </span>
                      </Flex>
                    </Flex>
                    <Box position="absolute" right="10px">
                      <Button
                        height="22px"
                        fontSize="7pt"
                        variant={isJoined ? "outline" : "solid"}
                        backgroundColor={isJoined ? "secondary" : "primary"}
                        borderColor={isJoined ? "primary" : "primary"}
                        color={isJoined ? "primary" : "white"}
                        _hover={
                          isJoined
                            ? {
                                backgroundColor: "primary",
                                color: "white",
                                // borderColor: "primary_hover",
                              }
                            : {
                                backgroundColor: "primary_hover",
                                color: "white",
                              }
                        }
                        onClick={(event) => {
                          event.stopPropagation();
                          onJoinOrLeaveCommunity(item, isJoined);
                        }}
                      >
                        {isJoined ? "Membro" : "Entrar"}
                      </Button>
                    </Box>
                  </Flex>
                </Link>
              );
            })}
            <Box p="10px 20px">
              <Button
                height="30px"
                width="100%"
                backgroundColor="primary"
                _hover={{
                  backgroundColor: "primary_hover",
                }}
              >
                Ver todas
              </Button>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
};
export default Recommendations;
