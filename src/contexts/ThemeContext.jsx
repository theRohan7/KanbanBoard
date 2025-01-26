import { createContext, useContext, useState } from "react"


 const themes = {
    Light: {
        primaryColor: '#A59D84',
        secondaryColor: '#ECEBDE ',
        lightColor: '#D7D3BF',
        highlightColor: '#C1BAA1',
        textColor: '#333',
    },
    Dark: {
        primaryColor: '#201f1e',
        secondaryColor: '#2e2d2b ',
        lightColor: '#45484a',
        highlightColor: '#7a7970',
        textColor: '#ffffff',
    },
    Blue: {
        primaryColor: '#344CB7',
        secondaryColor: '#577BC1 ',
        lightColor: '#45484a',
        highlightColor: '#000957',
        textColor: '#ffffff',
    },
    Purple: {
        primaryColor: '#441752',
        secondaryColor: '#8174A0 ',
        lightColor: '#A888B5',
        highlightColor: '#EFB6C8',
        textColor: '#ffffff',
    },
}

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);


export const ThemeProvider = ({ children }) => {
    const [themeName, setThemeName] = useState("Light");
    const  theme = themes[themeName];

    return (
        <ThemeContext.Provider value={{themeName, setThemeName, theme, themes}}>
            {children}
        </ThemeContext.Provider>
    )
}