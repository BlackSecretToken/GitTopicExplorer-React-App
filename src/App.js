import React, { Component, useState, useContext, useReducer } from "react";
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/searchbar';
import { render } from '@testing-library/react';
import DisplayContent from "./components/display";
import SearchContext from "./util/context";
import reducer from "./util/reducer";

const initialState = {
  searchTerm: 'vue',
}

function App() {

  const [value, dispatch] = useReducer(reducer, initialState);
  const [click, setClick] = useState(0);

  return (
    <SearchContext.Provider value={{ searchValue: value, searchDispatch: dispatch }}>
      <div>
        <SearchBar></SearchBar>
        <div className="jumbotron">
          <DisplayContent></DisplayContent>
          <hr className="my-4"></hr>
          <a href="https://www.linkedin.com/in/andrew-kelly-62068a24a/"><h5 className="float-right">Andrew Kelly</h5></a>
        </div>
      </div>
    </SearchContext.Provider>
  );

}

export default App;
