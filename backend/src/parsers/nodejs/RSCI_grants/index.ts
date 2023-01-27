const page = process.argv[2];

console.log(
    JSON.stringify({
        type: "grant",
        posts: [
            {
                direction: "direction",
                organization: "organization",
                timeOfStart: "timeOfStart",
                summary: "summary",
                timeOfEnd: "timeOfEnd",
                description: "description",
                fullText: "fullText",
                link: "link",
            },
            {
                direction: "direction",
                organization: "organization",
                timeOfStart: "timeOfStart",
                summary: "summary",
                timeOfEnd: "timeOfEnd",
                description: "description",
                fullText: "fullText",
                link: "link",
            }
        ]
    })
)