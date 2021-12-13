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
        .catch(error => {
            console.erroror(error);
        });
}

export async function getLatestPost() {
    return await api.posts
        .browse({
            limit: "1"
        })
        .catch(error => {
            console.erroror(error);
        });
}

export async function getPost(postSlug) {
    return await api.posts.read({
            slug: postSlug,
            include: "tags,authors",
        })
        .catch(error => {
            console.erroror(error);
        });
}

export async function getPage(pageSlug) {
    return await api.pages.read({
            slug: pageSlug,
        })
        .catch(error => {
            console.erroror(error);
        });
}