import axios from "axios";

export const responseUser = async (page, rowsPerPage) => {
     const {data} = await axios.post('http://localhost:3000/v1/users/get', {
            skip: page,
            take: rowsPerPage,
            where: {
                // name: "admin"
            }
        },
        {
            headers: {
                'Authorization': 'Bearer ' +
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJpZCI6MiwiaWF0IjoxNjg0MDczMzIwLCJleHAiOjE2ODQxNTk3MjB9.jceAzQVla2WAfPMB1mctsqGSETYwzlIspBfqEQMqUpo'
            }

        });
    return data

}

export const addUser = async (data) => {
    return await axios.post('http://localhost:3000/v1/users', {
        ...data
    }, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJpZCI6MiwiaWF0IjoxNjg0MzYyMzQ3LCJleHAiOjE2ODQ0NDg3NDd9.7bRwiVgwDrGwyq9B-eW9m9XMCCBuIv--1zvzW_i0nu0'
        }
    });
}