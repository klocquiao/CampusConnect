import { Box, Flex } from "@chakra-ui/react";

import PostList from "./PostList";
import { useContext, useEffect, useState } from "react";
import { getPosts } from "../../apis/apis";
import { UserContext } from "../../pages/_app";

export default function PostLayout(){
    const [posts, setPosts] = useState(null);
    const user = useContext(UserContext);

    useEffect(() => {
        getPosts(setPosts);
    }, []);
 
    return(
        <Flex 
            flexDirection="row"
            justifyContent="flex-start"
            flexWrap="wrap"
            alignItems="stretch"
            gap={12}>
            <Box flex='1'>
                <PostList posts={posts}/>
            </Box>
        </Flex>
    )
}