import {Outlet} from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import {Box, Container} from "@mui/material";

const Layout = () => {
    return (
        <Container fixed sx={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <Box sx={{p: 4}}/>
            <Navbar/>
            <Outlet />
            <Footer/>
        </Container>
    );
};

export default Layout;