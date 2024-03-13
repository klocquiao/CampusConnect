import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from "react";

type UserContextType = {
    userId: string;
    username: string;
    password: string;
    setUserId: Dispatch<SetStateAction<string>>;
};

const UserContext = createContext<UserContextType>({
    userId: '',
    username: '',
    password: '',
    setUserId: () => {
        //Init
    },
});

type Props = {
    children: ReactNode
};

export const UserProvider = ({ children }: Props) => {
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const value = useMemo(
        () => ({
            userId,
            username,
            password,
            setUserId,
        }),
        [userId, username, password],
    );

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);