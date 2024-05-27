import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, Text, tokens } from "@fluentui/react-components";
import React from "react";

export const DataDisplay = ({
    eventData
}) => (<div className="display-wrapper" style={{backgroundColor: tokens.colorNeutralForeground2BrandSelected}}>
    <Text className="display-info">
        Place: {eventData.place.name}
    </Text>
    <Text className="display-info">
        Date: {eventData.date}
    </Text>
    <Text className="display-info">
        Time: {eventData.time ?? 'Unknown'}
    </Text>

    <Text className="display-info">
        Reason of the accident: {eventData.reasonOfAccident}
    </Text>
    <Text className="display-info">
        Action sequence: {eventData.sequenceOfEvents.join(' > ')}
    </Text>
    {eventData.vehicles.length > 0 && <Text className="display-info">
        Vehicles: {eventData.vehicles.join(', ')}
    </Text> }

    <Accordion>
        <AccordionItem value="1">
        <AccordionHeader>Total casualities: {eventData.casualties}</AccordionHeader>
        <AccordionPanel>
            <div>
            <Text className="display-info">Ages of victims: {
                eventData.ageOfCasualties.join(', ')
            }</Text>

            </div>
            <Text className="display-info">Number of injured: {
                eventData.injured
            }</Text>
        </AccordionPanel>
        </AccordionItem>
    </Accordion>
    

</div>);