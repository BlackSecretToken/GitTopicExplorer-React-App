import React, { Component, useState,useContext } from "react";
import SearchResult from './searchResult';
import SearchContext from "../util/context";
import reducer from "../util/reducer";

function DisplayContent(props){
    const context = useContext(SearchContext);
    return (
        <div>
            <h3 className="display-4" title="topic of search term">TOPIC: <span className="badge badge-secondary">{context.searchValue.searchTerm}</span></h3>
            <SearchResult></SearchResult>
        </div>
    );

}

export default DisplayContent;
