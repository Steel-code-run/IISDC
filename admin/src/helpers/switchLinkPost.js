export const defineLinkPost = (type, id) => {
    switch (type) {
        case 'grant':
            return `/grant/${id}`;
        case 'competition':
            return `/competition/${id}`;
        case 'internship':
            return `/internship/${id}`;
        default:
            return '/'
    }
}