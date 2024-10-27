import {CircularProgress, Stack} from "@mui/material";

const LoadingElement = () => {
    return (
        <Stack alignItems='center' justifyContent='center' margin='auto'>
            <CircularProgress size="3rem"/>
        </Stack>
    );
};

export default LoadingElement;