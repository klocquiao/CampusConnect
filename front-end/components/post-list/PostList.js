import { Avatar, Card, CardBody, HStack, Heading, List, ListItem, Stack, Text } from "@chakra-ui/react";

export function PostList({posts}){
    return(
        <div>
            <h2>Posts</h2>
            <List>
                {posts ? posts.map((post) => {
                    <Posting text={post.description}/>
                }) : <></>}
            </List>
        </div>
    );
}

function Posting({text}){
    return(
        <ListItem mt={3}>
            <Card bg={'rgba(0, 0, 0, 0.06)'}>
                <CardBody>
                    <Stack>
                        <HStack>
                            <Avatar name=" " src={"/images/pfp-icon-imgs/0.png"}/>
                            <Text size="md">{text}</Text>
                        </HStack>
                    </Stack>
                </CardBody>
            </Card>
        </ListItem>
    )
}

export default PostList;