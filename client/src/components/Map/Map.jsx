import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";

const mapData = {
  "Arlington Heights": [34.0422392, -118.3276651],
  "Beverly Grove": [34.0766675, -118.3936502],
  "Carthay": [34.0558552, -118.3768057],
  "Chinatown": [34.0671948, -118.2491091],
  "Downtown": [34.0392321, -118.2837561],
  "East Hollywood": [34.0898091, -118.3054416],
  "Echo Park": [34.0854648, -118.2643221],
  "Elysian Park": [34.081702, -118.2476331],
  "Elysian Valley": [34.0958978, -118.2510474],
  "Fairfax": [34.0789286, -118.3615181],
  "Griffith Park": [34.1365588, -118.2963887],
  "Hancock Park": [34.0692438, -118.345412],
  "Harvard Heights": [34.0422392, -118.3129215],
  "Hollywood": [34.0937851, -118.3439877],
  "Hollywood Hills": [34.1131916, -118.4194806],
  "Hollywood Hills West": [34.1132458, -118.3669501],
  "Koreatown": [34.0608055, -118.3091387],
  "Los Feliz": [34.108176, -118.2966132],
  "West Hollywood": [34.0872479, -118.3783668],
  "Silver Lake": [34.0932629, -118.2849348],
  "Westlake": [34.0577288, -118.2856576],
  "Pico-Union": [34.0448094, -118.2935566],
  "Mid-Wilshire": [34.0596662, -118.360482],
  "Mid-City": [34.0479267, -118.3708643],
}

export default function Map({neighborhood}) {
  var hood = mapData[neighborhood]
  const InnerMap = () => {
    return (
      <GoogleMap
      defaultZoom={14}
      defaultCenter={{lat: hood[0], lng: hood[1]}}
      >
        <Marker
          position={{
            lat: hood[0],
            lng: hood[1]
          }}
          />
      </GoogleMap>
    )
  }

  const Wrapped = withScriptjs(withGoogleMap(InnerMap));
  return (
    <div style={{width: '50vw', height: '60vh'}} className="map">
      <Wrapped
        googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBYhkZV9wJYaqnfcvAq5Doga7IKh_Fjh1E"}
        loadingElement={<div style={{height: "100%"}} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  )
}

