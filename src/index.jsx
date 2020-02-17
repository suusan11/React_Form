import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Grommet, Heading, Paragraph, Box, Text, Form, Image } from 'grommet';
import iconCheck from './assets/tick.png';
import bgShape from './assets/bg-rec.png';

//components
import SendButton from './SendButton';
import SingleSelect from './SingleSelect';
import MultipleSelect from './MultipleSelect';
import Birthday from './Birthday';
import ExtraInput from './ExtraInput';
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

const App = () => {
  const [value, setValue] = useState({
    identify: '',
    month: '',
    day: '',
    year: '',
    shopFor: [],
    expectBaby: '',
    expectMonth: '',
    expectYear: '',
    importance: [],
    others: [''], // ['abc', 'def', 'ghi', '']
    source: [],
    stores: [],
  })
  const [required, setRequired] = useState({
    identify: '',
    month: '',
    day: '',
    year: '',
    shopFor: '',
    expectBaby: '',
    importance: '',
    source: '',
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
      if (target.value === '' || (target.value >= 0 && target.value <= 12))
        setValue({ ...value, [target.name]: target.value })
    } else if (target.name === 'day') {
      if (target.value === '' || (target.value >= 0 && target.value <= 31))
        setValue({ ...value, [target.name]: target.value })
    } else {
      if (target.value === '' || (target.value[0] >= 1 && target.value[0] <= 2))
        setValue({ ...value, [target.name]: target.value })
    }
  }

  //onChange to input others
  const handleChildBirthChange = index => ({ target }) => { //this onChange event relate with each index which child component has
    const { others } = value; //const others = value.others;
    const regex = /^[a-zA-Z]*$/;
    if (target.value === '' || regex.test(target.value)) {
      const newOthers = [...others];
      newOthers[index] = target.value;
      setValue({ ...value, [target.name]: newOthers });
    }
  }

  //onClick to add other input
  const addOthersInput = () => {
    const { others } = value;
    if (others.length < 9) {
      setValue({ ...value, others: [...others, ''] });
    }
  };

  //onClick event to show ChildBirth component
  const [isOthersInputShow, setIsOthersInputShow] = useState(false);
  let othersInputStyles;
  const showOthersInput = ({ target }) => {
    if (target.value === 'Others')
      setIsOthersInputShow(!isOthersInputShow);
    isOthersInputShow ? othersInputStyles = { display: 'block' } : othersInputStyles = { display: 'none' };
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
        <Box style={{ position: 'relative' }}>
          <Image src={bgShape} style={{ position: 'absolute', left: '-10%', top: '-50px' }} />
        </Box>
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
          <MultipleSelect
            heading='Who do you normally shop for? *'
            options={['Myself', 'My Children', 'My Family', 'My Partner', 'My Pet']}
            name='shopFor'
            value={value.shopFor}
            change={handleMultiChange}
            required={required.shopFor}
          />
          {/* if it has general width(=590px), somthing clickable appear */}
          <Box width='294px'>
            <SingleSelect
              heading='Are you expecting a baby? *'
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
            name='importance'
            value={value.importance}
            change={handleMultiChange}
            required={required.importance}
            click={showOthersInput}
          />
          {isOthersInputShow && <ExtraInput display={othersInputStyles} change={handleChildBirthChange} click={addOthersInput} value={value.others} />}
          <MultipleSelect
            heading='What is info source of your fashion? *'
            options={['Instagram', 'Twitter', 'Website', 'Youtube', 'Shop', 'Magazine', 'TV Program', 'Friends', 'Family']}
            name='source'
            value={value.source}
            change={handleMultiChange}
            required={required.source}
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