import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Grommet, Heading, Paragraph, Anchor, Box, Text, Form, Image } from 'grommet';
import iconCheck from './assets/tick.png';

//components
import SendButton from './SendButton';
import SingleSelect from './SingleSelect';
import MultipleSelect from './MultipleSelect';
import Birthday from './Birthday';
import ChildBirth from './ChildBirth';
import BabyDue from './BabyDue';
import ShoppingPlace from './ShoppingPlace';

//themes
const MainTheme = {
  global: {
    font: {
      family: 'Lato',
      height: '20px',
    },
    colors: {
      background: '#FAFAFA',
    }
  },
  paragraph: {
    'small': {
      'size': '16px',
      'height': '20px',
    }
  },
  grommet: {
    extend: () => {
      return `
        padding-bottom: 216px;
        letter-spacing: 0.8px;
      `
    }
  }
};

const errorText = {
  display: 'block',
  fontSize: '16px',
  color: '#FFFFFF',
  backgroundColor: '#E42748',
  paddingLeft: '20px',
};
const SmallMultiButtontheme = {
  text: {
    medium: {
      size: '16px',
      height: '20px',
    }
  },
  checkBox: {
    extend: () => {
      return `
        position: absolute;
        top: 0;
        left: 0;
        width: 192px;
        height: 56px;
      `
    },
    hover: {
      border: {
        color: 'transparent',
      }
    },
    check: {
      extend: () => {
        return `
          display: none;
        `
      }
    },
    icon: {
      size: '0px'
    },
  },
  image: {
    extend: () => {
      return `
        position: absolute;
        top: 4px;
        right: 3.5px;
        width: 10px;
        height: 8px;
        z-index: 5;
      `
    }
  }
};


