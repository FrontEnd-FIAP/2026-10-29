import { useState, useEffect } from 'react'

//Define a estrutura tipada do post interno
interface Post {
  id: number
  title: string
  body: string
}

const ClienteApi = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => res.json())
      .then((data: Post[]) => setPosts(data))
      .catch((err) => console.error("Erro ao acessar API", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h2>Cliente API</h2>
      {loading ? (
        <p>Carregando...</p>
      ):(
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default ClienteApi
