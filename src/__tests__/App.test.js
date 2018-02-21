import React from 'react';
import App from '../components/App';
import { shallow } from 'enzyme';

it('shows the correct h1 value', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('h1').length).toBe(1);
  expect(wrapper.find('h1').at(0).text()).toBe('Find Whānau Services in your area');
});
