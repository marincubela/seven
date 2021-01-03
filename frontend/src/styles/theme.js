import defaultTheme from '@chakra-ui/theme';

const theme = {
  components: {
    Button: {
      variants: {
        'link.nav': {
          ...defaultTheme.components.Link.baseStyle,
          fontSize: 'md',
          fontWeight: 'normal',
        },
      },
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
        map: {
          field: {
            bgColor: 'white',
            boxShadow: 'lg',
            border: ({ space, colors }) => `${space[1]} solid ${colors.accent[500]}`,
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
          fontSize: 'lg',
          '&[aria-current]': {
            fontWeight: 'bold',
            color: 'primary.600',
          },
        },
      },
    },
    PinInput: {
      variants: {
        filled: {
          transition: 'none',
          '&:not([data-end])[aria-invalid="true"]': {
            borderRight: 'none',
            borderLeft: 'none',
          },
          '&:hover, &:focus': {
            bgColor: 'primary.50',
          },
          '&[data-end="left"]': {
            borderBottomLeftRadius: 'base',
            borderTopLeftRadius: 'base',

            '&[aria-invalid="true"]': {
              borderRight: 'none',
            },
          },
          '&[data-end="right"]': {
            borderBottomRightRadius: 'base',
            borderTopRightRadius: 'base',

            '&[aria-invalid="true"]': {
              borderLeft: 'none',
            },
          },
        },
      },
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
    accent: defaultTheme.colors.yellow,
    error: defaultTheme.colors.red,
  },
};

export default theme;
