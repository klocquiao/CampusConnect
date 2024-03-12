import { useState } from 'react';

import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react';

export default function Post(){
    const [description, setDesc] = useState("");
    const [tags, setTags] = useState("");
    const [price, setPrice] = useState(null);
    const [errMsg, setErrMsg] = useState("");

    return(
        <div>
            <Flex align={"center"} justify={"center"}>
            <Stack spacing={6} w={"full"} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Create Post</Heading>
                </Stack>
                <Box rounded={"lg"} bg={"gray.700"} boxShadow={"lg"} p={8}>
                <Stack spacing={4}>
                    <Text color="white" fontSize="md">{errMsg}</Text>
                    <FormControl id="description">
                    <FormLabel color="white">Description</FormLabel>
                    <Input color="white" type="text" name="description" placeholder="Enter some text..." value={description} onChange={(event) => setDesc(event.target.value)} _placeholder={{color: "gray.300"}}/>
                    </FormControl>
                    <FormControl id="tags">
                    <FormLabel color="white">Tags</FormLabel>
                    <Input color="white" type="text" name="tag" placeholder="Ex. CMPT 100, textbook, selling" value={tags} onChange={(event) => setTags(event.target.value)} _placeholder={{color: "gray.300"}}/>
                    </FormControl>
                    <FormControl id="price">
                    <FormLabel color="white">Price</FormLabel>
                    <Input color="white" type="number" name="price" placeholder="Enter a price" value={price} onChange={(event) => setPrice(event.target.value)} _placeholder={{color: "gray.300"}}/>
                    </FormControl>
                    <Button colorScheme="teal">Create Post</Button>
                </Stack>
                </Box>
            </Stack>
            </Flex>
        </div>
    )
}