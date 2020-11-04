import defaultTheme from '@chakra-ui/theme';

const theme = {
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'secondary',
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            '&:hover, &:focus': {
              bgColor: 'primary.50',
            },
          },
        },
      },
      defaultProps: {
        variant: 'filled',
        focusBorderColor: 'secondary.400',
      },
    },
    Link: {
      variants: {
        nav: {
          '&[aria-current]': {
            fontWeight: 'bold',
          },
        },
      },
    },
    PinInput: {
      defaultProps: {
        variant: 'filled',
        focusBorderColor: 'secondary.400',
      },
    },
    CheckBox: {
      defaultProps: {
        // write default border color and border size
      },
    },
  },
  colors: {
    primary: defaultTheme.colors.gray,
    secondary: defaultTheme.colors.teal,
    error: defaultTheme.colors.red,
  },
};

export default theme;
