import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const SpatialDataMap = ({ data }) => {
    // Default center (adjust to your region)
    const mapCenter = [-7.2575, 112.7521];

    return (
        <div className="overflow-hidden bg-white rounded-lg shadow">
            <MapContainer 
                center={mapCenter} 
                zoom={10} 
                className="w-full h-96"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                {data.map(item => (
                    item.location && (
                        <Marker 
                            key={item.id} 
                            position={[
                                item.location.latitude, 
                                item.location.longitude
                            ]}
                        >
                            <Popup>
                                <div>
                                    <strong>{item.name_spatial}</strong>
                                    <br />
                                    Village: {item.village?.name}
                                    <br />
                                    Categories: {item.categories?.map(cat => cat.name).join(', ')}
                                </div>
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>
        </div>
    );
};

export default SpatialDataMap;