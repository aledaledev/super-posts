import ReactDOM from "react-dom";
import App from "./App";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
    defaultOptions:{        //opciones globales
        queries:{
            //staleTime, 
        }
    }
})

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools/>
  </QueryClientProvider>
, document.getElementById("root"));