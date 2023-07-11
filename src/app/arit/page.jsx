"use client"
import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export default function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const client = new ApolloClient({
                uri: 'https://pr.web.rmutsv.ac.th/graphql', // Replace with your WordPress GraphQL endpoint
                cache: new InMemoryCache(),
            });

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
                const { data } = await client.query({ query });
                console.log(data)
                setPosts(data.posts.edges);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            {/* Render your posts data */}
            {posts.map((post) => (
                <div key={post.node.slug}>
                    <h2>{post.node.slug}</h2>
                    {post.node.featuredImage && post.node.featuredImage.node && (
            <img
              src={post.node.featuredImage.node.sourceUrl}
              alt={post.node.featuredImage.node.altText}
            />
          )}
                    {/* <p>{post.node.featuredImage}</p> */}
                    {/* <img src={post.node.featuredImage.node.sourceUrl} alt={post.node.featuredImage.node.altText} /> */}
                </div>
            ))}
        </div>
    );
}
