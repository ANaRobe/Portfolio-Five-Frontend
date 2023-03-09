import axios from "axios";
import {useEffect} from "react";
import {useHistory} from "react-router";

export const useRedirect = (userAuthStatus) => {
    const history = useHistory();

    useEffect(() => {
        const onMount = async () => {
            try {
                await axios.post("/dj-rest-auth/token/refresh/");
                // run the below code when user is logged in
                if (userAuthStatus === "loggedIn") {
                    history.push("/");
                }
            } catch (err) { // run the below code when user is logged out
                if (userAuthStatus === "loggedOut") {
                    history.push("/");
                }
            }
        };

        onMount();
    }, [history, userAuthStatus]);
};
