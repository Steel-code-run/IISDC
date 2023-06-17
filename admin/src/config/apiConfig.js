export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNjg2NTE2MjUzLCJleHAiOjE2ODY2MDI2NTN9.Znx-dkz1juwRfEVlNiQAuyskrKQ98oaJ4xZSIkRYThk'

export const defaultHeaders = {
    Authorization: 'Bearer ' + token
}

export const serverUrl = process.env.NEXT_PUBLIC_API_URL;
