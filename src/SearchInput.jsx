import React, { useState, useRef, useEffect, useCallback } from "react";
import { TextInput, Text, Box, Image, Grommet } from 'grommet';
import iconSearch from './assets/search.png';

const SearchInputTheme = {
  global: {
    input: {
      weight: 'normal'
    },
    font: {
      size: '17px',
      family: 'Roboto'
    },
    drop: {
      background: '#FBFBFB',
      extend: `
        border: 1px solid #CCCCCC;
        box-sizing: border-box;
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        overflow: hidden;
        margin-top: 9px;
        `
    },
  },
  textInput: {
    extend: () => {
      return `
      position: absolute;
      top: -25px;
      left: 0;
      width: 580px;
      height: 35px;
      margin-right: 9px;
      font-size: 16px;
      `
    },
  },
  grommet: {
    extend: () => {
      return `
        height: 40px;
      `
    }
  }
}

//specific style
const searchInput = {
  position: 'relative',
  width: '585px',
  height: '40px',
  background: '#FFFFFF',
  border: '1px solid #CCCCCC',
  borderRadius: '4px',
}

const stores = [
  {
    name: 'Topshop',
  },
  {
    name: 'American Eagle',
  },
  {
    name: 'Frank and Oak',
  },
  {
    name: 'Tna',
  },
  {
    name: 'Gap',
  },
  {
    name: 'GUESS',
  },
  {
    name: 'Plenty',
  },
  {
    name: 'Roots',
  },
  {
    name: 'Uniqlo',
  },
  {
    name: 'Tommy Hilfiger',
  },
  {
    name: 'Old Navy',
  }
];

const SearchInput = props => {
  const [value, setValue] = useState("");
  const [, setSuggestionOpen] = useState(false);
  const [suggestedStores, setSuggestedStores] = useState([]);

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const boxRef = useRef(); //get html element

  useEffect(() => {
    forceUpdate();
  }, [forceUpdate]);

  const handleSuggestionChange = e => {
    const { value: newValue } = e.target;
    setValue(newValue);

    if (!newValue.trim()) {
      setSuggestedStores([]);
    } else { //if newValue can be trim
      // simulate an async call to the backend
      setSuggestedStores(stores);
    }
  };

  const renderSuggestions = () => {
    return suggestedStores
      .filter(
        // name = stores.name / value = input value
        // if value doesn't mach, indexOf returns -1
        // indexOf looks at the index of the input value in the name
        // filter returns new array and passes it to map
        ({ name }) => name.toLowerCase().indexOf(value.toLowerCase()) >= 0
      )
      .map(({ name }, index, list) => ({
        label: (
          < Box
            direction='row'
            align='center'
            border={index < list.length - 1 ? 'bottom' : undefined}
            pad='small'
            width='580px'
            height='40px'
          >
            <Text>{name}</Text>
          </Box >
        ),
        value: name
      }));
  };

  return (
    <>
      <Grommet theme={SearchInputTheme}>
        <Box
          ref={boxRef}
          style={searchInput}
          align='center'
        >
          <Image src={iconSearch} alignSelf='end' margin={{ top: '10px', right: '14px' }} />
          <TextInput
            type='search'
            dropTarget={boxRef.current} // Target where any suggestions drop will be aligned to.
            plain
            value={value}
            onChange={handleSuggestionChange}
            onSelect={props.select}
            suggestions={renderSuggestions()}
            onSuggestionsOpen={() => setSuggestionOpen(true)}
            onSuggestionsClose={() => { setSuggestionOpen(false); setValue(''); }}
            margin={{ bottom: '9px' }}
          />
        </Box>
      </Grommet>
    </>
  );
}

export default SearchInput;