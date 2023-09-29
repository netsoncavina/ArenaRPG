import { Box, Flex, Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import React from "react";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";
import moment from "moment";
import "moment/locale/pt-br";

export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
};
type CommentItemProps = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  loadingDelete: boolean;
  userId: string;
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onDeleteComment,
  loadingDelete,
  userId,
}) => {
  return (
    <Flex>
      <Box mr={2}>
        <Icon as={FaReddit} fontSize={30} color="gray.300" />
      </Box>
      <Stack spacing={1}>
        <Stack direction="row" align="center" fontSize="8pt">
          <Text fontWeight={700} color="primary">
            {comment.creatorDisplayText}
          </Text>
          <Text color="gray.400">
            {moment(new Date(comment.createdAt.seconds * 1000))
              .locale("pt-br")
              .fromNow()}
          </Text>
          {loadingDelete && <Spinner size="sm" />}
        </Stack>
        <Text fontSize="10pt" color="gray.200">
          {comment.text}
        </Text>
        <Stack direction="row" align="center" cursor="pointer" color="primary">
          <Icon as={IoArrowUpCircleOutline} />
          <Icon as={IoArrowDownCircleOutline} />
          {userId === comment.creatorId && (
            <>
              {/* <Text fontSize="9pt" _hover={{ color: "blue.500" }}>
                Edit
              </Text> */}
              <Text
                fontSize="9pt"
                _hover={{ color: "primary_hover" }}
                onClick={() => onDeleteComment(comment)}
              >
                Excluir
              </Text>
            </>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};
export default CommentItem;
