import {Skeleton, Stack, useMediaQuery} from "@mui/material";

const MoviesListSkeleton = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    return (
        <Stack mt={2} mb={2} alignItems="center">
            <Skeleton variant="text" width={210} height={38} animation="wave"/>
            <Stack direction="row" flexWrap='wrap' justifyContent="center">
                {new Array(15).fill(0).map((_, index) => (
                    <Stack key={index} alignItems='center' mx={0.5}>
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            width={isMobile ? '100%' : '220px'}
                            height={isMobile ? '520px' : '300px'}
                            animation="wave"
                        />
                        <Skeleton variant="text" width={180} height={32} animation="wave"/>
                        <Skeleton variant="text" width={130} height={32} animation="wave"/>
                    </Stack>
                ))}
            </Stack>
        </Stack>

    );
};

export default MoviesListSkeleton;