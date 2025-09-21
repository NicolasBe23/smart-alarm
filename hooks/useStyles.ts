import { useColorScheme } from "@/hooks/use-color-scheme";
import { colors, globalStyles } from "@/styles/globalStyles";

export const useStyles = () => {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";

  const dynamicColors = {
    background: isDark ? colors.gray900 : colors.background,
    cardBackground: isDark ? colors.gray800 : colors.white,
    text: isDark ? colors.white : colors.gray900,
    textSecondary: isDark ? colors.gray300 : colors.gray500,
    border: isDark ? colors.gray700 : colors.gray200,
  };

  return {
    colors: dynamicColors,
    globalStyles,
  };
};
