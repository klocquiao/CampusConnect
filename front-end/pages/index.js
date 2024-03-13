import Link from "next/link";

import { Box, Button, Container, Heading, Icon, SimpleGrid, Stack, Text } from "@chakra-ui/react";

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
          <Heading bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize='6xl' fontWeight='extrabold'>
            Welcome to CampusConnect
          </Heading>
          <Stack>
            <Button as={Link} href="/login" colorScheme="pink" bgGradient={"linear(to-r, pink.400, red.400)"}>Log In</Button>
            <Button as={Link} href="/signup" colorScheme="pink" bgGradient={"linear(to-r, red.400, pink.400)"}>Sign Up</Button>
          </Stack>
        </Stack>
      </Container>
      <Blur position="absolute" top={-20} left={-200} style={{filter: "blur(70px)"}}/>
    </Box>
  );
}