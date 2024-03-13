import { Avatar, Card, CardBody, HStack, Heading, List, ListItem, Stack, Text } from "@chakra-ui/react";

export function PostList(){
    return(
        <div>
            <h2>Posts</h2>
            <List>
                <Posting text={"This is a test post"}/>
                <Posting text={"Looking for groupmates for CMPT 474"}/>
                <Posting text={"Looking to sell textbook"}/>
                <Posting text={"Looking for a roommate"}/>
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