import React from "react";
import { Text, Box } from "@chakra-ui/react";

import PageContent from "@/src/components/Layout/PageContent";
import NewPostForm from "@/src/components/Posts/NewPostForm";

const SubmitPostPage: React.FC = () => {
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Criar Post</Text>
        </Box>
        <NewPostForm />
      </>
      <>About</>
    </PageContent>
  );
};
export default SubmitPostPage;
