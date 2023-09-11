import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import { Button } from "./button";

export const theme = extendTheme({
  colors: {
    // Paleta de cores do Chakra UI
    brand: {
      100: "#FF3C00",
      200: "#FF3C00",
      300: "#FF3C00",
    },
    // Paleta de cores do projeto
    primary: "#b02b2e",
    primary_hover: "#fa3940",
    secondary: "#1e1f24",
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "#141519",
      },
    }),
  },
  components: {
    Button,
  },
});
