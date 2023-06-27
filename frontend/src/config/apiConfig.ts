export const token = (typeof window !== "undefined") ? window.sessionStorage.getItem('token') : ''

export const defaultHeaders = {
    Authorization: 'Bearer ' + token
}

export const serverUrl = process.env.REACT_APP_SERVER_URL
