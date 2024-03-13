import { useState } from 'react';

import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { Dropzone } from '../../components/Dropzone';
import { createPost } from '../../apis/apis';
import { useRouter } from 'next/router';

export default function Post(){
    const [description, setDesc] = useState("");
    const [price, setPrice] = useState(null);
    const [tags, setTags] = useState([]);
    const [errMsg, setErrMsg] = useState("");

    const onPostClick = () => {
        createPost({
            "user_id": "3df58ca7-f1a4-4095-841d-60507ccab20a",
            "order_id": "3df58ca7-f1a4-4095-841d-60507ccab20a",
            description: description,
            price: price,
            tags: tags,
        }).then(() => {
            const router = useRouter();
            router.push('/home');
        }).catch(err => {
            console.log(err);
        });
    }

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
                    <Button colorScheme="teal" onClick={onPostClick}>Create Post</Button>
                </Stack>
                </Box>
                <Heading fontSize={"4xl"}>Ad image upload</Heading>
                <Dropzone className='p-16 mt-10 border border-neutral-200'/>
            </Stack>
            </Flex>
        </div>
    )
}