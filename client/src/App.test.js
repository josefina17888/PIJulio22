import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Landing from "../src/components/Landing";

configure({ adapter: new Adapter() });

describe("<Landing />", () => {
  let nav;
  beforeEach(() => {
    nav = shallow(<Landing />);
  });

  it('Debería renderizar un <Link to="" /> que vaya a "/home"', () => {
        expect(nav.find(Link).length).toBeGreaterThanOrEqual(1);
        expect(nav.find(Link).at(0).prop('to')).toEqual('/home');
  });

  it('Debería tener un Link con el texto "Ingresar" que cambie la ruta hacia "/home"', () => {
    // El orden en el que se declaran los Links es importante!
    expect(nav.find(Link).at(0).prop("to")).toEqual("/home");
    expect(nav.find(Link).at(0).text()).toEqual("Ingresar");
  });
});
