import { Box, Flex, Stack } from "@chakra-ui/react";

import CreateButton from "./PostCreation";
import PostList from "./PostList";
import { useEffect, useState } from "react";
import { getPosts } from "../../apis/apis";

export default function PostLayout(){
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        // getPosts();
        getPosts(setPosts);
    }, [])

    return(
        <Flex 
            flexDirection="row"
            justifyContent="flex-start"
            flexWrap="wrap"
            alignItems="stretch"
            gap={12}>
            <Stack>
                <CreateButton/>
            </Stack>
            <Box flex='1'>
                <PostList posts={posts}/>
            </Box>
        </Flex>
    )
}