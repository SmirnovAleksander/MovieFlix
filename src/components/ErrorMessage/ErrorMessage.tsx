import {Alert, Stack} from "@mui/material";

const ErrorMessage = () => {
    return (
        <Stack alignItems='center' justifyContent='center' margin='auto'>
            <Alert variant="outlined" severity="error">
                Произошла ошибка с загрузкой страницы
            </Alert>
        </Stack>
    );
};

export default ErrorMessage;