"use client"
import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Posts(props) {
  const [posts, setPosts] = useState([]);
  const slug = props.params.id
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
          // (where: { slug: "arit" })

      //       const query = gql`
      //       query {
      //         categories (where: { slug: "${slug}" }){
      //           nodes {
      //             id
      //             name
      //             slug
      //             posts {
      //               edges {
      //                 node {
      //                   id
      //                   featuredImage {
      //                     node {
      //                       altText
      //                       sourceUrl
      //                     }
      //                   }
      //                   categories {
      //                     nodes {
      //                       id
      //                       name
      //                       slug
      //                     }
      //                   }
      //                 }
      //               }
      //             }
      //           }
      //         }
      //       }
            
          // `;
          const query = gql`
          {
   
            posts(where: { categoryName: "${slug}"}) {
              edges {
                node {
                  id
                  title
                  featuredImage {
                    node {
                      sourceUrl
                    }
                  }
                  categories {
                    edges {
                      node {
                        name
                        slug
                      }
                    }
                  }
                }
              }
            }
          }
          `

            try {
                const { data } = await client.query({ query });
              console.log(data.posts.edges)
              setPosts(data.posts.edges)
              // setPosts(data.categories.nodes)
                // setPosts(data.categories.nodes.posts.edges);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            {/* Render your posts data */}
           
        <div className="main">
          {/* <Carousel showThumbs={false} autoPlay showArrows={true}>

          {posts.map((post) => (
            <img key={post.id} src={post.posts.edges[0].node.featuredImage.node.sourceUrl}/>
            
          ))}
          </Carousel> */}
          {/* <div className="slider">
            
                    <Carousel
                        additionalTransfrom={0}
                        swipeable={false}
                        draggable={true}
                        showDots={true}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlay={props.deviceType !== "mobile" ? true : false}
                        autoPlaySpeed={5000}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        transitionTimingFunction={'ease-out'}
                        minimumTouchDrag={80}
                        containerClass="container-with-dots"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        deviceType={props.deviceType}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"



                    >
              {posts.map((post) => (
                
                            <div key={post.node.id}>

                                {post.node.featuredImage?.node && (
                                    <img
                                        src={post.node.featuredImage.node.sourceUrl}
                                        alt={post.node.featuredImage.node.altText}
                                        className='h-auto max-w-full'
                              />
                              
                            )}
                           
                            {post.node.categories?.nodes && (
                              <p>{post.node.categories.nodes.slug}</p>
                            )}
                       </div>

                        ))}
                    </Carousel>

                </div> */}
               
            </div>



        </>
    );
}
