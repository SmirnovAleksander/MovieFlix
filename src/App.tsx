import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Layout from "./components/Layout";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import ActorDetail from "./pages/ActorDetail";

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>,
            errorElement: <div>Error</div>,
            children: [
                {
                    path: "/",
                    element: <Movies/>
                },
                {
                    path: "/movie/:id",
                    element: <MovieDetail/>
                },
                {
                    path: "/actor/:id",
                    element: <ActorDetail/>
                }
            ],
        },
    ]);
    return (
        <RouterProvider router={router} />
    );
};

export default App;