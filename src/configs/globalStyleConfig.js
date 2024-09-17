import spacing from "src/@core/theme/spacing";

// globalStyleConfig.js
const globalStyle = {
    inputLabel:{
       'font-size': '0.6rem', 'font-weight': '600', 'color': '#818589'
    },

    textField: {
      gridSize:{
        lg:1.5, md:6, sm:12, xs:12
      },

      InputProps: {
        style:
            { fontSize: '0.65rem' }
          ,
      },
      InputLabelProps: {
        style: {
          fontSize: '0.65rem', 
          fontWeight: '600',
        },
      },
    },
  
    selectField: {
      size:"small",
      
      gridSize:{
        lg:1.5, md:6, sm:12, xs:12
      },

      SelectProps: {
        style: {
          fontSize: '0.65rem', // Example: Default font size for selects
        },
      },
      MenuProps: {

        style: {
          fontSize: '0.65rem', // Example: Default font size for selects
        },

        PaperProps: {
          style: {
            maxHeight: 300, // Example: Max height for dropdown menus
          },
        },
      },
    },
  
    radioGroup: {
      formControlLabel: {
        style: {
          fontSize: '0.65rem', // Example: Font size for labels in radio groups
        },
      },
      radio: {
        size: 'small', // Example: Default radio button size
      },
    },
  
    button: {
      contained: {
        style: {
          backgroundColor: '#666CFF', // Example: Primary button color
          color: '#FFF',
          padding: '10px 20px',
          fontSize: '0.65rem',
        },
      },
      outlined: {
        style: {
          borderColor: '#666CFF',
          color: '#666CFF',
          padding: '8px 18px',
          fontSize: '0.65rem',
        },
      },
    },

    cardForm:{
      style:{
        padding:'15px 5px 5px 5px', minHeight:'87vh'
      }
    },

    gridForm:{
      spacing:5
    }
  };
  
  export default globalStyle;
  