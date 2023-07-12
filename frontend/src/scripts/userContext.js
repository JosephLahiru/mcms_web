import { createContext, useContext } from 'react';

const UserContext = createContext(null);

export const useUser = () => {
  return useContext(UserContext);
};

export default UserContext;