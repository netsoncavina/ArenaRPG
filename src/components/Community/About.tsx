import { Community } from "@/src/atoms/communitiesAtom";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { RiCakeLine } from "react-icons/ri";
import moment from "moment";
import "moment/locale/pt-br";
import { useRouter } from "next/router";

type AboutProps = {
  communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  const router = useRouter();
  return (
    <Box position="sticky" top="14px">
      <Flex
        justify="space-between"
        align="center"
        bg="blue.400"
        color="white"
        p={3}
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontSize="10pt" fontWeight={700}>
          Sobre a comunidade
        </Text>
      </Flex>
      <Flex direction="column" p={3} bg="white" borderRadius="0px 0px 4px 4px">
        <Stack>
          <Flex width="100%" p={2} fontSize="10pt" fontWeight={700}>
            <Flex direction="column" flexGrow={1}>
              <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
              <Text>Membros</Text>
            </Flex>
            <Flex direction="column" flexGrow={1}>
              <Text>10</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex
            align="center"
            width="100%"
            p={1}
            fontWeight={500}
            fontSize="10pt"
          >
            <Icon as={RiCakeLine} fontSize={18} mr={2} />
            {communityData.createdAt && (
              <Text>
                Criado em{" "}
                {moment(new Date(communityData.createdAt.seconds * 1000))
                  .locale("pt-br")
                  .format("DD/MM/YYYY")}
              </Text>
            )}
          </Flex>
          <Link href={`/c/${router.query.communityId}/submit`}>
            <Button mt={3} height="30px">
              Criar Post
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
};
export default About;
