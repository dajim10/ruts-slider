"use client"
import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Posts(props) {
  const [posts, setPosts] = useState([]);
  const slug = props.params.slug;

  useEffect(() => {
    const fetchPosts = async () => {
      const client = new ApolloClient({
        uri: 'https://pr.web.rmutsv.ac.th/graphql', // Replace with your WordPress GraphQL endpoint
        cache: new InMemoryCache(),
      });

      const query = gql`
        query PostsByCategorySlug($slug: [String]) {
          categories(where: { slug: $slug }) {
            edges {
              node {
                name
                posts {
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
            }
          }
        }
      `;

      try {
        const { data } = await client.query({ query, variables: { slug } });
        const category = data.categories.edges[0]?.node;
        if (category) {
          setPosts(category.posts.edges);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, [slug]);
    
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };


  return (
    <div>
      {posts.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <Carousel autoPlay infiniteLoop interval={9000} responsive={responsive} showThumbs={false} dynamicHeight={true}>
          {posts.map((post) => (
            <div key={post.node.id}>
              <h2>{post.node.title}</h2>
              {post.node.featuredImage && (
                <img src={post.node.featuredImage.node.sourceUrl} alt={post.node.title} />
              )}
              <div>
                {post.node.categories.edges.map((category) => (
                  <p key={category.node.slug}>{category.node.slug}</p>
                ))}
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}
