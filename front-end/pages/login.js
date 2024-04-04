import { useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { auth } from '../special/FirebaseConfig';
import { UserContext } from './_app';

export default function Login(){
    const [signinEmail, setSigninEmail] = useState("");
    const [signinPw, setSigninPw] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const user = useContext(UserContext);

    const router = useRouter();

    const onLogin = () => {
      signInWithEmailAndPassword(auth, signinEmail, signinPw)
      .then(() => {
        router.push('/home');
      })
      .catch((err) => {
        setErrMsg(err.toString())
      });
    }

    useEffect(() => {
      if(user){
        router.push('/home');
      }
    }, [user]);

    return(
      <div>
          <Flex align={"center"} justify={"center"}>
            <Stack spacing={6} w={"full"} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Heading as="h2" fontSize='6xl' fontWeight='extrabold'>Sign In</Heading>
              </Stack>
              <Box boxShadow='xl' p='6' rounded='md' border='1px' borderColor='gray.200' bg='white'>
                <Stack spacing={4}>
                  <Text fontSize="md">{errMsg}</Text>
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" name="email" placeholder="Enter email" value={signinEmail} onChange={(event) => setSigninEmail(event.target.value)} _placeholder={{color: "gray.700"}}/>
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel >Password</FormLabel>
                    <Input type="password" name="password" placeholder="Password" value={signinPw} onChange={(event) => setSigninPw(event.target.value)} _placeholder={{color: "gray.700"}}/>
                  </FormControl>
                  <Button colorScheme="pink" onClick={onLogin}>Log in</Button>
                </Stack>
              </Box>
            </Stack>
          </Flex>
      </div>
    );
}