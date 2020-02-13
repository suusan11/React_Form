import React from 'react';
import { Heading, Anchor, TextInput, FormField, Box, Grommet } from 'grommet';

const TextInputTheme = {
  global: {
    input: {
      weight: 'normal'
    }
  },
  textInput: {
    extend: () => {
      return `
      width: 141px;
      height: 40px;
      background: #FBFBFB;
      border: 1px solid #CCCCCC;
      border-radius: 4px;
      margin-right: 9px;
      font-size: 16px;
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
  }
}

const BabyDue = props => {
  const iconQuestion = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C3.58135 0 0 3.58135 0 8C0 12.4187 3.58135 16 8 16C12.4187 16 16 12.4187 16 8C16 3.58135 12.4187 0 8 0ZM8.75593 11.6308H7.3429V10.4154H8.75593V11.6308ZM8.77197 8.82137V9.51119H7.34291V7.49045H8.04942C8.64107 7.49045 9.11721 7.01432 9.11721 6.42267C9.11721 5.83102 8.64107 5.35489 8.04942 5.35489C7.45777 5.35489 6.98164 5.83102 6.98164 6.42267H5.55258C5.55258 5.04303 6.66978 3.92586 8.04939 3.92586C9.42903 3.92586 10.5462 5.04306 10.5462 6.42267C10.5462 7.55654 9.80696 8.50945 8.77187 8.8214L8.77197 8.82137Z" fill="#08ADCD" />
  </svg>

  return (
    <>
      <Box style={props.display}>
        <Heading
          level='4'
          size='17px'
          margin={{
            top: '40px',
            bottom: '16px',
          }}
          textAlign='start'
        >
          Congrats! When are you due?  (optional)
        <Anchor hreh='#' icon={iconQuestion} />
        </Heading>
        <Grommet theme={TextInputTheme}>
          <Box direction='row' justify='start'>
            <FormField label='Month' name='expectMonth' htmlFor='text-input'>
              <TextInput value={props.month} onChange={props.change} name='expectMonth' maxLength='2' />
            </FormField>
            <FormField label='Year' name='expectYear' htmlFor='text-input'>
              <TextInput value={props.year} onChange={props.change} name='expectYear' maxLength='4' />
            </FormField>
          </Box>
        </Grommet>
      </Box>
    </>
  );
}

export default BabyDue;