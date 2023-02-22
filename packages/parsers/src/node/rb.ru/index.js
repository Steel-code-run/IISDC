const {convertJson} = require("../../utils/methodsParser");

const filterPosts = (posts) => {
    return posts
        .filter((post) => post.postType === 'grant' || post.postType === 'competition')
};


(async function main() {
    const num_categories = [2, 4]
    const dataApi = []

    for (let num in num_categories) {
        dataApi.push(...convertJson(await fetch(`https://rb.ru/api/chance/list/?page=1&limit=32&orphans=5&category=${num}`,
            {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "ru,en;q=0.9",
                    "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Yandex\";v=\"23\"",
                    "sec-ch-ua-mobile": "?1",
                    "sec-ch-ua-platform": "\"Android\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin"
                },
                "referrer": "https://rb.ru/chance/grant/",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "GET",
                "mode": "cors",
                "credentials": "include"
            }).then(data => data.json())).project_list)
    }

    const receivedPosts = dataApi.map(post => {
        return {
            postType: (post.category.slug === 'contest') ? 'competition' : post.category.slug,
            postDescription: {
                namePost: post.name,
                dateCreationPost: '',
                directionForSpent: "",
                summary: '',
                fullText: '',
                deadline: post.stop_dt,
                linkPDF: '',
                link: post.url,
            },

        };
    })


    try {
        console.log(
            JSON.stringify(filterPosts(receivedPosts), null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()
