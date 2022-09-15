const reducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state, searchTerm: action.payload
            };
    } 
};
  
export default reducer;
  
  
  
