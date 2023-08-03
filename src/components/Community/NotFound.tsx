import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
    >
      Desculpe, essa comunidade não existe ou foi banida
      <Link href="/">
        <Button mt={4}>Voltar para a página inicial</Button>
      </Link>
    </Flex>
  );
};
export default NotFound;
