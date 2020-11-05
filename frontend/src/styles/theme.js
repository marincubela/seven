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
    Checkbox: {
      baseStyle: () => ({
        control: {
          borderColor: 'gray.400',
        },
      }),
      defaultProps: {
        colorScheme: 'teal',
      },
    },
  },
  colors: {
    primary: defaultTheme.colors.gray,
    secondary: defaultTheme.colors.teal,
  },
};

export default theme;
