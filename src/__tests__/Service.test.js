import React from 'react';
import renderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import expect from 'expect';
import Service from '../components/Service';

describe("Service", () => {
  const minProps = {
    record: {
      FSD_ID: '123'
    }
  }
  const wrapper = shallow(<Service {...minProps}/>);

  it('renders the Service', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('includes link back to FSD_ID', () => {
    expect(wrapper.find(Link).props().to).toBe('123');
  });
});
