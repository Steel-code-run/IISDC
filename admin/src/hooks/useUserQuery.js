import {useQuery} from "@tanstack/react-query";
import {responseUser} from "../api/userResponses";


export const useUserQuery = (key, ...args) => {


    return useQuery(
        [key],
        () => responseUser(...args)
    )
}