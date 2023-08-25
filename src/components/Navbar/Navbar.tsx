import React, { useCallback, useEffect, useState } from "react";
import { Button, Flex, Image, Link } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import AuthModal from "../Modal/Auth/AuthModal";
import { auth } from "@/src/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import Directory from "./Directory/Directory";
import useDirectory from "@/src/hooks/useDirectory";
import { defaultMenuItem } from "@/src/atoms/directoryMenuAtom";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();

  const useMediaQuery = (width: number) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e: any) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addListener(updateTarget);

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeListener(updateTarget);
    }, []);

    return targetReached;
  };

  const isMobile = useMediaQuery(769);

  return (
    // Change layout based on screen size

    <Flex
      bg="secondary"
      height={isMobile ? "auto" : "60px"}
      padding="6px 12px"
      justify={{ md: "space-between" }}
    >
      <AuthModal />
      {isMobile ? (
        <Flex justify="center" width={"100%"} flexDirection={"column"}>
          <>
            <Flex
              align="center"
              justify="center"
              width={"auto"}
              mb={4}
              onClick={() => onSelectMenuItem(defaultMenuItem)}
            >
              <Link href="/">
                <Image
                  src="/images/arena_rpg_logo.png"
                  height="44px"
                  cursor="pointer"
                />
              </Link>
            </Flex>
          </>
          <Flex justify="space-between">
            <Flex justify={"flex"}>
              {user && <Directory />}
              <SearchInput user={user} />
            </Flex>

            <RightContent user={user} />
          </Flex>
        </Flex>
      ) : (
        <>
          <Flex justify={{ base: "flex", md: "center" }}>
            {user && <Directory />}
            <SearchInput user={user} />
          </Flex>
          <Flex
            align="center"
            width={{ base: "40px", md: "auto" }}
            mr={{ base: 0, md: 2 }}
            onClick={() => onSelectMenuItem(defaultMenuItem)}
          >
            <Link href="/">
              <Image
                src="/images/arena_rpg_logo.png"
                height="44px"
                cursor="pointer"
              />
            </Link>
          </Flex>
          <RightContent user={user} />
        </>
      )}
    </Flex>
  );
};
export default Navbar;
