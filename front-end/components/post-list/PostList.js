import { Avatar, Badge, Card, CardBody, CardFooter, HStack, Heading, List, ListItem, Stack, Text } from "@chakra-ui/react";

export function PostList({posts}){
    return(
        <div>
            <h2>Posts</h2>
            <List>
                {posts ? posts.map(post => <Posting text={post.description} price={post.price} tags={post.tags}/>) : <></>}
            </List>
        </div>
    );
}

function Posting({text, price, tags}){
    return(
        <ListItem mt={3}>
            <Card bg={'rgba(0, 0, 0, 0.06)'}>
                <CardBody>
                    <Stack>
                        <HStack>
                            <Avatar name=" " src={"/images/pfp-icon-imgs/0.png"}/>
                            <Text as='b'>${price}</Text>
                            <Text size="md">{text}</Text>
                        </HStack>
                        <HStack>
                            {tags ? tags.map(tag => <Badge colorScheme='purple'>{tag}</Badge>) : <></>}
                        </HStack>
                    </Stack>
                </CardBody>
            </Card>
        </ListItem>
    )
}

export default PostList;