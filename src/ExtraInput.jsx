import React from 'react';
import { FormField, TextInput, Box, Button, Grommet, Text } from 'grommet';

const OthersInputTheme = {
  global: {
    input: {
      weight: 'normal'
    }
  },
  text: {
    extend: () => {
      return `
      display: block;
      `
    }
  },
  textInput: {
    extend: () => {
      return `
      width: 180px;
      height: 40px;
      background: #FBFBFB;
      border: 1px solid #CCCCCC;
      border - radius: 4px;
      margin - right: 8px;
      font - size: 16px;
      `
    },
  },
  formField: {
    label: {
      size: '12px',
      textAlign: 'start',
      margin: {
        left: '0px'
      },
      color: '#5D5D5D',
    },
    border: 'none',
  },
  button: {
    extend: () => {
      return `
      font - size: 16px;
      line - height: 24px;
      `
    }
  },
}

const ExtraInput = props => {
  const iconPlus = <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0.000488281C3.584 0.000488281 0 3.74437 0 8.35736C0 12.9704 3.584 16.7142 8 16.7142C12.416 16.7142 16 12.9704 16 8.35736C16 3.74437 12.416 0.000488281 8 0.000488281ZM12 9.19305H8.8V12.5358H7.2V9.19305H4V7.52167H7.2V4.17892H8.8V7.52167H12V9.19305Z" fill="url(#paint0_linear)" />
    <defs>
      <linearGradient id="paint0_linear" x1="16" y1="16.7142" x2="-0.697841" y2="0.729459" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D1239D" />
        <stop offset="1" stopColor="#E42748" />
      </linearGradient>
    </defs>
  </svg>

  return (
    <>
      <Grommet theme={OthersInputTheme} style={props.display}>
        <Text
          level='4'
          size='17px'
          textAlign='start'
          margin={{
            top: '40px',
            bottom: '15px'
          }}
        >
          Tell us your importance. (optional)
      </Text>
        <Box direction='row' justify='start' wrap={true}>
          {
            props.value.map((option, i) => {
              const othersId = `others${i}`; //order of childBirth's year
              return (
                <Box key={`others${i} `} margin={{ right: '8px' }}>
                  <FormField name={othersId} htmlFor={othersId} >
                    <TextInput value={props.value[i]} onChange={props.change(i)} name='others' />
                  </FormField>
                </Box>
              );
            })
          }
        </Box>
        <Button plain icon={iconPlus} label='Add another input box' onClick={props.click} />
      </Grommet>
    </>
  );
}

export default ExtraInput;