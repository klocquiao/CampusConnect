import { Button } from "@chakra-ui/react";
import Link from 'next/link';
import { AddIcon } from "@chakra-ui/icons";

export function CreateButton(){
    
    return(
        <div>
            <Button
                variant="outline"
                colorScheme={"pink"}
                size={"sm"}
                mr={4}
                borderRadius={20}
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