/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// source 1: https://stackoverflow.com/questions/64665827/react-leaflet-center-attribute-does-not-change-when-the-center-state-changes
// source 2: https://react-leaflet.js.org/docs/api-map/#usemap
function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

export default function Map(props) {
    const styles = css`
        .map{
            width: 50%;
            height: 500px;
            margin-top: 2%;
        }
        
        .divStyles{
            width: 100%;
            display: flex;
            justify-content: center;
        }
    `;

    return (
        <div css={styles}>
            <div className="divStyles">
                <MapContainer center={props.position} zoom={10} scrollWheelZoom={false} className="map">
                    <ChangeView center={props.position} zoom={10} />
                    <TileLayer
                        attribution={`&copy; <a href="http://osm.org/copyright"> OpenStreetMap </a> contributors`}
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
        </div>
    );
}