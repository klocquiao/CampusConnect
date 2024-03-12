import { Button } from "@chakra-ui/react";
import Link from 'next/link';
import { AddIcon } from "@chakra-ui/icons";

export function CreateButton(){
    
    return(
        <div>
            <Button
                variant="solid"
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                leftIcon={<AddIcon/>}
                as={Link}
                href={"/create/post"}
                aria-controls="Create Post">
                Create Post
            </Button>
        </div>
    )
}

export default CreateButton;