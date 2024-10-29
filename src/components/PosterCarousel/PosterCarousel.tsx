import {FilmImageItem} from "../../app/ApiTypes/FilmImagesApi.types.ts";
import {Box, Stack} from "@mui/material";
import BearCarousel, {BearSlideImage} from "bear-react-carousel";


interface PosterCarouselProps {
    images: FilmImageItem[];
}
const PosterCarousel: React.FC<PosterCarouselProps> = ({images}) => {
    const serializePostersForCarousel = (images: FilmImageItem[]) =>
        images.map((image, index) => (
            <Box key={index} sx={{
                width: '100%',
                height: 'auto',
                backgroundColor: 'black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <BearSlideImage imageUrl={image.imageUrl} style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    backgroundColor: 'black',
                }}/>
            </Box>
        ));

    return (
        <Stack>
            <BearCarousel
                data={serializePostersForCarousel(images)}
                // isEnableNavButton
                isEnablePagination
                isEnableLoop={true}
                autoPlayTime={5000}
                isEnableAutoPlay={true}
                slidesPerView={1}
            />
        </Stack>
    );
};

export default PosterCarousel;