import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Post, PostVote, postState } from "../atoms/postsAtom";
import { auth, firestore, storage } from "../firebase/clientApp";
import { ref, deleteObject } from "firebase/storage";
import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { communityState } from "../atoms/communitiesAtom";

const usePosts = () => {
  const [user] = useAuthState(auth)
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const currentCommunity = useRecoilValue(communityState).currentCommunity


  const onVote = async (post: Post, vote: number, communityId: string) => {
    // Check for user, if not, open auth modal
    try {
      const {voteCount} = post;
      const existingVote = postStateValue.postVotes.find(
        (vote) => vote.postId === post.id
      )
      const batch = writeBatch(firestore);
      // Create copys of states to update later
      const updatedPost = {...post}
      const updatedPosts = [...postStateValue.posts]
      let updatedPostVotes = [...postStateValue.postVotes]
      let voteChange = vote;


      if (!existingVote){
        // Create a new vote
        const postVoteRef = doc(collection(firestore, 'users', `${user?.uid}/postVotes`))

        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id!,
          communityId,
          voteValue: vote
        }

        batch.set(postVoteRef, newVote)

        updatedPost.voteCount = voteCount + vote
        updatedPostVotes = [...updatedPostVotes, newVote]

      } else {
        // Update existing vote
        const postVoteRef = doc(firestore, 'users', `${user?.uid}/postVotes/${existingVote.id}`)

        // If vote is the same as existing vote, delete vote +1/-1
        if (existingVote.voteValue === vote) {
          updatedPost.voteCount = voteCount - vote
          updatedPostVotes = updatedPostVotes.filter(vote => vote.id !== existingVote.id)
          
          // Delete vote
          batch.delete(postVoteRef)
          voteChange *= -1

          // Change vote, update vote +2/-2
        } else {
          updatedPost.voteCount = voteCount + (vote * 2)

          const voteIndex = postStateValue.postVotes.findIndex(vote => vote.id === existingVote.id)

          updatedPostVotes[voteIndex] = {
            ...existingVote,
            voteValue: vote
          }

          // Update vote
          batch.update(postVoteRef, {
            voteValue: vote
          })

          voteChange = 2 * vote 
        }
      }

      // Update post document
      const postRef = doc(firestore, 'posts', post.id)
      batch.update(postRef, {voteCount: voteCount + voteChange})

      await batch.commit()

      // Update post state
      const postIndex = updatedPosts.findIndex(item => item.id === post.id)
      updatedPosts[postIndex] = updatedPost
      setPostStateValue((prevState) => ({
        ...prevState,
        posts: updatedPosts,
        postVotes: updatedPostVotes
      }))

    } catch (error) {
      console.log("OnVote Error: ", error);
    }
  };

  const onSelectPost = async () => {};

  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      if (post.imageUrl) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }

      const postDocRef = doc(firestore, "posts", post.id!);
      await deleteDoc(postDocRef);

      setPostStateValue((prevState) => ({
        ...prevState,
        posts: prevState.posts.filter((p) => p.id !== post.id),
      }));
      return true;
    } catch (error) {
      return false;
    }
  };

  const getCommunityPostVotes = async (communityId: string) => {
    const postVotesQuery = query(collection(firestore, "users", `${user?.uid}/postVotes`), where("communityId", "==", communityId))
    const postVoteDocs = await getDocs(postVotesQuery)
    const postVOtes = postVoteDocs.docs.map((doc) => ({id: doc.id, ...doc.data()}))
    setPostStateValue((prevState) => ({
      ...prevState,
      postVotes: postVOtes as PostVote[]
    }))	
  }

  useEffect(() => {
    if (!user || !currentCommunity) return
    getCommunityPostVotes(currentCommunity.id)
  }, [user, currentCommunity])

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};
export default usePosts;
