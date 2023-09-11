import React from "react";
import { Text, Box } from "@chakra-ui/react";

import PageContent from "@/src/components/Layout/PageContent";
import NewPostForm from "@/src/components/Posts/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { useRecoilValue } from "recoil";
import { communityState } from "@/src/atoms/communitiesAtom";
import About from "@/src/components/Community/About";
import useCommunityData from "@/src/hooks/useCommunityData";

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { communityStateValue } = useCommunityData();
  return (
    <PageContent>
      <>
        <Box
          p="14px 0px"
          borderBottom="1px solid"
          // borderColor="white"
          backgroundColor="primary"
          padding={2}
          borderRadius={10}
        >
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="white"
            textAlign="center"
          >
            Criar Post
          </Text>
        </Box>
        {user && (
          <NewPostForm
            user={user}
            communityImageUrl={communityStateValue.currentCommunity?.ImageUrl}
          />
        )}
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </>
    </PageContent>
  );
};
export default SubmitPostPage;
