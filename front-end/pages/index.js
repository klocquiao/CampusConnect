import Link from "next/link";

import { Box, Button, Container, HStack, Heading, Icon, SimpleGrid, Stack } from "@chakra-ui/react";
import { UserContext } from "./_app";
import { useContext } from "react";
import { AddIcon, ArrowRightIcon } from "@chakra-ui/icons";

function Blur(props){
  return(
    <Icon
      width="50%"
      zIndex={-1}
      height="600px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle cx="71" cy="61" r="200" fill="#4299e1"/>
      <circle cx="244" cy="106" r="200" fill="#42bfe1"/>
      <cirlce cy="291" r="139" fill="#4299E1"/>
      <circle cx="80.5" cy="189.5" r="200" fill="#42e1d4"/>
      <circle cx="196.5" cy="317.5" r="150" fill="#42bfe1"/>
      <circle cx="70.5" cy="458.5" r="150" fill="#42e1d4"/>
      <circle cx="426.5" cy="-0.5" r="300" fill="#42bfe1"/>
    </Icon>
  )
}

export default function Index() {
  const user = useContext(UserContext);

  return (
    <Box position="relative">
      <Container
        as={SimpleGrid}
        maxW="7xl"
        columns={{base: 1, md: 2}}
        spacing={{base: 10, lg: 32}}
        py={{base: 10, sm: 20, lg: 32}}
      >
        <Stack spacing={{base: 10, md: 20}}>
          <Heading bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize='7xl' fontWeight='extrabold'>
            Welcome to CampusConnect
          </Heading>
          <Stack>
            {
              user ?
              <HStack>
                <Button as={Link} href="/home" rightIcon={<ArrowRightIcon/>} colorScheme="pink" borderRadius={20} px={10} mr={5}>View Posts</Button>
                <Button as={Link} href="/create/post" leftIcon={<AddIcon/>} colorScheme="pink" borderRadius={20} px={10} >Create Post</Button>
              </HStack>
              :
              <HStack>
                <Button as={Link} href="/login" colorScheme="pink" borderRadius={20} px={10} mr={5}>Log In</Button>
                <Button as={Link} href="/signup" variant={"outline"} colorScheme="pink" borderRadius={20} px={10}>Sign Up</Button>
              </HStack>
            }
          </Stack>
        </Stack>
      </Container>
      <Blur position="absolute" top={-20} left={-200} style={{filter: "blur(70px)"}}/>
    </Box>
  );
}