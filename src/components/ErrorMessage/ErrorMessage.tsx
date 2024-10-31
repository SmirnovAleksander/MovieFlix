import {Alert, Stack} from "@mui/material";
import TrailerPlayer from "../TrailerPlayer";

const ErrorMessage = () => {
    return (
        <Stack alignItems='center' justifyContent='center' margin='auto' spacing={2}>
            <Alert variant="outlined" severity="error">
                Произошла ошибка с загрузкой страницы
            </Alert>
            <TrailerPlayer videoUrl='https://youtu.be/8WddwFfcSIU?si=cTPMsXakIERILD0i'/>
        </Stack>
    );
};

export default ErrorMessage;