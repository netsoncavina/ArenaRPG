import React from "react";
import { Post } from "@/src/atoms/postsAtom";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoArrowRedoOutline,
  IoBookmarkOutline,
} from "react-icons/io5";
import { Flex, Icon, Stack, Text, Image } from "@chakra-ui/react";
import moment from "moment";
import "moment/locale/pt-br";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue: number;
  onVote: () => {};
  onDeletePost: () => {};
  onSelectPost: () => {};
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}) => {
  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor={"gray.300"}
      borderRadius={4}
      _hover={{ borderColor: "gray.500" }}
      cursor={"pointer"}
      onClick={onSelectPost}
    >
      <Flex
        direction="column"
        align="center"
        bg="gray.100"
        p={2}
        width="40px"
        borderRadius={4}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          onClick={() => onVote()}
          cursor="pointer"
        />
        <Text fontSize="xs" color="gray.400">
          {post.voteCount}
        </Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          fontSize={22}
          onClick={() => onVote()}
          cursor="pointer"
        />
      </Flex>
      <Flex direction="column" width="100%">
        <Stack spacing={1} p="10px">
          <Stack direction="row" align="center" spacing={0.6} fontSize="9pt">
            <Text>
              Postado por u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt?.seconds * 1000))
                .locale("pt-br")
                .fromNow()}
            </Text>
          </Stack>
          <Text fontSize="12pt" fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize="10pt">{post.body}</Text>
          {post.imageUrl && (
            <Flex justify="center" align="center" p={2}>
              <Image src={post.imageUrl} maxHeight="460px" alt="Post image" />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color="gray.500">
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={BsChat} fontSize={16} />
            <Text fontSize="9pt">{post.numberOfComments}</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} fontSize={16} />
            <Text fontSize="9pt">Compartilhar</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} fontSize={16} />
            <Text fontSize="9pt">Salvar</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={onDeletePost}
            >
              <Icon as={AiOutlineDelete} fontSize={16} />
              <Text fontSize="9pt">Apagar</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostItem;
