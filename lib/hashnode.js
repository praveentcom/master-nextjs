const axios = require('axios').default;

export async function fetchSinglePost({ slug }) {
    const query = `
        query {
            post(slug: "${slug}", hostname: "binary.praveent.com") {
                slug,
                title,
                brief,
                tags {
                    name,
                    logo
                },
                author {
                    name,
                },
                dateUpdated,
                dateAdded,
                contentMarkdown,
                coverImage
            }
        }
    `;
    const variables = {};
    const response = await axios({
        method: 'POST',
        url: 'https://api.hashnode.com/',
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            query,
            variables
        }
    });
    return response?.data?.data?.post || {};
}

export async function fetchPosts({ onlyLatestPost }) {
    const query = `
        query GetUserArticles($page: Int!) {
            user(username: "praveentcom") {
                publication {
                    posts(page: $page) {
                        title
                        brief
                        slug,
                        coverImage
                    }
                }
            }
        }
    `;
    const variables = { page: 0 };
    const response = await axios({
        method: 'POST',
        url: 'https://api.hashnode.com/',
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            query,
            variables
        }
    });
    return onlyLatestPost ? response?.data?.data?.user?.publication?.posts[0] || {} : response?.data?.data?.user?.publication?.posts || [];
}