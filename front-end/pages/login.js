import { useState } from 'react';

import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react';

export default function Login(){
    const [signinEmail, setSigninEmail] = useState("");
    const [signinPw, setSigninPw] = useState("");
    const [errMsg, setErrMsg] = useState("");

    return(
      <div>
          <Flex align={"center"} justify={"center"}>
            <Stack spacing={6} w={"full"} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Sign In</Heading>
              </Stack>
              <Box rounded={"lg"} bg={"gray.700"} boxShadow={"lg"} p={8}>
                <Stack spacing={4}>
                  <Text color="white" fontSize="md">{errMsg}</Text>
                  <FormControl id="email">
                    <FormLabel color="white">Email address</FormLabel>
                    <Input color="white" type="email" name="email" placeholder="Enter email" value={signinEmail} onChange={(event) => setSigninEmail(event.target.value)} _placeholder={{color: "gray.300"}}/>
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel color="white">Password</FormLabel>
                    <Input color="white" type="password" name="password" placeholder="Password" value={signinPw} onChange={(event) => setSigninPw(event.target.value)} _placeholder={{color: "gray.300"}}/>
                  </FormControl>
                  <Button colorScheme="teal">Log in</Button>
                </Stack>
              </Box>
            </Stack>
          </Flex>
      </div>
    );
}