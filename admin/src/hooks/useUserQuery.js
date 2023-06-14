import {useQuery} from "@tanstack/react-query";
import {responseUser} from "../api/userResponses";


export const useUserQuery = (key, fn, ...args ) => {
    
    return useQuery(
        [key, ...args],
        () => fn(...args)
    )
}