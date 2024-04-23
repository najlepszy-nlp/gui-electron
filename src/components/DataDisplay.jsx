import React from "react";

export const DataDisplay = ({
    eventData
}) => (<div className="display-wrapper">
    {Object.keys(eventData).map((elem) => (<div className="display-info">
        {elem}: {Array.isArray(eventData[elem]) ? eventData[elem].join(', ') : eventData[elem]}
    </div>)
)}
</div>);