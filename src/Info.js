import React from "react";

const Info = ({name, capital, area}) => {
    return(
        <>  
            <h1>{name}</h1>
            <p>Capital {capital}</p>
            <p>Area {area}</p>
        </>
    )
}

export default Info