const App = () => {
  const iconQuestion = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C3.58135 0 0 3.58135 0 8C0 12.4187 3.58135 16 8 16C12.4187 16 16 12.4187 16 8C16 3.58135 12.4187 0 8 0ZM8.75593 11.6308H7.3429V10.4154H8.75593V11.6308ZM8.77197 8.82137V9.51119H7.34291V7.49045H8.04942C8.64107 7.49045 9.11721 7.01432 9.11721 6.42267C9.11721 5.83102 8.64107 5.35489 8.04942 5.35489C7.45777 5.35489 6.98164 5.83102 6.98164 6.42267H5.55258C5.55258 5.04303 6.66978 3.92586 8.04939 3.92586C9.42903 3.92586 10.5462 5.04306 10.5462 6.42267C10.5462 7.55654 9.80696 8.50945 8.77187 8.8214L8.77197 8.82137Z" fill="#08ADCD" />
  </svg>

  const [value, setValue] = useState({
    identify: '',
    month: '',
    day: '',
    year: '',
    shopFor: [],
    childBirthYear: [''], // ['2001', '2005', '2006', '']
    expectBaby: '',
    expectMonth: '',
    expectYear: '',
    experience: '',
    qualities: [],
    exceptItems: [],
    stores: [],
  })
  const [required, setRequired] = useState({
    identify: '',
    month: '',
    day: '',
    year: '',
    shopFor: '',
    expectBaby: '',
    experience: '',
    qualities: '',
    exceptItems: '',
    stores: '',
  });

  //onChange single select
  const handleSingleChange = ({ target }) => {
    setValue({ ...value, [target.name]: target.value });
  }

  //onChange multi select
  const handleMultiChange = (name, checkedItem) => {
    setValue({ ...value, [name]: checkedItem });
  }

  //onChange birthday input to check number
  const handleBirthdayChange = ({ target }) => {
    if (target.name === 'month' || target.name === 'expectMonth') {
      if (target.value === '' || (target.value >= 1 && target.value <= 12))
        setValue({ ...value, [target.name]: target.value })
    } else if (target.name === 'day') {
      if (target.value === '' || (target.value >= 1 && target.value <= 31))
        setValue({ ...value, [target.name]: target.value })
    } else {
      if (target.value === '' || (target.value[0] >= 1 && target.value[0] <= 2))
        setValue({ ...value, [target.name]: target.value })
    }
  }

  //onChange to input childBirth
  const handleChildBirthChange = index => ({ target }) => { //this onChange event relate with each index which child component has
    const { childBirthYear } = value; //const childBirthYear = value.childBirthYear;
    if (target.value === '' || (target.value[0] >= 1 && target.value[0] <= 2)) {
      const newchildBirthYear = [...childBirthYear];
      newchildBirthYear[index] = target.value;
      setValue({ ...value, [target.name]: newchildBirthYear });
    }
  }
  //onClick to add childBirth input
  const addChildBirthInput = () => {
    const { childBirthYear } = value;
    if (childBirthYear.length < 8) {
      setValue({ ...value, childBirthYear: [...childBirthYear, ''] });
    }
  };

  //onClick event to show ChildBirth component
  const [isChildBirthShow, setIsChildBirthShow] = useState(false);
  let childBirthStyles;
  const showChildBirthInput = ({ target }) => {
    if (target.value === 'My Children')
      setIsChildBirthShow(!isChildBirthShow);
    isChildBirthShow ? childBirthStyles = { display: 'block' } : childBirthStyles = { display: 'none' };
  };

  //onClick event to show BabyDue component
  const [isBabyDueShow, setIsBabyDueShow] = useState(false);
  let babyDueStyles;
  const showBabyDueInput = ({ target }) => {
    if (target.value === 'Yes') setIsBabyDueShow(true);
    else setIsBabyDueShow(false);
    isBabyDueShow ? babyDueStyles = { display: 'block' } : babyDueStyles = { display: 'none' };
  };

  //onClick event to submit
  const handleSubmit = (e) => {
    e.preventDefault();
    Object.keys(value).forEach(item => {
      if (value[item].length === 0) {
        setRequired(required => ({ ...required, [item]: false }))
      }
      else {
        setRequired(required => ({ ...required, [item]: true }))
      }
    })

    let submitData = {};
    const name = Object.keys(value);
    const item = Object.values(value);
    for (let i = 0; i < name.length; i++) {
      const key = name[i]
      submitData[key] = item[i];
    }
    console.log('**submit-data**' + JSON.stringify(submitData));
  }

  return (
    <Grommet theme={MainTheme}>
      <Box
        width='590px'
        pad={{ top: '50px' }}
        margin={{
          left: 'auto',
          right: 'auto',
        }}
      >
        <Heading
          level='1'
          size='32px'
          margin={{
            left: 'auto',
            right: 'auto',
          }}
          textAlign='center'
        >
          What you will get?
        </Heading>
        <Box pad={{ left: '25%' }}>
          <Paragraph size='small' margin={{ top: '8px', }}>
            <Image fit='contain' src={iconCheck} margin={{ right: '10px' }} style={{ verticalAlign: 'middle' }} />
            Birthday offer
          </Paragraph>
          <Paragraph size='small' margin={{ top: '8px', }}>
            <Image fit='contain' src={iconCheck} margin={{ right: '10px' }} style={{ verticalAlign: 'middle' }} />
            Get best suggestions you want
          </Paragraph>
          <Paragraph size='small' margin={{ top: '8px', }}>
            <Image fit='contain' src={iconCheck} margin={{ right: '10px' }} style={{ verticalAlign: 'middle' }} />
            Hear what people are interested in
          </Paragraph>
          <Paragraph size='small' margin={{ top: '8px', }}>
            <Image fit='contain' src={iconCheck} margin={{ right: '10px' }} style={{ verticalAlign: 'middle' }} />
            Share the information
          </Paragraph>
        </Box>

        <Form onSubmit={handleSubmit}>
          {Object.values(required).includes(false) ? <Text style={errorText}>Please check your answers and try again.</Text> : ''}
          <Birthday
            month={value.month}
            day={value.day}
            year={value.year}
            change={handleBirthdayChange}
            requiredMonth={required.month}
            requiredDay={required.day}
            requiredYear={required.year}
          />
          <SingleSelect
            heading='Identify: *'
            options={['Female', 'Male', 'Non-Binary / Genderqueerle', 'Prefer not to say']}
            width='142px'
            padding={{ 'right': '8px', 'left': '8px' }}
            name='identify'
            value={value.identify}
            change={handleSingleChange}
            required={required.identify}
          />
          <Grommet theme={SmallMultiButtontheme}>
            <MultipleSelect
              heading='Who do you normally shop for?*'
              anchor={<Anchor href='#' icon={iconQuestion} />}
              options={['Myself', 'My Children', 'My Family', 'My Partner', 'My Pet']}
              click={showChildBirthInput}
              name='shopFor'
              value={value.shopFor}
              change={handleMultiChange}
              required={required.shopFor}
            />
          </Grommet>
          <Grommet />
          {isChildBirthShow && <ChildBirth display={childBirthStyles} change={handleChildBirthChange} click={addChildBirthInput} value={value.childBirthYear} />}
          {/* if it has general width(=590px), somthing clickable appear */}
          <Box width='294px'>
            <SingleSelect
              heading='Are you expecting a baby?*'
              options={['Yes', 'No']}
              width='142px'
              name='expectBaby'
              value={value.expectBaby}
              change={handleSingleChange}
              click={showBabyDueInput}
              required={required.expectBaby}
            />
          </Box>
          {isBabyDueShow && <BabyDue display={babyDueStyles} change={handleBirthdayChange} month={value.expectMonth} year={value.expectYear} />}
          <MultipleSelect
            heading='What is important in choosing clothes? *'
            options={['Color', 'Pattern', 'Price', 'Brand', 'Material', 'Shape', 'Trend', 'Comfort', 'Texture', 'Easy to clean', 'Combination with my clothes', 'Others']}
            name='qualities'
            value={value.qualities}
            change={handleMultiChange}
            required={required.qualities}
          />
          <MultipleSelect
            heading='What is info source of your fashion? *'
            anchor={<Anchor href='#' icon={iconQuestion} />}
            options={['Instagram', 'Twitter', 'Website', 'Youtube', 'Shop', 'Magazine', 'TV Program', 'Friends', 'Family']}
            name='exceptItems'
            value={value.exceptItems}
            change={handleMultiChange}
            required={required.exceptItems}
          />
          <ShoppingPlace
            name='stores'
            value={value.stores}
            change={handleMultiChange}
            required={required.stores}
          />
          <SendButton type='submit' label='submit' />
          {/* <SendSendButton label='submit' color='#5C73F2' /> color change */}
        </Form>
      </Box>
    </Grommet >
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));