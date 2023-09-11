import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import React from "react";

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={3} width="100%">
      <Input
        name="title"
        value={textInputs.title}
        onChange={onChange}
        placeholder="Titulo"
        fontSize="10pt"
        borderRadius={4}
        borderColor="primary"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid ",
        }}
        _hover={{ borderColor: "primary_hover" }}
      />
      <Textarea
        name="body"
        placeholder="Texto (opcional)"
        value={textInputs.body}
        onChange={onChange}
        height="100px"
        fontSize="10pt"
        borderRadius={4}
        borderColor="primary"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid ",
          borderColor: "black",
        }}
        _hover={{ borderColor: "primary_hover" }}
      />
      <Flex justify="center">
        <Button
          height="34px"
          padding="0px 30px"
          backgroundColor="primary"
          _hover={{ bg: "primary_hover" }}
          disabled={!textInputs.title}
          isLoading={loading}
          onClick={handleCreatePost}
        >
          Postar
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;
