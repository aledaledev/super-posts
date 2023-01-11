/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "../api/posts";

export default function Posts({ setPostId }) {

  const queryClient = useQueryClient()  
  console.log(queryClient.getQueryData(['posts']));   //podemos traer las queries y usarlos en logica

//                       boolean,boolean,boolean,distintos estados de la llamada
const {data:posts,error,isLoading,isError,isSuccess,status,isFetching,refetch,fetchStatus} = useQuery(['posts'],getPosts,{
  //refetchOnMount,   //refresh al mutar el server
  //refetchOnReconnect,   //refresh al reconectarse
  //refetchOnWindowFocus,   //refresh cuando se enfocal la ventana
  //refetchInterval,  //refresh cada cierto tiempo
  //staleTime,  //tiempo que se considera a los datos frescos, accedera a ellos al hacer peticiones (infinity: para datos inmutables)
  //cacheTime,  //tiempo en eliminarse cache luego de inactivos
  enabled:false,  //se ejecuta la query al recargar pagina, si queres hacer la peticion al clickear un button
  //retry      //veces que va intertar comunicarse con el servicio (por default son 3)
})
/*const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const [posts, setPosts] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getPosts();
      setPosts(data);
      setError(null);
    } catch (error) {
      setError(error);
      setPosts(null);
    }
    setIsLoading(false);
  };
  fetchData();
}, []);*/

  //enable:false -> 'loading'

  if(fetchStatus==='idle' && isLoading){
    return <button onClick={refetch}>Load posts</button>
  }

  if (isLoading) {
    return (
      <div>
        <h6><span className="spinner-border"></span>Loading Posts...</h6>
      </div>
    );
  }

  if (error) {
    return (
      <section className="alert alert-danger">
        Error fetching posts: {error.message}
      </section>
    );
  }

  return (
    <section>
      <h2>Posts: {isFetching && <span className="spinner-border"></span>}</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a onClick={() => setPostId(post.id)} href="#">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
