import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  Community,
  CommunitySnippet,
  communityState,
} from "../atoms/communitiesAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { write } from "fs";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prevState) => ({
        ...prevState,
        mySnippets: snippets as CommunitySnippet[],
      }));
    } catch (error: any) {
      console.log("getMySnippets error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const joinCommunity = async (community: Community) => {
    try {
      // Batch write
      const batch = writeBatch(firestore);

      const newSnippet: CommunitySnippet = {
        communityId: community.id,
        imageUrl: community.ImageUrl || "",
      };

      // Creating a new community snippet
      batch.set(
        doc(firestore, `users/${user?.uid}/communitySnippets`, community.id),
        newSnippet
      );

      // Updating the number of members (+1)
      batch.update(doc(firestore, "communities", community.id), {
        numberOfMembers: increment(1),
      });

      await batch.commit();

      // Update recoil state - communityState.mySnippets
      setCommunityStateValue((prevState) => ({
        ...prevState,
        mySnippets: [...prevState.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log("joinCommunity error", error);
      setError(error.message);
    }
    setLoading(false);
  };
  const leaveCommunity = async (communityId: string) => {
    try {
      // Batch write
      const batch = writeBatch(firestore);

      // Deleting the community snippet
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      );

      // Updating the number of members (+1)
      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      // Update recoil state - communityState.mySnippets
      setCommunityStateValue((prevState) => ({
        ...prevState,
        mySnippets: prevState.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log("leaveCommunity error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};
export default useCommunityData;
