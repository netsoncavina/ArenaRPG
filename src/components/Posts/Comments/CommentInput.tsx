import { User } from "firebase/auth";
import React from "react";
import AuthButtons from "../../Navbar/RightContent/AuthButtons";
import { Flex, Textarea, Button, Text } from "@chakra-ui/react";

type CommentInputProps = {
  commentText: string;
  setCommentText: (value: string) => void;
  user: User;
  createLoading: boolean;
  onCreateComment: (commentText: string) => void;
};

const CommentInput: React.FC<CommentInputProps> = ({
  commentText,
  setCommentText,
  user,
  createLoading,
  onCreateComment,
}) => {
  return (
    <Flex
      direction="column"
      position="relative"
      bg="secondary"
      borderColor="primary"
    >
      {user ? (
        <>
          <Flex align="center" justify="start" mb={1}>
            <Text color="gray.200">Comente como</Text>
            <Text paddingLeft={1} color="primary">
              {user.displayName}
            </Text>
          </Flex>
          <Textarea
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="No que você está pensando?"
            color="gray.200"
            fontSize="10pt"
            borderRadius={4}
            minHeight="160px"
            pb={10}
            _placeholder={{ color: "gray.200" }}
            _focus={{
              outline: "none",
              border: "1px solid primary_hover",
            }}
            _hover={{
              outline: "none",
              border: "1px solid primary_hover",
            }}
          />
          <Flex
            position="absolute"
            left="1px"
            right={0.1}
            bottom="1px"
            justify="center"
            bg="seconadary"
            p="6px 8px"
            borderRadius="0px 0px 4px 4px"
          >
            <Button
              height="26px"
              disabled={!commentText.length}
              isLoading={createLoading}
              onClick={() => onCreateComment(commentText)}
              bg="primary"
            >
              Comentar
            </Button>
          </Flex>
        </>
      ) : (
        <Flex
          align="center"
          justify="space-between"
          borderRadius={2}
          border="1px solid"
          borderColor="primary"
          p={4}
        >
          <Text fontWeight={700} color="primary">
            Faça login para comentar
          </Text>
          <AuthButtons />
        </Flex>
      )}
    </Flex>
  );
};
export default CommentInput;
