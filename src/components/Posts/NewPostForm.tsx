import { Post } from "@/src/atoms/postsAtom";
import { firestore, storage } from "@/src/firebase/clientApp";
import { Alert, AlertIcon, Flex, Icon, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import ImageUpload from "./PostForm/ImageUpload";
import TextInputs from "./PostForm/TextInputs";
import TabItemComponent from "./TabItem";
import useSelectFile from "@/src/hooks/useSelectFile";

type NewPostFormProps = {
  user: User;
  communityImageUrl?: string;
};

const formTabs: TabItemType[] = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];

export type TabItemType = {
  title: string;
  icon: typeof Icon.arguments;
};

const NewPostForm: React.FC<NewPostFormProps> = ({
  user,
  communityImageUrl,
}) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("Post");
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCreatePost = async () => {
    const { communityId } = router.query;
    // Create new post object => type Post
    const newPost: Post = {
      communityId: communityId as string,
      communityImageUrl: communityImageUrl || "",
      creatorId: user.uid,
      creatorDisplayName: user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteCount: 0,
      createdAt: serverTimestamp() as Timestamp,
    };
    setLoading(true);
    // Store post in firebase
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      // Check if there is a file to upload
      if (selectedFile) {
        // Upload file to firebase storage => getDownloadURL
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        // Update post object with file url
        await updateDoc(postDocRef, { imageUrl: downloadURL });
      }
      // Redirect to community page
      router.back();
    } catch (error: any) {
      console.log("Error handleCreatePost", error.message);
      setError(true);
    }
    setLoading(false);
  };

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item, index) => (
          <>
            {console.log(selectedTab === item.title)}
            <TabItemComponent
              key={index}
              item={item}
              selected={selectedTab === item.title}
              setSelectedTab={setSelectedTab}

              // setSelectedTab={setSelectedTab}
            />
          </>
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            onSelectImage={onSelectFile}
            setSelectedTab={setSelectedTab}
            setSelectedFile={setSelectedFile}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Text mr={2}>Erro na criação de post, tente novamente.</Text>
        </Alert>
      )}
    </Flex>
  );
};
export default NewPostForm;
