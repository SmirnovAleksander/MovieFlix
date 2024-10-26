import { Link } from 'react-router-dom';
import {Box, Button, Typography} from "@mui/material";

const ErrorPage = () => {
    return (
        <Box sx={{
            py: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
        }}>
            <Typography sx={{fontSize: '14rem'}}>404</Typography>
            <Typography variant='h5'>Страница не найдена</Typography>
            <p>К сожалению такой страницы не существует.</p>
            <Link to="/">
                <Button variant={"contained"}>Вернуться на главную</Button>
            </Link>
        </Box>
    );
};

export default ErrorPage;
