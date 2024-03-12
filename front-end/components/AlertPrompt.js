import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import { useRef } from "react"

export default function AlertPrompt({isOpen, dialogue, action}){
    const cancelRef = useRef();
    return(
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={action} isCentered size="sm">
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader/>
                    <AlertDialogBody>
                        {dialogue}
                    </AlertDialogBody>
                    <AlertDialogFooter mt={0}>
                        <Button ref={cancelRef} onClick={action}>Close</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
};