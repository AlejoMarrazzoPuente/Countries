import React from "react";

const Languages = ({languagesArray}) => {
    return(
        <>
            <h3>Languages</h3>
            <ul>
                {languagesArray.map(el => <li key={el}>{el}</li>)}
            </ul>
        </>
    )
}

export default Languages