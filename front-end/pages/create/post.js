import { useContext, useEffect, useState } from 'react';

import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { Dropzone } from '../../components/Dropzone';
import { createPost, downloadImage } from '../../apis/apis';
import { useRouter } from 'next/router';
import { UserContext } from '../_app';

export default function Post(){
    const [description, setDesc] = useState("");
    const [price, setPrice] = useState(null);
    const [tags, setTags] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [recentImage, setRecentImage] = useState(null);
    const [path, setPath] = useState("");
    const [bucketUrl, setBucketUrl] = useState("");
    const router = useRouter();
    const user = useContext(UserContext);

    useEffect(() => {
        if(window){
            var hostUrl = window.location.hostname;
            hostUrl = hostUrl.replaceAll('.','-');
            setBucketUrl(hostUrl);
        }
    }, []);

    const onPostClick = () => {
        const arrayTags = tags.split(',');
        createPost({
            "user_id": user.uid,
            "order_id": "3df58ca7-f1a4-4095-841d-60507ccab20a",
            description: description,
            price: price,
            tags: arrayTags,
        }, user).then((resp) => {
            router.push("/home");
        }).catch(err => {
            console.log(err);
        });
    };
    const handleDownload = async () => {
        if (recentImage != null) {
            const resp = await downloadImage(bucketUrl, 'swag'.concat('_user'), recentImage.name, user); // TODO actual username
            const blob = await resp.json();
            console.log(blob);
            // const createdPath = URL.createObjectURL(blob);
            // setPath(createdPath);
            setPath(blob.message);
        }
    }

    return(
        <div>
            {user ?
                <Flex align={"center"} justify={"center"}>
                <Stack spacing={6} w={"full"} mx={"auto"} maxW={"2xl"} py={12} px={6}>
                    <Stack align={"center"}>
                    <Heading as="h2" fontSize='6xl' fontWeight='extrabold'>Create Post</Heading>
                    </Stack>
                    <Box boxShadow='xl' p='6' rounded='md' border='1px' borderColor='gray.200' bg='white'>
                    <Stack spacing={4}>
                        <Text fontSize="md">{errMsg}</Text>
                        <FormControl id="description">
                        <FormLabel>Description</FormLabel>
                        <Input type="text" name="description" placeholder="Enter some text..." value={description} onChange={(event) => setDesc(event.target.value)} _placeholder={{color: "gray.700"}}/>
                        </FormControl>
                        <FormControl id="tags">
                        <FormLabel>Tags</FormLabel>
                        <Input type="text" name="tag" placeholder="Ex. CMPT 100, textbook, selling" value={tags} onChange={(event) => setTags(event.target.value)} _placeholder={{color: "gray.700"}}/>
                        </FormControl>
                        <FormControl id="price">
                        <FormLabel>Price</FormLabel>
                        <Input type="number" name="price" placeholder="Enter a price" value={price} onChange={(event) => setPrice(event.target.value)} _placeholder={{color: "gray.700"}}/>
                        </FormControl>
                        <Button colorScheme="pink" onClick={onPostClick}>Create Post</Button>
                    </Stack>
                    </Box>
                    <Heading fontSize={"4xl"}>Ad image upload</Heading>
                    <Dropzone setRecentImage={setRecentImage} bucketUrl={bucketUrl} userRef={user} className='p-16 mt-10 border border-neutral-200'/>
                    <Heading fontSize={"4xl"}>Download the image you just uploaded</Heading>
                    <Button onClick={handleDownload} disabled={recentImage == null}>Download</Button>
                    <Heading fontSize={"4xl"}>Your image:</Heading>
                    {/* <img key={path} src={path} /> */}
                    <Text>The response back from the server (using a temporary username): {path} </Text>
                </Stack>
                </Flex>
            : 
                <Flex align={"center"} justify={"center"}>
                <Stack spacing={6} w={"full"} mx={"auto"} maxW={"2xl"} py={12} px={6}>
                    <Stack align={"center"}>
                    <Heading as="h2" fontSize='6xl' fontWeight='extrabold'>Create Post</Heading>
                    </Stack>
                    <Box boxShadow='xl' p='6' rounded='md' border='1px' borderColor='gray.200' bg='white'>
                    <Stack spacing={4}>
                        <Text textAlign={"center"}>Login to create post</Text>
                        <Button as={Link} href="/" colorScheme="pink">Return to homepage</Button>
                    </Stack>
                    </Box>
                </Stack>
                </Flex>
            }
        </div>
    )
}