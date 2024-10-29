import {createContext, ReactNode, useEffect, useState} from "react";
import {createTheme, ThemeProvider, PaletteMode, Theme} from "@mui/material";
interface ColorModeContextType {
    mode: 'light' | 'dark';
    toggleColorMode: () => void;
}
export const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

interface ToggleColorModProps {
    children: ReactNode;
}

const ToggleColorMod: React.FC<ToggleColorModProps> = ({children}) => {
    const [mode, setMode] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        const modeFromLocalStorage = localStorage.getItem("theme") as 'light' | 'dark';
        if (modeFromLocalStorage) {
            setMode(modeFromLocalStorage);
        } else {
            localStorage.setItem("theme", 'dark');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", mode);
    }, [mode]);

    const toggleColorMode = () => {
        setMode(prevState => (prevState === 'light' ? 'dark' : 'light'));
    }

    const theme: Theme = createTheme({
        palette: {
            mode: mode as PaletteMode,
        },
    });
    return (
        <ColorModeContext.Provider value={{mode, toggleColorMode}}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>

    );
};

export default ToggleColorMod;