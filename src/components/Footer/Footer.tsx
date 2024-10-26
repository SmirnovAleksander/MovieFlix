import {Stack, Typography} from "@mui/material";

const Footer = () => {
    return (
        <Stack
            component="footer"
            sx={{ p: 3, flexDirection: { sm: 'row'}, justifyContent: { sm: 'space-between' }, alignItems: { sm: 'center'}, marginTop: 'auto'}}
            >
            <Typography variant="body2" color="text.secondary" component="p">&copy; {new Date().getFullYear()} &laquo;FilmFlix&raquo; 18+
                <br/>Данный сайт создан в исключительно обучающих целях
                <br/>Все права приндалежат правообладателям
            </Typography>
            <Typography variant="h5" color="primary.main" component="p">FilmFlix</Typography>
        </Stack>
    );
};

export default Footer;