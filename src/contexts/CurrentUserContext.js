import {
    createContext,
    useContext,
    useEffect,
    useState,
    useMemo
} from "react";
import axios from "axios";
import {axiosReq, axiosRes} from "../api/axiosDefaults";
import {useHistory} from "react-router";
import {removeTokenTimestamp, shouldRefreshToken} from "../utils/utils";


export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);


/*
  Determin logged-in status.
 */
export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const history = useHistory();
    /* 
        Put elements into the DOM
    */
    const onMount = async () => {
        try {
            const {data} = await axiosRes.get("dj-rest-auth/user/"); // API call when component mounts
            setCurrentUser(data);
        } catch (error) {}
    };

    useEffect(() => {
        onMount();
    }, []);

    /**
    Update axios instance
   */
    useMemo(() => { /**
    Request interceptor
   */
        axiosReq.interceptors.request.use(async (config) => {
            if (shouldRefreshToken()) {
                try {
                    await axios.post("/dj-rest-auth/token/refresh/");
                } catch (error) {
                    setCurrentUser((currentUser) => {
                        if (currentUser) {
                            history.push("/signin");
                        }
                        return null;
                    });
                    removeTokenTimestamp();
                    return config;
                }
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
        /**
     Response interceptor
   */
        axiosRes.interceptors.response.use((response) => response, async (error) => {
            if (error.response?.status === 401) {
                try {
                    await axios.post("/dj-rest-auth/token/refresh/");
                } catch (error) {
                    setCurrentUser((currentUser) => { //
                        if (currentUser) {
                            history.push("/signin");
                        }
                        return null;
                    });
                    removeTokenTimestamp();
                }
                return axios(error.config);
            }
            return Promise.reject(error);
        });
    }, [history]);


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                {children} </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    );
};
