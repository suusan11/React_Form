import React from 'react';
import { Heading, TextInput, FormField, Box, Grommet, Text } from 'grommet';

const BirthdayInputTheme = {
  global: {
    input: {
      weight: 'normal'
    }
  },
  textInput: {
    extend: () => {
      return `
      height: 40px;
      background: #FFFFFF;
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

//specific styles
const longInputBox = {
  width: '77px'
}
const shortInputBox = {
  width: '61px'
}
const errorBox = {
  position: 'relative',
  width: '61px',
  height: '40px',
  border: '1px solid #E42748',
  borderRadius: '4px',
  boxShadow: 'inset 0px 0px 10px rgba(228, 39, 72, 0.1)',
}
const errorMessage = {
  color: '#E42748',
  fontSize: '16px',
}

const Birthday = props => {
  const errorIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM8.8 12H7.2V10.4H8.8V12ZM8.8 8.8H7.2V4H8.8V8.8Z" fill="#E42748" />
  </svg>

  return (
    <>
      <Heading
        level='4'
        size='17px'
        margin={{
          top: '40px',
          bottom: '16px',
        }}
        textAlign='start'
      >
        Birthday: *
      </Heading>
      {props.requiredMonth === false || props.requiredDay === false || props.requiredYear === false ? <Text style={errorMessage}>{errorIcon}&ensp;Answer required</Text> : ''}
      <Grommet theme={BirthdayInputTheme}>
        <Box direction='row' justify='start'>
          <FormField label='Month' name='month' htmlFor='text-input'>
            <TextInput value={props.month} onChange={props.change} name='month' maxLength='2' placeholder='03' required={props.requiredMonth} style={props.requiredMonth === false ? errorBox : shortInputBox} />
          </FormField>
          <FormField label='Day' name='day' htmlFor='text-input'>
            <TextInput value={props.day} onChange={props.change} name='day' maxLength='2' placeholder='07' required={props.requiredDay} style={props.requiredDay === false ? errorBox : shortInputBox} />
          </FormField>
          <FormField label='Year' name='year' htmlFor='text-input'>
            <TextInput value={props.year} onChange={props.change} name='year' maxLength='4' placeholder='1991' required={props.requiredYear} style={props.requiredYear === false ? errorBox : longInputBox} />
          </FormField>
        </Box>
      </Grommet>
    </>
  );
}

export default Birthday;