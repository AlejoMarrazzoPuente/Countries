import React from "react";

const Searcher = ({handleSearch , searchValue}) => {
    return(
        <>
            <h1>Country Searcher</h1>
            <div>
                <label>Search Country:  </label>
                <input type="text" onChange={handleSearch} value={searchValue}/>
            </div>
        </>
    )
}

export default Searcher