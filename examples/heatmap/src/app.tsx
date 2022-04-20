import * as React from 'react';
import {useState, useEffect, useMemo} from 'react';
import {render} from 'react-dom';
import MapGL, {Source, Layer} from 'react-map-gl';
import ControlPanel from './control-panel';
import {heatmapLayer, crimeLayer, tweetLayer} from './map-style';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2FycmV0dGNyaXNzIiwiYSI6ImNrYWltOWk5cTAyaXMydHMwdm5rMWd1bXQifQ.xY8kGI7PtunrCBszB_2nCw'; // Set your mapbox token here

function filterFeaturesByDay(featureCollection, time) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const features = featureCollection.features.filter(feature => {
    const featureDate = new Date(feature.properties.time);
    return (
      featureDate.getFullYear() === year &&
      featureDate.getMonth() === month &&
      featureDate.getDate() === day
    );
  });
  return {type: 'FeatureCollection', features};
}

export default function App() {
  const [allDays, useAllDays] = useState(true);
  const [timeRange, setTimeRange] = useState([0, 0]);
  const [selectedTime, selectTime] = useState(1);
  const [earthquakes, setEarthQuakes] = useState(null);
  const [showTweets, setShowTweets] = useState(false);
  const [showBox, setShowBox] = useState(false);

  const clearanceLevels = ["ALPHA", "BETA", "GAMMA"];

  const [viewState] = useState({
    longitude: -104.991531, //-104.991531
    latitude: 39.742043, //39.742043
    zoom: 7,
    pitch: 0,
    bearing: 0,
  });

  let crimeData = JSON.parse(`{
    "type": "FeatureCollection",
    "features": [
   {
     "type": "Feature",
     "geometry": {
        "type": "Point",
        "coordinates":  [ -104.9731245,39.73412358 ]
     },
     "properties": {
     "Crime":"Robbery",
     "Detective Assigned":"Grass",
     "Witness":"John Smith",
     "Date":"2022-02-15"
     }
   },
   {
     "type": "Feature",
     "geometry": {
        "type": "Point",
        "coordinates":  [ -104.9755523,39.72823203 ]
     },
     "properties": {
     "Crime":"Motor Vehicle Theft",
     "Detective Assigned":"Tilly",
     "Witness":"Jane Smith",
     "Date":"2022-02-14"
     }
   },
   {
     "type": "Feature",
     "geometry": {
        "type": "Point",
        "coordinates":  [ -104.9751224,39.7291723 ]
     },
     "properties": {
     "Crime":"Burglary",
     "Detective Assigned":"Desilva",
     "Witness":"John Doe",
     "Date":"2022-02-13"
     }
   },
   {
     "type": "Feature",
     "geometry": {
        "type": "Point",
        "coordinates":  [ -104.9799911,39.73012382 ]
     },
     "properties": {
     "Crime":"Robbery",
     "Detective Assigned":"Hutchinson",
     "Witness":"Terell Davis",
     "Date":"2022-02-12"
     }
   },
   {
     "type": "Feature",
     "geometry": {
        "type": "Point",
        "coordinates":  [ -104.9801335,39.73923013 ]
     },
     "properties": {
     "Crime":"Arson",
     "Detective Assigned":"McTammy",
     "Witness":"Ed Mcafferey",
     "Date":"2022-02-11"
     }
   },
   {
     "type": "Feature",
     "geometry": {
        "type": "Point",
        "coordinates":  [ -104.9782013,39.73812023 ]
     },
     "properties": {
     "Crime":"Larceny",
     "Detective Assigned":"Starsky",
     "Witness":"Shannon Sharpe",
     "Date":"2022-02-10"
     }
   },
   {
     "type": "Feature",
     "geometry": {
        "type": "Point",
        "coordinates":  [ -104.9744266,39.72983203 ]
     },
     "properties": {
     "Crime":"Larceny",
     "Detective Assigned":"Stabler",
     "Witness":"Rod Smith",
     "Date":"2022-02-09"
     }
   },
   {
     "type": "Feature",
     "geometry": {
        "type": "Point",
        "coordinates":  [ -104.789904,39.718390 ]
     },
     "properties": {
     "Crime":"Motor Vehicle Theft",
     "Detective Assigned":"Tilly",
     "Witness":"Jane Smith",
     "Date":"2022-02-14"
     }
   },
   {
     "type": "Feature",
     "geometry": {
        "type": "Point",
        "coordinates":  [ -104.799904,39.718390 ]
     },
     "properties": {
     "Crime":"Motor Vehicle Theft",
     "Detective Assigned":"Tilly",
     "Witness":"Jane Smith",
     "Date":"2022-02-14"
     }
   },
   {
     "type": "Feature",
     "geometry": {
        "type": "Point",
        "coordinates":  [ -104.779904,39.715390 ]
     },
     "properties": {
     "Crime":"Motor Vehicle Theft",
     "Detective Assigned":"Tilly",
     "Witness":"Jane Smith",
     "Date":"2022-02-14"
     }
   },
   {
     "type": "Feature",
     "geometry": {
        "type": "Point",
        "coordinates":  [ -104.9741245,39.73312358 ]
     },
     "properties": {
     "Crime":"Damaged Property",
     "Detective Assigned":"Benson",
     "Witness":"Brian Griese",
     "Date":"2022-02-08"
     }
   }
 ]
 }`)
  

  const tweetData = JSON.parse(`{
    "type": "FeatureCollection",
    "features": [
   {
     "type": "Feature",
     "geometry": {
        "type": "Point",
        "coordinates":  [ -104.9751245,39.73312358 ]
     },
     "properties": {
     "Crime":"Robbery",
     "Detective Assigned":"Grass",
     "Witness":"John Smith",
     "Date":"2022-02-15"
     }
   },
   {
     "type": "Feature",
     "geometry": {
        "type": "Point",
        "coordinates":  [ -104.9750245,39.73312358 ]
     },
     "properties": {
     "Crime":"Motor Vehicle Theft",
     "Detective Assigned":"Tilly",
     "Witness":"Jane Smith",
     "Date":"2022-02-14"
     }
   },
   {
     "type": "Feature",
     "geometry": {
        "type": "Point",
        "coordinates":  [ -104.9751224,39.7291723 ]
     },
     "properties": {
     "Crime":"Burglary",
     "Detective Assigned":"Desilva",
     "Witness":"John Doe",
     "Date":"2022-02-13"
     }
   }
 ]
 }`)

  const data = useMemo(() => {
    return allDays ? earthquakes : filterFeaturesByDay(earthquakes, selectedTime);
  }, [earthquakes, allDays, selectedTime]);

  const respondToClick = () => {
    if (!showTweets) {
      setShowTweets(true);
      setShowBox(true);
    } else if (!showBox) {
      setShowBox(true);
    } else {
      setShowTweets(false);
      setShowBox(false);
    }
  }

  return (
    <>
      <MapGL
        initialViewState={viewState}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={(e) => respondToClick() } 
      >
        
        <Source type="geojson" data={crimeData}>
          <Layer {...heatmapLayer} />
        </Source>
        <Source type="geojson" data={crimeData}>
          <Layer {...crimeLayer} />
        </Source>
        
        {showTweets &&
          <Source type="geojson" data={tweetData}>
            <Layer {...tweetLayer} />
          </Source>
        }
      </MapGL>
      <ControlPanel
        startTime={1}
        endTime={3}
        selectedTime={selectedTime}
        onChangeTime={selectTime}
        showBox={showBox}
      />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
