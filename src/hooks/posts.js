import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createNewPost, getPostById, getPosts } from "../api/posts"

const key = 'posts'

export function useMutatePost(){
    const queryClient = useQueryClient()
    return useMutation(createNewPost, {
      onSuccess:(post) => {
        queryClient.setQueryData([key], prevPosts => {
          return prevPosts.concat(post)      //para actualizar la vista rapidamente sin esperar a que haga la peticion
        })
        queryClient.invalidateQueries([key])    //invalidando la cache porende va hacer refetching
      }
    })
}

export function usePosts(){
    return useQuery([key],getPosts,{
        //refetchOnMount,   //refresh al mutar el server
        //refetchOnReconnect,   //refresh al reconectarse
        //refetchOnWindowFocus,   //refresh cuando se enfocal la ventana
        //refetchInterval,  //refresh cada cierto tiempo
        //staleTime,  //tiempo que se considera a los datos frescos, accedera a ellos al hacer peticiones (infinity: para datos inmutables)
        //cacheTime,  //tiempo en eliminarse cache luego de inactivos
        //enabled:false,  //se ejecuta la query al recargar pagina, si queres hacer la peticion al clickear un button
        //retry      //veces que va intertar comunicarse con el servicio (por default son 3)
      })
}

export function usePost(postId){
    return useQuery([key,postId],() => getPostById(postId))
}

//paginated queries -> peticiones por pagina
//infinite queries -> peticiones automaticas 
//optimistic updates -> ?