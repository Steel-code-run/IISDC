import axios from "axios";

export const loginReq = async (name: string, password:string) => {

    const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}v1/users/login`,
        {
            name,
            password
        }, {

        })

    return res.data
}