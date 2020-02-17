import React from 'react';
import { Heading, TextInput, FormField, Box, Grommet } from 'grommet';

const TextInputTheme = {
  global: {
    input: {
      weight: 'normal'
    }
  },
  textInput: {
    extend: () => {
      return `
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
        </Heading>
        <Grommet theme={TextInputTheme}>
          <Box direction='row' justify='start'>
            <FormField label='Month' name='expectMonth' htmlFor='text-input'>
              <TextInput value={props.month} onChange={props.change} name='expectMonth' maxLength='2' placeholder='05' style={{ width: '61px' }} />
            </FormField>
            <FormField label='Year' name='expectYear' htmlFor='text-input'>
              <TextInput value={props.year} onChange={props.change} name='expectYear' maxLength='4' placeholder='2020' style={{ width: '77px' }} />
            </FormField>
          </Box>
        </Grommet>
      </Box>
    </>
  );
}

export default BabyDue;