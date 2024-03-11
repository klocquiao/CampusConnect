import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Stack, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export function CreateButton(){
    const {isOpen, onOpen, onClose} = useDisclosure();
    
    return(
        <div>
            <Button
                variant="solid"
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                leftIcon={<AddIcon/>}
                onClick={onOpen}
                aria-controls="Create Post">
                Create Post
            </Button>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="sm" closeOnOverlayClick={false}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader borderBottomWidth="1px">
                        Create Post
                    </DrawerHeader>
                    <DrawerBody>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default CreateButton;