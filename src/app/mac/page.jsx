async function getData() {
    const res = await fetch('https://e-service.rmutsv.ac.th/arnon/rutsapp/menu_main.php?')
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
   
    return <main className="container p-5">
      <>
        {data.map((item, index) => {
          return (
            <div key={index}>
              <ul role="list" className="divide-y divide-gray-100">
                <li className="flex justify-between gap-x-6 py-5">{item.id}</li>
                <li className="flex justify-between gap-x-6 py-5">{item.link}</li>
              </ul>
            </div>
          )
        })}
      </>
    </main>
  }