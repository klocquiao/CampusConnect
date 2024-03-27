import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useMemo,
    useState,
  } from 'react';

  type UserContextType = {
    uid: string;
    setUid: Dispatch<SetStateAction<string>>;
  };
  
  const UserContext = createContext<UserContextType>({
    uid: '',
    setUid: () => {
      // Initial
    },
  });
  
  type Props = {
    children: ReactNode;
  };
  
  export const UserProvider = ({ children }: Props) => {
    const [uid, setUid] = useState('');
    const value = useMemo(
      () => ({
        uid,
        setUid,
      }),
      [uid],
    );
  
    return (
      <UserContext.Provider value={value}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export const useUser = () => useContext(UserContext);