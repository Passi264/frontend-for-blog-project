import { extendTheme } from '@chakra-ui/react';

// Define your custom theme
const theme = extendTheme({
  fonts: {
    heading: `"Rubik", sans-serif`, // Font for headings
    body: `"Rubik", sans-serif`, // Font for body text
    mono: `"Rubik", sans-serif`, // Font for monospace text (e.g., code blocks)
  },
  // Optionally, you can customize other parts of the theme here
  colors: {
    // Define custom colors if needed
  },
  // Other custom theme settings
});

export default theme;