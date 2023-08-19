import { User } from 'firebase/auth';
import React from 'react';
import AuthButtons from '../../Navbar/RightContent/AuthButtons';
import { Flex, Textarea, Button, Text } from '@chakra-ui/react';

type CommentInputProps = {
    commentText: string,
    setCommentText: (value: string) => void,
    user: User,
    createLoading: boolean,
    onCreateComment: (commentText: string) => void
};

const CommentInput:React.FC<CommentInputProps> = ({commentText, setCommentText, user, createLoading, onCreateComment}) => {
    
    return (
        <Flex direction="column" position="relative">
          {user ? (
            <>
              <Text mb={1}>
                Comment as{" "}
                <span style={{ color: "#3182CE" }}>
                  {user?.email?.split("@")[0]}
                </span>
              </Text>
              <Textarea
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                placeholder="No que você está pensando?"
                fontSize="10pt"
                borderRadius={4}
                minHeight="160px"
                pb={10}
                _placeholder={{ color: "gray.500" }}
                _focus={{
                  outline: "none",
                  bg: "white",
                  border: "1px solid black",
                }}
              />
              <Flex
                position="absolute"
                left="1px"
                right={0.1}
                bottom="1px"
                justify="flex-end"
                bg="gray.100"
                p="6px 8px"
                borderRadius="0px 0px 4px 4px"
              >
                <Button
                  height="26px"
                  disabled={!commentText.length}
                  isLoading={createLoading}
                  onClick={() => onCreateComment(commentText)}
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
              borderColor="gray.100"
              p={4}
            >
              <Text fontWeight={600}>Faça login para comentar</Text>
              <AuthButtons />
            </Flex>
          )}
        </Flex>
      );
    };
export default CommentInput;