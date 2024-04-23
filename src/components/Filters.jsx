import React from "react";

import { DatePicker } from "@fluentui/react-datepicker-compat";

export const Filters = ({
    selectedStartDate, setSelectedStartDate,
    selectedEndDate, setSelectedEndDate,
}) => (<>
        <DatePicker
            value={selectedStartDate}
            onSelectDate={setSelectedStartDate}
            placeholder="Select start filter date..."
            className="date-picker"
        />
        <DatePicker
            value={selectedEndDate}
            onSelectDate={setSelectedEndDate}
            placeholder="Select end filter date..."
            className="date-picker"
        />
</>);
