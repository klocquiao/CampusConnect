import { useContext, useEffect, useState } from 'react';

import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { createUser } from '../apis/apis';
import { useRouter } from 'next/router';
import { UserContext } from './_app';

export default function Signup(){
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPw, setSignupPw] = useState("");
    const [signupPwVerify, setSignupPwVerify] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const [showPsw, setShowPsw] = useState(false);
    const [showPswVerify, setShowPswVerify] = useState(false);
    const handlePswClick = () => setShowPsw(!showPsw);
    const handlePswVerifyClick = () => setShowPswVerify(!showPswVerify);

    const router = useRouter();
    const user = useContext(UserContext);

    const handleSignUp = () => {
      createUser({
        user_name: signupEmail,
        password: signupPw
      }).then((resp) => {
        if(resp.message.includes("200")){
          router.push('/home');
        }else{
          setErrMsg(resp.message);
        }
      }).catch((err) => {
        setErrMsg(err.toString())
      });
    };

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
                <Heading as="h2" fontSize='6xl' fontWeight='extrabold'>Sign Up</Heading>
              </Stack>
              <Box boxShadow='xl' p='6' rounded='md' border='1px' borderColor='gray.200' bg='white'>
                <Stack spacing={4}>
                  <Text fontSize="md">{errMsg}</Text>
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" name="email" placeholder="Enter email" value={signupEmail} onChange={(event) => setSignupEmail(event.target.value)} _placeholder={{color: "gray.700"}}/>
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel >Password</FormLabel>
                    <InputGroup>
                      <Input type={showPsw ? "text" : "password"} name="password" placeholder="Password" value={signupPw} onChange={(event) => setSignupPw(event.target.value)} _placeholder={{color: "gray.700"}}/>
                      <InputRightElement h="full">
                        <Button colorScheme="gray" onClick={handlePswClick}>
                          {showPsw ? <ViewIcon/> : <ViewOffIcon/>}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl id="passwordVerify">
                    <FormLabel>Re-enter Password</FormLabel>
                    <InputGroup>
                      <Input type={showPswVerify ? "text" : "password"} name="passwordVerify" placeholder="Re-enter Password" value={signupPwVerify} onChange={(event) => setSignupPwVerify(event.target.value)} _placeholder={{color: "gray.700"}}/>
                      <InputRightElement h="full">
                        <Button colorScheme="gray" onClick={handlePswVerifyClick}>
                          {showPswVerify ? <ViewIcon/> : <ViewOffIcon/>}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Button colorScheme="pink" onClick={handleSignUp}>Sign up</Button>
                </Stack>
              </Box>
            </Stack>
          </Flex>
      </div>
    );
}