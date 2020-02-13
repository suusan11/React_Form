import React from 'react';
import { Heading, Text, Anchor, FormField, TextInput, Box, Button, Grommet } from 'grommet';

const ChildBirthInputTheme = {
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
      width: 141px;
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


const ChildBirth = props => {
  const iconQuestion = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C3.58135 0 0 3.58135 0 8C0 12.4187 3.58135 16 8 16C12.4187 16 16 12.4187 16 8C16 3.58135 12.4187 0 8 0ZM8.75593 11.6308H7.3429V10.4154H8.75593V11.6308ZM8.77197 8.82137V9.51119H7.34291V7.49045H8.04942C8.64107 7.49045 9.11721 7.01432 9.11721 6.42267C9.11721 5.83102 8.64107 5.35489 8.04942 5.35489C7.45777 5.35489 6.98164 5.83102 6.98164 6.42267H5.55258C5.55258 5.04303 6.66978 3.92586 8.04939 3.92586C9.42903 3.92586 10.5462 5.04306 10.5462 6.42267C10.5462 7.55654 9.80696 8.50945 8.77187 8.8214L8.77197 8.82137Z" fill="#08ADCD" />
  </svg>
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
      <Grommet theme={ChildBirthInputTheme} style={props.display}>
        <Text
          level='4'
          size='17px'
          textAlign='start'
          margin={{
            top: '40px',
          }}
        >
          Tell us about the kids in your family
      </Text>
        <Heading
          level='4'
          size='17px'
          margin={{
            top: '8px',
            bottom: '16px',
          }}
          textAlign='start'
        >
          How old are your children? (optional)
        <Anchor hreh='#' icon={iconQuestion} />
        </Heading>
        <Box direction='row' justify='start' wrap={true}>
          {
            props.value.map((year, i) => {
              const birthId = `birthYear${i}`; //order of childBirth's year
              let order = '';
              if (i === 0) {
                order = 'st'
              } else if (i === 1) {
                order = 'nd'
              } else if (i === 2) {
                order = 'rd'
              } else {
                order = 'th'
              }
              return (
                <Box key={`birthYear${i} `} margin={{ right: '8px' }}>
                  <FormField label={`Birthyear of ${i + 1}${order} child`} name={birthId} htmlFor={birthId} >
                    <TextInput value={props.value[i]} onChange={props.change(i)} name='childBirthYear' maxLength='4' />
                  </FormField>
                </Box>
              );
            })
          }
        </Box>
        <Button plain icon={iconPlus} label='Add another child' onClick={props.click} />
      </Grommet>
    </>
  );
}

export default ChildBirth;