import UseMoviesQuery from "../../hooks/useMoviesQuery.tsx";
import BearCarousel, {BearSlideImage} from 'bear-react-carousel';
import {Stack, Link} from "@mui/material";
import {Link as ReactLink} from "react-router-dom";
import {Movie} from "../../app/types.ts";

const Movies = () => {
    const {isLoading,
        isError,
        responsePopular,
        responseBest,
        responseFilms,
        responseSerials,
        responseCartoons} = UseMoviesQuery();

    if (isLoading) return <p>Loading...</p>//TODO Add Loading component
    if (isError) return <p>Error</p>;//TODO Error component

    const serializeDataForCarousel = (data: Movie[]) => (
        data.map((row) => (
                <ReactLink key={row.kinopoiskId} to={`/movie/${row.kinopoiskId}`}>
                    <BearSlideImage imageUrl={row.posterUrlPreview} />
                </ReactLink>
            )
        )
    )
    const carouselArray = [
        {
            title: 'Популярные фильмы',
            url: '/popular',
            data: serializeDataForCarousel(responsePopular.data.items)
        },
        {
            title: 'Лучшие фильмы',
            url: '/best',
            data: serializeDataForCarousel(responseBest.data.items)
        },
        {
            title: 'Фильмы',
            url: '/films',
            data: serializeDataForCarousel(responseFilms.data.items)
        },
        {
            title: 'Сериалы',
            url: '/serials',
            data: serializeDataForCarousel(responseSerials.data.items)
        },
        {
            title: 'Мультфильмы',
            url: '/cartoons',
            data: serializeDataForCarousel(responseCartoons.data.items)
        }
    ]
    return (
        <>
            <Stack>
                {carouselArray.map((carousel) => (
                    <Stack key={carousel.title}>
                        <Link
                            sx={{textDecoration: 'none'}}
                            py={1}
                            variant='h6'
                            component={ReactLink}
                            to={carousel.url}
                        >
                            {carousel.title}
                        </Link>
                        <BearCarousel
                            data={carousel.data}
                            spaceBetween={3}
                            isEnableNavButton
                            // isEnablePagination
                            isEnableLoop={true}
                            // autoPlayTime={5000}
                            // isEnableAutoPlay={true}
                            breakpoints={{
                                768: {
                                    slidesPerView: 5,
                                },
                                375: {
                                    isEnableAutoPlay: false,
                                    slidesPerView: 1,
                                }
                            }}
                        />
                    </Stack>
                ))}

            </Stack>


        </>
    );
};

export default Movies;