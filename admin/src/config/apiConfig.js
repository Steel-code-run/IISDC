export const token = (typeof window !== "undefined") ? window.sessionStorage.getItem('token') : ''

export const defaultHeaders = {
    Authorization: 'Bearer ' + token
}

export const serverUrl = process.env.NEXT_PUBLIC_API_URL
