import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/FilterButton';
import { shallow } from 'enzyme';

it('shows the correct quantity of filter buttons', () => {
  const wrapper = shallow(<FilterButton />);
  expect(wrapper.find('.list-inline').length).toBe(16);
});
