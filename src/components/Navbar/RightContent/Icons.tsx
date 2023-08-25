import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAd, GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";

const Icons: React.FC = () => {
  return (
    <Flex align="center" justify="center">
      <Flex
        mr={1.5}
        ml={1.5}
        padding={1}
        color="primary"
        cursor={"pointer"}
        borderRadius={4}
        _hover={{ border: "1px solid", borderColor: "primary" }}
      >
        <Icon as={BsChatDots} boxSize={6} />
      </Flex>
      <Flex
        mr={1.5}
        ml={1.5}
        padding={1}
        color="primary"
        cursor={"pointer"}
        borderRadius={4}
        _hover={{ border: "1px solid", borderColor: "primary" }}
      >
        <Icon as={IoNotificationsOutline} boxSize={6} />
      </Flex>
    </Flex>
  );
};
export default Icons;
