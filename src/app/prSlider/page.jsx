async function getData() {
  const res = await fetch('https://pr.web.rmutsv.ac.th/wp-json/wp/v2/posts')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
export default async function Page() {
  const data = await getData()
 
  return <main >
    <>
      {data.map((item, index) => {
        return (
          <div key={index}>
            <ul>
              <li>{item.id}</li>
              <li>{item.link}</li>
            </ul>
          </div>
        )
      })}
    </>
  </main>
}