import { Theme } from "@material-ui/core";
import { lightTheme } from "./light";
import { darkTheme } from "./dark";

const themeMap: { [key: string]: Theme } = {
    lightTheme,
    darkTheme
};

export function getThemeByName(theme: string): Theme {
    return themeMap[theme];
}