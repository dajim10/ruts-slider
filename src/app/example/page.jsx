export default async function Test() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const jsonData = await response.json();
    console.log(jsonData)
    return <h1>{JSON.stringify(jsonData)}</h1>
}