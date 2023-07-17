export default function getAllPost(props) {
    const slug = props.params.slug
    return (
        <h1>{slug}</h1>
  )
}