import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from "react";

//TODO: Modify code and reference CartContext.tsx

export type Post = {
    userId: string;
    description: string;
    tags: string;
    price: number;
    posting: Posting;
};

type Posting = {
    userId: string;
    orderId: string;
    description: string;
    tags: string;
    price: number;
}

type Props = {
    children: ReactNode
};

// const PostContext = createContext<Post>({
//     userId: '',
//     description: ',',
//     tags: '',
//     price: 0,
//     posting: {
//         userId: '',
//         orderId: '',
//         description: '',
//         tags: '',
//         price: 0,
//     },
// });

const PostContext = createContext([] as Post[]);

export const PostProvider = ({ children }: Props) => {
    const [posts, setPosts] = useState([]);
    // const [userId, setUserId] = useState('');
    // const [description, setDescription] = useState('');
    // const [tags, setTags] = useState('');
    // const [price, setPrice] = useState(0);
    // const [posting, setPosting] = useState<Posting>({
    //     userId: '',
    //     orderId: '',
    //     description: ',',
    //     tags: '',
    //     price: 0,
    // })

    // const value = useMemo(
    //     () => ({
    //         userId,
    //         description,
    //         tags,
    //         price,
    //         posting,
    //     }),
    //     [userId, description, tags, price, posting],
    // );

    return (
        <PostContext.Provider value={posts}>
            {children}
        </PostContext.Provider>
    );
};

export const useUser = () => useContext(PostContext);