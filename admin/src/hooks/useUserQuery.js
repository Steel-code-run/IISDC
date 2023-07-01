import {useQuery} from "@tanstack/react-query";


export const useUserQuery = (key, fn, ...args ) => {
    return useQuery(
        [key, ...args],
        () => fn(...args)
    )
}