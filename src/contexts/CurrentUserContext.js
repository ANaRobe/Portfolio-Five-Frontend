import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => { 
  const [currentUser, setCurrentUser] = useState(null);
      /* 
        Put elements into the DOM
    */
  const onMount = async () => {
    try {
      const { data } = await axios.get("dj-rest-auth/user/"); // API call when component mounts
      setCurrentUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onMount();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};