import {
    AppBar,
    Box, Container,
    Drawer,
    IconButton, List, ListItem,
    ListItemButton,
    ListItemIcon, ListItemText,
    Toolbar,
    Typography,
    Link, Divider
} from "@mui/material";
import {useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';
import {Link as RouterLink} from "react-router-dom";
import {iconComponents, MovieList, TopList} from "../../constants/constants.ts";
interface IconProps {
    iconName: string;
}
const Icon: React.FC<IconProps> = ({iconName}) => {
    const IconComponent = iconComponents[iconName];
    return IconComponent ? <IconComponent/> : null;
};
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setIsOpen(newOpen);
    };
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {TopList.map((item, index) => (
                    <Link component={RouterLink} to={item.url} key={index} sx={{textDecoration: 'none'}}>
                        <ListItem disablePadding >
                            <ListItemButton>
                                <ListItemIcon>
                                    <Icon iconName={item.icon}/>
                                </ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider/>
            <List>
                {MovieList.map((item, index) => (
                    <Link component={RouterLink} to={item.url} key={index} sx={{textDecoration: 'none'}}>
                        <ListItem disablePadding >
                            <ListItemButton>
                                <ListItemIcon>
                                    <Icon iconName={item.icon}/>
                                </ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box>
    );


    return (
        <AppBar>
            <Container maxWidth="lg">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h5"
                        sx={{ color: 'white', textDecoration: 'none' }}
                        component={RouterLink}
                        to='/'
                    >
                        FilmFlix
                    </Typography>
                    <Drawer open={isOpen} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;