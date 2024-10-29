import {FilmImageItem} from "../../app/ApiTypes/FilmImagesApi.types.ts";
import {Box, Stack, Typography} from "@mui/material";
import BearCarousel, {BearSlideImage} from "bear-react-carousel";

interface ImageCarouselProps {
    title: string;
    images: FilmImageItem[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({title, images}) => {
    if (images.length === 0) return null

    const serializeImagesForCarousel = (images: FilmImageItem[]) =>
        images.map((image, index) => (
            <Box
                key={index}
                sx={{
                    width: '100%',
                    height: '700px',
                    backgroundColor: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <BearSlideImage
                    imageUrl={image.imageUrl}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        backgroundColor: 'black',
                    }}
                />
            </Box>
        ));

    return (
        <Stack>
            <Typography variant='h6' py={2}>{title}</Typography>
            <BearCarousel
                data={serializeImagesForCarousel(images)}
                isEnableNavButton
                isEnablePagination
                isEnableLoop={true}
                autoPlayTime={5000}
                isEnableAutoPlay={true}
                slidesPerView={1}
            />
        </Stack>
    );
};

export default ImageCarousel;