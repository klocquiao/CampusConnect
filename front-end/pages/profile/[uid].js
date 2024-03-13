import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import { Avatar, Container } from "@chakra-ui/react";
import { getUser } from "../../apis/apis";

const PfpImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    background: white;
    border-radius: 6rem;
    width: 11rem;
    height: 11rem;
`;

export default function Profile(){
    const [user, setUser] = useState({'user_name': 'Loading'});
    const [userIcon, setUserIcon] = useState(["gray.100","0"]);

    const router = useRouter();
    let {uid} = router.query;

    useEffect(() => {
        try{
            if(urlUid){
                getUser(uid, setUser);
                console.log(uid);
            }
        }catch(err){
            console.log(err);
        }
    }, [uid]);

    return(
        <Container>
            <div>
                <PfpImgContainer>
                    <Avatar
                        size={"2xl"}
                        bg={userIcon[0]}
                        src={`/images/pfp-icon-imgs/${userIcon[1]}.png`}
                        alt={"Profile Picture"}
                        name={uid}
                    />
                </PfpImgContainer>
                <h1>{uid}</h1>
            </div>
        </Container>
    )
}