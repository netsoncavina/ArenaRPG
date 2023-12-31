import React, { useState } from "react";
import { Post } from "@/src/atoms/postsAtom";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoArrowRedoOutline,
  IoBookmarkOutline,
} from "react-icons/io5";
import {
  Flex,
  Icon,
  Stack,
  Text,
  Image,
  Skeleton,
  Spinner,
  Alert,
  AlertIcon,
  Link,
} from "@chakra-ui/react";
import moment from "moment";
import "moment/locale/pt-br";
import { useRouter } from "next/router";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => {};
  homePage?: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
  homePage,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const singlePostPage = !onSelectPost;

  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);

      if (!success) {
        throw new Error("Não foi possível apagar o post");
      }
      console.log("Post apagado com sucesso");

      if (singlePostPage) router.push(`/c/${post.communityId}`);
    } catch (error: any) {
      setError(error.message);
    }
    setLoadingDelete(false);
  };

  return (
    <Flex
      border="1px solid"
      bg="secondary"
      borderColor={singlePostPage ? "none" : "primary"}
      borderRadius={singlePostPage ? "4px 4px 0px 0px" : "4px"}
      _hover={{ borderColor: singlePostPage ? "none" : "primary_hover" }}
      cursor={singlePostPage ? "unset" : "pointer"}
      onClick={() => onSelectPost && onSelectPost(post)}
    >
      <Flex
        direction="column"
        align="center"
        bg={singlePostPage ? "none" : "secondary"}
        p={2}
        width="40px"
        borderRadius={singlePostPage ? "0" : "3px 0px 0px 3px"}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          onClick={(event) => onVote(event, post, 1, post.communityId)}
          cursor="pointer"
        />
        <Text fontSize="x" color="primary">
          {post.voteCount}
        </Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          fontSize={22}
          onClick={(event) => onVote(event, post, -1, post.communityId)}
          cursor="pointer"
        />
      </Flex>
      <Flex direction="column" width="100%">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text mr={2}>Erro na exclusão do post</Text>
          </Alert>
        )}
        <Stack spacing={1} p="10px">
          <Stack direction="row" align="center" spacing={0.6} fontSize="9pt">
            {homePage && (
              <>
                {post.communityImageUrl ? (
                  <Image
                    src={post.communityImageUrl}
                    height="20px"
                    width="20px"
                    borderRadius={4}
                  />
                ) : (
                  <Image src="/images/arena_rpg_icone.png" height="20px" />
                )}
                <Link href={`/c/${post.communityId}`}>
                  <Text
                    fontWeight={700}
                    _hover={{ textDecoration: "underline" }}
                    onClick={(event) => event.stopPropagation()}
                    color="primary"
                  >
                    c/{post.communityId}
                  </Text>
                </Link>
                <Icon as={BsDot} fontSize={8} color="gray.100" />
              </>
            )}
            <Text fontWeight={700} color="gray.100">
              Postado por u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt?.seconds * 1000))
                .locale("pt-br")
                .fromNow()}
            </Text>
          </Stack>
          <Text fontSize="12pt" fontWeight={600} color="gray.100">
            {post.title}
          </Text>
          <Text fontSize="10pt" color="gray.100">
            {post.body}
          </Text>
          {post.imageUrl && (
            <Flex justify="center" align="center" p={2}>
              {loadingImage && (
                <Skeleton height="200px" width="100%" borderRadius={4} />
              )}
              <Image
                src={post.imageUrl}
                maxHeight="460px"
                alt="Post image"
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
              />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color="primary">
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ color: "white" }}
            cursor="pointer"
          >
            <Icon as={BsChat} fontSize={20} />
            <Text fontSize="9pt" padding={1}>
              {post.numberOfComments}
            </Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ color: "white" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} fontSize={20} />
            <Text fontSize="9pt">Compartilhar</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ color: "white" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} fontSize={20} />
            <Text fontSize="9pt">Salvar</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ color: "white" }}
              cursor="pointer"
              onClick={handleDelete}
            >
              {loadingDelete ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} fontSize={20} />
                  <Text fontSize="9pt">Apagar</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostItem;
