import GhostContentAPI from "@tryghost/content-api";

const api = new GhostContentAPI({
    url: 'https://blog.praveent.com',
    key: 'f13f8c5962c8e5894779443f30',
    version: "v3"
});

export async function getPosts() {
    return await api.posts
        .browse({
            limit: "all",
            
        })
        .catch(err => {
            console.error(err);
        });
}

export async function getPost(postSlug) {
    return await api.posts.read({
            slug: postSlug
        })
        .catch(err => {
            console.error(err);
        });
}

export async function getLatestPost() {
    return await api.posts
        .browse({
            limit: "1"
        })
        .catch(err => {
            console.error(err);
        });
}