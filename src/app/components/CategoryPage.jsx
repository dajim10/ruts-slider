import { request } from 'graphql-request';
import { useRouter } from 'next/router';

const fetchPostsByCategory = async (slug) => {
    const query = `
    query PostsByCategory($slug: String!) {
        posts(where: { categoryName: $slug }) {
          edges {
            node {
              id
              title
              content
              featuredImage {
                node {
                  sourceUrl
                }
              }
              categories {
                edges {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
      
    `;
  const data = await request('https://pr.rmutsv.ac.th/graphql', query, { slug });
  return data.posts.edges;
};

const CategoryPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPostsByCategory = async () => {
      const fetchedPosts = await fetchPostsByCategory(slug);
      setPosts(fetchedPosts);
    };
    if (slug) {
      getPostsByCategory();
    }
  }, [slug]);

  if (!posts.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.node.id}>
          <h2>{post.node.title}</h2>
          {post.node.featuredImage && (
            <img src={post.node.featuredImage.node.sourceUrl} alt={post.node.title} />
          )}
          <div dangerouslySetInnerHTML={{ __html: post.node.content }} />
          <p>Categories:</p>
          <ul>
            {post.node.categories.edges.map((category) => (
              <li key={category.node.name}>{category.node.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
