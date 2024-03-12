import { useState } from "react";
import styled from "styled-components";

import { Avatar, Container } from "@chakra-ui/react";

const PfpImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    background: white;
    border-radius: 6rem;
    width: 11rem;
    height: 11rem;
`;

const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    padding: 1rem;
`;

export default function ProfileIndex(){
    const [user, setUser] = useState(null);
    const [userIcon, setUserIcon] = useState(["gray.100","0"]);

    return(
        <div>
            <Container>
                <div>
                <PfpImgContainer>
                    <Avatar
                        size={"2xl"}
                        bg={userIcon[0]}
                        src={`/images/pfp-icon-imgs/${userIcon[1]}.png`}
                        alt={"Profile Picture"}
                        name={"Display Name"}
                    />
                </PfpImgContainer>
                    <h1>Display Name</h1>
                </div>
            </Container>
        </div>
    )
}