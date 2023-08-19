import { Post, postState } from '@/src/atoms/postsAtom';
import { Box, Flex,Stack,Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React, { useState } from 'react';
import CommentInput from './CommentInput';
import { write } from 'fs';
import { firestore } from '@/src/firebase/clientApp';
import { Timestamp, collection, doc, increment, serverTimestamp, writeBatch } from 'firebase/firestore';
import { useSetRecoilState } from 'recoil';
import CommentItem, {Comment} from './CommentItem'

type CommentsProps = {
    user: User,
    selectedPost: Post | null,
    communityId: string
};

const Comments:React.FC<CommentsProps> = ({user, selectedPost, communityId}) => {

    const [commentText, setCommentText] = useState('')
    const [comments, setComments] = useState<Comment []>([])
    const [fetchLoading, setFetchLoading] = useState(false)
    const [createLoading, setCreateLoading] = useState(false)
    const setPostState = useSetRecoilState(postState)


    const onCreateComment = async() => {
        setCreateLoading(true)
        try {
            const batch = writeBatch(firestore)
            const commentDocRef = (doc(collection(firestore, 'comments')))
            const newComment: Comment = {
                id: commentDocRef.id,
                creatorId : user.uid,
                creatorDisplayText: user.email!.split('@')[0],
                communityId: communityId,
                postId: selectedPost?.id!,
                postTitle: selectedPost?.title!,
                text: commentText,
                createdAt: serverTimestamp() as Timestamp
            }

            batch.set(commentDocRef, newComment)

            newComment.createdAt = { seconds: Date.now() / 1000} as Timestamp

            const postDocRef = doc(firestore, 'posts', selectedPost?.id!)
            batch.update(postDocRef, {
                numberOfComments: increment(1)
            })

            await batch.commit()

            setCommentText('')
            setComments((prev) => [newComment, ...prev])
            setPostState((prev) => ({
                ...prev,
                selectedPost: {
                    ...prev.selectedPost,
                    numberOfComments: prev.selectedPost?.numberOfComments! + 1
                } as Post
            }))

        } catch (error) {
            console.log('onCreateComment error', error)
        }
        setCreateLoading(false)
    }
    const onDeleteComment = async(comment: any) => {}
    const getPostComments = async() => {}
    
    return (
        <Box bg="white" borderRadius="0px 0px 4px 4px" p={2}>
            <Flex
            direction="column"
            pl={10}
            pr={4}
            mb={6}
            fontSize="10pt"
            width="100%"
            
            >
                <CommentInput 
                commentText={commentText}
                setCommentText={setCommentText}
                user={user}
                createLoading={createLoading}
                onCreateComment={onCreateComment}
                />
            </Flex>
            <Stack spacing={6}>
                {comments.map((comment) => (
                    <CommentItem 
                    key={comment.id}
                    comment={comment}
                    onDeleteComment={onDeleteComment}
                    loadingDelete={false}
                    userId={user.uid}
                    />
                ))    
                }
            </Stack>
        </Box>
    )
}
export default Comments;