export async function fetchPostByUri(uri: string) {
    const query = `
      query GetPostByUri($uri: ID!) {
        post(id: $uri, idType: URI) {
          title
          content
          uri
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    `;

    const variables = {
        uri,
    };

    const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_ENDPOINT as string, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
    });

    const responseBody = await res.json();

    if (responseBody.data && responseBody.data.post) {
        return responseBody.data.post;
    } else {
        throw new Error('Failed to fetch the post');
    }
}
