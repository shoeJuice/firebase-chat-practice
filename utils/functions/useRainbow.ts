import { useMantineTheme } from "@mantine/core";

/**
 * A small utility hook to return the spectrum of colors for a given index.
 * @param index The index of the color to return.
 * @returns {Array} An array containing the color value for each color at the given index.
 */
function useRainbow(index: number, excludeColors?: string[]): string[] {

    const theme = useMantineTheme();
    const rainbow: string[] = [];

    Object.keys(theme.colors).forEach((key) => {
        if (excludeColors && excludeColors.includes(key)) {
            return;
        }
        rainbow.push(theme.colors[key][index]);
    })
    return rainbow;
}

export default useRainbow;
