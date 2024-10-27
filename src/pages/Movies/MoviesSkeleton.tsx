import {Skeleton, Stack, useMediaQuery} from "@mui/material";
import React from "react";

const MoviesSkeleton = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    return (
        <Stack mt={1} mb={2} spacing={1}>
            {new Array(5).fill(0).map((_, index) => (
                <React.Fragment key={index}>
                    <Skeleton variant="text" width={210} height={32} animation="wave"/>
                    <Stack direction="row" spacing={0.5} justifyContent='center'>
                        {new Array(5).fill(0).map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="rectangular"
                                width={isMobile ? '100%' : '230px'}
                                height={isMobile ? '520px' : '352px'}
                                animation="wave"
                            />
                        ))}
                    </Stack>
                </React.Fragment>
            ))}
        </Stack>
    );
};

export default MoviesSkeleton;