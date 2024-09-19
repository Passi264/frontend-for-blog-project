import { extendTheme } from '@chakra-ui/react';
import { StepsTheme as Steps } from 'chakra-ui-steps';

// Define your custom theme
const theme = extendTheme({
  components: {
    Steps,
  },
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