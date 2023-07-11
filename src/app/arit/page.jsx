"use client"
import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


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
            <Carousel
                showThumbs={false}
                onClickItem={this.click_item}
                showStatus={false}
                autoPlay={true}
                interval={2000}
                infiniteLoop={true}
                dynamicHeight={true}
            // showArrows
            // infiniteLoop
            // autoPlay
            // emulateTouch
            // onClickItem={(...args) => console.log('onClickItem', ...args)}
            // onChange={(...args) => console.log('onChange', ...args)}
            // onClickThumb={(...args) => console.log('onClickThumb', ...args)}
            >
                {posts.map((post) => (
                    <div key={post.node.slug}>
                        {/* <h2>{post.node.slug}</h2> */}
                        {post.node.featuredImage?.node && (
                            <img
                                src={post.node.featuredImage.node.sourceUrl}
                                alt={post.node.featuredImage.node.altText}
                            />
                        )}
                    </div>
                ))}
            </Carousel>

        </div>
    );
}
