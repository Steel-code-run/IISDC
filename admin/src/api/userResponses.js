import axios from "axios";


export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJpZCI6MiwiaWF0IjoxNjg0MDczMzIwLCJleHAiOjE2ODQxNTk3MjB9.jceAzQVla2WAfPMB1mctsqGSETYwzlIspBfqEQMqUpo'
export const responseUser = async (page, rowsPerPage, id) => {
     const {data} = await axios.post('http://localhost:3000/v1/users/get', {
            skip: page,
            take: rowsPerPage,

            where: (!id) ? {} : {
                "id": parseInt(id)
            }
        },
        {
            headers: {
                'Authorization': 'Bearer ' + token

            }

        });
    return data

}

export const addUser = async (data) => {
    return await axios.post('http://localhost:3000/v1/users', {
        ...data
    }, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}

export const deleteUser = async ({id}) => {
    return await axios.delete('http://localhost:3000/v1/users', {
        data: {
            id
        },
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}