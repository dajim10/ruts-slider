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
        <>
            {/* Render your posts data */}
            <nav className="bg-gray-200 text-black-300 border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
                <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">ระบบประชาสัมพันธ์ มทร.ศรีวิชัย</span>
            </nav>

            {/* <Carousel
                    showThumbs={false}
                    showStatus={false}
                    autoPlay
                    interval={5000}
                    infiniteLoop={true}
                    dynamicHeight={true}
               
                >
                    {posts.map((post) => (
                        <div key={post.node.slug}>

                            {post.node.featuredImage?.node && (
                                <img
                                    src={post.node.featuredImage.node.sourceUrl}
                                    alt={post.node.featuredImage.node.altText}
                                />
                            )}
                        </div>
                    ))}
            </Carousel> */}
            
            <div id="animation-carousel" className="h-100 relative" data-carousel="static">

                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">

                    <div className="duration-200 ease-linear" data-carousel-item>
                        {/* <img src="/docs/images/carousel/carousel-1.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." /> */}
                        {posts.map((post) => (
                            <div key={post.node.slug}>
                                {/* <h2>{post.node.slug}</h2> */}
                                {post.node.featuredImage?.node && (
                                    <img
                                        src={post.node.featuredImage.node.sourceUrl}
                                        alt={post.node.featuredImage.node.altText}
                                        className='className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"'
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
               

            </div >
        </>
    );
}
