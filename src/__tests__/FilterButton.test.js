import React from "react";
import { mount } from "enzyme";
import FilterButton from '../components/FilterButton';

describe("FilterButton", () => {
  let props;
  let mountedFilterButton;
  const filterButton = () => {
    if (!mountedFilterButton) {
      mountedFilterButton = mount(
        <FilterButton record={{ name: 'Basic Needs' }} />
      );
    }
    return mountedFilterButton;
  }

  it("always renders a filterButton", () => {
    const NavItem = filterButton().find('Link');
    expect(NavItem.length).toBeGreaterThan(0);
    expect(NavItem).toBeDefined();
  });
});
