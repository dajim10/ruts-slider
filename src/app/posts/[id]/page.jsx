"use client"
import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Posts({ deviceType, params }) {
    const [posts, setPosts] = useState([]);
    const postID = params.id;
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
            partialVisibilityGutter: 60,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2,// optional, default to 1.
            partialVisibilityGutter: 40,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
            partialVisibilityGutter: 30,
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const client = new ApolloClient({
                uri: 'https://pr.web.rmutsv.ac.th/graphql', // Replace with your WordPress GraphQL endpoint
                cache: new InMemoryCache(),
            });

            const query = await gql(`
  posts (where : { categoryName: $categoriesName }) {
    edges {
      node {
        id
        title
        featuredImage {
          node {
            altText
            slug
            sourceUrl
          }
        }
      categories {
        nodes {
          id
          name
          slug
        } 
      }
      }
    }
  }
`, { categoriesName: `${postID}` });

            //         const query = gql`
            //     query {
            //       posts (where : { categoryName: $categoriesName }){
            //         edges {
            //           node {
            //             slug

            //             featuredImage {
            //               node {
            //                 altText
            //                 sourceUrl
            //               }
            //             }
            //             categories {
            //                 nodes {
            //                   id
            //                   name
            //                   slug
            //                 } 
            //               }
            //           }
            //         }
            //       }
            //     }
            //   `;

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
            <nav className="bg-blue-900 text-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-blue-900">
                <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">ระบบประชาสัมพันธ์ มทร.ศรีวิชัย ข่าวของหน่วยงาน <span className='text-yellow-400'> [{postID}] </span> ระบบทดสอบ</span>
            </nav>
            <div className="main">
                <div className="slider">
                    <Carousel
                        additionalTransfrom={0}
                        swipeable={false}
                        draggable={true}
                        showDots={true}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlay={deviceType !== "mobile" ? true : false}
                        autoPlaySpeed={5000}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        transitionTimingFunction={'ease-out'}
                        minimumTouchDrag={80}
                        containerClass="container-with-dots"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        deviceType={deviceType}
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

                </div>

            </div>



        </>
    );
}
