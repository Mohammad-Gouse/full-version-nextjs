import FontDetails from 'src/components/Fonts/FontDetails'

const Typography = theme => {
  return {
    h1: {
      fontFamily: FontDetails.fontStyle,
      fontWeight: 500,
      letterSpacing: '-1.5px',
      color: theme.palette.text.primary
    },
    h2: {
      fontFamily: FontDetails.fontStyle,
      fontWeight: 500,
      letterSpacing: '-0.5px',
      color: theme.palette.text.primary
    },
    h3: {
      fontFamily: FontDetails.fontStyle,
      fontWeight: 500,
      letterSpacing: 0,
      color: theme.palette.text.primary
    },
    h4: {
      fontFamily: FontDetails.fontStyle,
      fontWeight: 500,
      letterSpacing: '0.25px',
      color: theme.palette.text.primary
    },
    h5: {
      fontFamily: FontDetails.fontStyle,
      fontWeight: 500,
      letterSpacing: 0,
      color: theme.palette.text.primary
    },
    h6: {
      fontFamily: FontDetails.fontStyle,
      letterSpacing: '0.15px',
      color: theme.palette.text.primary
    },
    subtitle1: {
      fontFamily: FontDetails.fontStyle,
      letterSpacing: '0.15px',
      color: theme.palette.text.primary
    },
    subtitle2: {
      fontFamily: FontDetails.fontStyle,
      letterSpacing: '0.1px',
      color: theme.palette.text.secondary
    },
    body1: {
      fontFamily: FontDetails.fontStyle,
      letterSpacing: '0.15px',
      color: theme.palette.text.primary
      // fontSize: 30 //left side titles and logout and footer basically layout size
    },
    body2: {
      fontFamily: FontDetails.fontStyle,
      lineHeight: 1.429,
      letterSpacing: '0.15px',
      color: theme.palette.text.secondary
    },
    button: {
      fontFamily: FontDetails.fontStyle,
      letterSpacing: '0.4px',
      color: theme.palette.text.primary
      // fontSize: 15 //button fontSize taking more than 17
    },
    caption: {
      fontFamily: FontDetails.fontStyle,
      lineHeight: 1.25,
      letterSpacing: '0.4px',
      color: theme.palette.text.secondary
    },
    overline: {
      fontFamily: FontDetails.fontStyle,
      letterSpacing: '1px',
      color: theme.palette.text.secondary
    }
  }
}

export default Typography
