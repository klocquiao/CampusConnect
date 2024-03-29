import { Box, Button, Flex, Stack } from "@chakra-ui/react";

import CreateButton from "./PostCreation";
import PostList from "./PostList";
import { useContext, useEffect, useState } from "react";
import { checkUserAuth, getPosts } from "../../apis/apis";
import { UserContext } from "../../pages/_app";

export default function PostLayout(){
    const [posts, setPosts] = useState(null);
    const user = useContext(UserContext);

    useEffect(() => {
        getPosts(setPosts);
    }, []);

    const onTestClick = () => {
        if(user){
            user.getIdToken().then((token) =>{
                checkUserAuth(token);
            })
        }else{
            console.log("Not logged in");
        }
    };
 
    return(
        <Flex 
            flexDirection="row"
            justifyContent="flex-start"
            flexWrap="wrap"
            alignItems="stretch"
            gap={12}>
            <Stack>
                <CreateButton/>
                <Button onClick={onTestClick}>Test Token</Button>
            </Stack>
            <Box flex='1'>
                <PostList posts={posts}/>
            </Box>
        </Flex>
    )
}