"use client"
import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Posts(props) {
    const [posts, setPosts] = useState([]);
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
    };
    
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

            <Carousel
                   swipeable={false}
                   draggable={false}
                   showDots={true}
                   responsive={responsive}
                   ssr={true} // means to render carousel on server-side.
                   infinite={true}
                   autoPlay={props.deviceType !== "mobile" ? true : false}
                   autoPlaySpeed={5000}
                   keyBoardControl={true}
                   customTransition="ease-in all .5"
                   transitionDuration={100}
                   containerClass="carousel-container"
                   removeArrowOnDeviceType={["tablet", "mobile"]}
                   deviceType={props.deviceType}
                   dotListClass="custom-dot-list-style"
                   itemClass="carousel-item-padding-40-px"
               
                >
                    {posts.map((post) => (
                        <div key={post.node.slug}>

                            {post.node.featuredImage?.node && (
                                <img
                                    src={post.node.featuredImage.node.sourceUrl}
                                    alt={post.node.featuredImage.node.altText}
                                    className='h-auto max-w-full'
                                />
                            )}
                        </div>
                    ))}
            </Carousel>
            
            
        </>
    );
}
