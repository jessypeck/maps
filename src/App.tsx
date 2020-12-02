import React, { useState, useRef, useMemo } from 'react';
import styled from 'styled-components'

import { MapContainer, Marker, ImageOverlay, useMap } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// --------------------------------------------------------------- //
//                              Set Up                             //
// --------------------------------------------------------------- //

// Bounds should be the smallest renderable size of the image (full resolution visible only via zooming)
// the aspect ratio should be the same as original size
const imgBounds = [[0,0], [500,375]] as any;

let leafletIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12,41]
})

// This allows us to hook the leaflet "map" contained within <MapContainer />
// We can then call all kinds of methods on it
// https://react-leaflet.js.org/docs/api-map#hooks
// https://leafletjs.com/reference-1.7.1.html#map-example
function Hook() {
  const map = useMap()
  map.setMaxBounds(imgBounds)
  return null
}

interface Marker {
  id: string,
  position: [number, number]
}

const markerList: Marker[] = [
  {
    id: '1',
    position: [54, 70]
  },
  {
    id: '2',
    position: [65, 35]
  },
  {
    id: '3',
    position: [30, 70]
  }
]

// --------------------------------------------------------------- //
//                      Draggable Marker Helpers                   //
// --------------------------------------------------------------- //

const DraggableMarker = ({ id, defaultPosition }: any) => {
  // Adapted from: https://react-leaflet.js.org/docs/example-draggable-marker
  const [position, setPosition] = useState(defaultPosition)
  const markerRef = useRef(null)

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current as any;
        if (marker != null) {
          const newPosition = [marker.getLatLng().lat, marker.getLatLng().lng] as [number, number];
          setPosition(newPosition)
          updateMarkerPosition(id, newPosition);
        }
      },
    }),
    [],
  )

  return (
    <Marker
      icon={leafletIcon}
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
    </Marker>
  )
}

const updateMarkerPosition = (id: string, newPosition: [number, number]) => {
  for (let marker of markerList) {
    if (marker.id == id) {
      marker.position = newPosition;
      return;
    }
  }
  console.warn('No marker found with id ' + id + '.')
}


// --------------------------------------------------------------- //
//                         Main Component                          //
// --------------------------------------------------------------- //

const App = () => {
  return (
    <MapContainer center={[0, 0]} zoom={1} minZoom={0} maxZoom={3} scrollWheelZoom={false} style={{ height: "600px", width: "600px", marginLeft: "400px"}}>
      <Hook />
      <ImageOverlay bounds={imgBounds} url="https://rapidnotes.files.wordpress.com/2016/08/dyson-logos-camping-map.jpg" />
      {markerList.map(markerData => (
        <DraggableMarker
          id={markerData.id}
          defaultPosition={markerData.position}
          key={markerData.id}
        />
      ))}
    </MapContainer>
  );
}

export default App;
