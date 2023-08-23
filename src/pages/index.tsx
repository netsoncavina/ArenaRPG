import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { NextPage } from "next";
import PageContent from "../components/Layout/PageContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import { useRecoilValue } from "recoil";
import { communityState } from "../atoms/communitiesAtom";
import { useEffect, useState } from "react";
import usePosts from "../hooks/usePosts";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { Post } from "../atoms/postsAtom";
import PostLoader from "../components/Posts/PostLoader";
import PostItem from "../components/Posts/PostItem";
import { Stack } from "@chakra-ui/react";
import CreatePostLink from "../components/Community/CreatePostLink";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();
  const communityStateValue = useRecoilValue(communityState);

  const buildUserHomeFedd = async () => {};
  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteCount", "desc"),
        limit(10)
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostStateValue((prevState) => ({
        ...prevState,
        posts: posts as Post[],
      }));
    } catch (error) {
      console.log("buildUserHomeFedd error", error);
    }
    setLoading(false);
  };
  const getUserPostVotes = () => {};

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();
  }, [user, loadingUser]);

  return (
    <PageContent>
      <>
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onDeletePost={onDeletePost}
                onVote={onVote}
                onSelectPost={onSelectPost}
                userIsCreator={post.creatorId === user?.uid}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (item) => item.postId === post.id
                  )?.voteValue
                }
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <>{/* Recommendations */}</>
    </PageContent>
  );
};

export default Home;
