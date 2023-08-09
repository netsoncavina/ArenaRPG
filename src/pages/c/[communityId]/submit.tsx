import React from "react";
import { Text, Box } from "@chakra-ui/react";

import PageContent from "@/src/components/Layout/PageContent";
import NewPostForm from "@/src/components/Posts/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { useRecoilValue } from "recoil";
import { communityState } from "@/src/atoms/communitiesAtom";

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const communityStateValue = useRecoilValue(communityState);
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Criar Post</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <>About</>
    </PageContent>
  );
};
export default SubmitPostPage;
