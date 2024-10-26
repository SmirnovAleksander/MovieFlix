import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Layout from "./components/Layout";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import ActorDetail from "./pages/ActorDetail";
import {MovieList, TopList} from "./components/constants/constants.ts";
import MoviesListTop from "./pages/MoviesListTop";
import MoviesListMain from "./pages/MoviesListMain";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    path: "/",
                    element: <Movies/>
                },
                ...TopList.map((el) => ({
                    path: el.url,
                    element: <MoviesListTop/>
                })),
                ...MovieList.map((el) => ({
                    path: el.url,
                    element: <MoviesListMain/>
                })),
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