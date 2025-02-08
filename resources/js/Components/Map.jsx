// resources/js/Components/Map.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ spatialData }) => {
    return (
        <MapContainer center={[-7.2575, 112.7521]} zoom={13} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {spatialData.map((data, index) => (
                <React.Fragment key={index}>
                    {/* Tampilkan titik (point) */}
                    {data.location && (
                        <Marker position={[data.location.coordinates[1], data.location.coordinates[0]]}>
                            <Popup>
                                <strong>{data.name_spatial}</strong>
                                <br />
                                {data.description}
                            </Popup>
                        </Marker>
                    )}

                    {/* Tampilkan area (polygon) */}
                    {data.area && (
                        <Polygon
                            positions={data.area.coordinates[0].map(coord => [coord[1], coord[0]])}
                            color="blue"
                        >
                            <Popup>
                                <strong>{data.name_spatial}</strong>
                                <br />
                                {data.description}
                            </Popup>
                        </Polygon>
                    )}

                    {/* Tampilkan garis (line) */}
                    {data.line && (
                        <Polyline
                            positions={data.line.coordinates.map(coord => [coord[1], coord[0]])}
                            color="red"
                        >
                            <Popup>
                                <strong>{data.name_spatial}</strong>
                                <br />
                                {data.description}
                            </Popup>
                        </Polyline>
                    )}
                </React.Fragment>
            ))}
        </MapContainer>
    );
};

export default Map;