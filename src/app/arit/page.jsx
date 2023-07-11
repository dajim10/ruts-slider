import { request, gql } from 'graphql-request';

export async function fetchData() {
  const endpoint = 'https://pr.web.rmutsv.ac.th/graphql'; // Replace with your WordPress GraphQL endpoint

  const query = gql`
    query {
      posts {
        edges {
          node {
            slug
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await request(endpoint, query);
    return data.posts.edges;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
