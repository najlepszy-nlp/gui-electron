import React, { useEffect, useState } from "react";
import worldcities from './worldcities.csv';

import "ol/ol.css";
import "./map.css";
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Event } from "./components/Event.jsx";
import { RMap, ROSM, RLayerVector, RFeature, RControl, RStyle } from "rlayers";
import locationIcon from './components/map-marker.png';
import { DataDisplay } from "./components/DataDisplay.jsx";
import { FluentProvider, Text, webDarkTheme } from "@fluentui/react-components";
import { Filters } from "./components/Filters.jsx";

const EVENT_MOCK_DATA = [
  {
    "place": "Dhaka",
    "date": "2022-03-01",
    "time": "Around midday",
    "vehicles": ["Bus", "Auto-rickshaw"],
    "casualties": 5,
    "ageOfCasualties": [32, 45, 27, 50, 19],
    "injured": 10,
    "sequenceOfActions": ["Bus was overtaking another vehicle", "Auto-rickshaw was crossing the road", "Collision occurred"],
    "reasonOfAccident": "Reckless overtaking",
  },{
    "place": "Delhi",
    "date": "2022-03-01",
    "time": "Around midday",
    "vehicles": ["Bus", "Auto-rickshaw"],
    "casualties": 5,
    "ageOfCasualties": [32, 45, 27, 50, 19],
    "injured": 10,
    "sequenceOfActions": ["Bus was overtaking another vehicle", "Auto-rickshaw was crossing the road", "Collision occurred"],
    "reasonOfAccident": "Reckless overtaking",
  },
];

const coords = {
  origin: [90.407608, 23.811056],
}
const center = fromLonLat([90.407608, 23.811056]);

async function readCSVFile() {
  try {
    const response = await fetch(worldcities);
    const csvText = await response.text();
    const lines = csvText.split('\n').map(line => line.trim());
    const data = lines.map(line => line.split(','));
    data.shift();
    const citiesData = data.map((city) => [city[1], Number(city[2]), Number(city[3])]);
    return citiesData;
  } catch (error) {
    console.error('Error reading CSV file:', error);
    throw error;
  }
}

function App() {

  const [chosenEvent, setChosenEvent] = useState(-1);

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [worldCities, setWorldsCities] = useState([]);

  const dateFilter = (date) => 
  (selectedStartDate === null && selectedEndDate === null ) 
  || (selectedStartDate !== null && selectedEndDate !== null && (
    date >= selectedStartDate && date <= selectedEndDate
  )) || (
     selectedStartDate !== null && selectedEndDate === null && date >= selectedStartDate)
     || (selectedEndDate !== null && selectedStartDate === null && date <= selectedEndDate); 


    useEffect(() => {
      async function fetchData() {
        try {
          const data = await readCSVFile();
          console.log(data);
          setWorldsCities(data);
        } catch (error) {
          console.error('Error fetching CSV data:', error);
        }
      }
      fetchData();
    }, []);

  return (
    <FluentProvider theme={webDarkTheme}>
      <main>
          <nav>
            <Text as='h2' className="header">events</Text>
            <div className="filters">
              <Filters 
                selectedStartDate={selectedStartDate} 
                setSelectedStartDate={setSelectedStartDate} 
                selectedEndDate={selectedEndDate} 
                setSelectedEndDate={setSelectedEndDate} 
              />
            </div>
            <section>
              {EVENT_MOCK_DATA.map((elem, ind) => dateFilter(new Date(elem.date)) && (
                <Event 
                  {...elem} 
                  clickCallback={() => setChosenEvent(ind)}
                  ind={ind}
                />)
              )}
            </section>
          </nav>
          <div>
            <RMap 
              className="map"
              initial={{ center: center, zoom: 8 }}
            >
              <ROSM />
              <RControl.RScaleLine />
              <RControl.RAttribution />
              <RControl.RZoom />
              <RControl.RZoomSlider />

              <RLayerVector zIndex={10}>
                <RStyle.RStyle>
                  <RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} />
                </RStyle.RStyle>
                <RFeature
                    geometry={new Point(fromLonLat(coords.origin))}
                    onClick={(e) => setChosenEvent(0)}
                >
                </RFeature>
              </RLayerVector>
            </RMap>
            {
              chosenEvent !== -1 && (
                <DataDisplay eventData={EVENT_MOCK_DATA[chosenEvent]} />
              )
            }
          </div>
      </main>
    </FluentProvider>
  );
}

export default App;