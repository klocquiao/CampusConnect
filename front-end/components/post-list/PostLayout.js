import { Box, Flex, Stack } from "@chakra-ui/react";

import CreateButton from "./PostCreation";
import PostList from "./PostList";

export default function PostLayout(){
    return(
        <Flex 
            flexDirection="row"
            justifyContent="flex-start"
            flexWrap="wrap"
            alignItems="stretch"
            gap={12}>
            <Stack bg="orange.100">
                <CreateButton/>
            </Stack>
            <Box flex='1' bg="red.100">
                <PostList/>
            </Box>
        </Flex>
    )
}