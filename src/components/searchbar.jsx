import React, {useState, useContext} from "react";
import SearchContext from "../util/context";
import reducer from "../util/reducer";


function SearchBar(){
    const context = useContext(SearchContext);
    const [searchTerm, setSearchTerm] = useState(context.searchValue.searchTerm);

    //user can change the search topic by manually type in 
    
    const handleChange = (e) => {
      setSearchTerm(e.target.value);
      console.log("handleChange:",searchTerm);
    };
    
    return (
      <nav className="navbar navbar-dark bg-dark">
          <div className="navbar-brand">Github GraphQL Demo</div>
          <div className="form-inline">
          <input  
            value={searchTerm}
            onChange={handleChange}
            className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit"
              onClick={() => {context.searchDispatch({type: "CHANGE", payload: searchTerm})}}
          >Search</button>
          </div>
      </nav>
    );
};

export default SearchBar;
