import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MainLayout from '@/Layouts/MainLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';

const SpatialDataIndex = () => {
    const { spatialData, villages, auth } = usePage().props;
    const [selectedVillage, setSelectedVillage] = useState(null);
    const breadCrumbsPath = [
        { label: 'Spatial-data', link: '/spatial-index' },
        { label: 'List' }
    ]

    // Determine if user can filter villages
    const canFilterVillages = auth.user.roles.some(role => role.name === 'admin_kecamatan');


    const handleVillageFilter = (villageId) => {
        // Implement server-side filtering via Inertia
        Inertia.get(route('spatial-data.index'), {
            village_id: villageId
        }, {
            preserveState: true
        });
    };
    console.log(auth.user.roles)
    console.log('spatialData', spatialData)
    console.log('villages', villages)


    return (
        <MainLayout>
            <Head title="Spatial Data" />
            <div className='p-4 mb-6 text-white rounded-md shadow-md bg-primary'>
                <Breadcrumbs items={breadCrumbsPath} />
            </div>

            <div className='p-6 overflow-hidden shadow-sm bg-primary sm:rounded-lg'>

                {/* Village Filter for Admin Kecamatan */}
                {canFilterVillages && (
                    <div className="mb-4">
                        <select
                            onChange={(e) => {
                                setSelectedVillage(e.target.value);
                                handleVillageFilter(e.target.value);
                            }}
                            value={selectedVillage || ''}
                            className="rounded form-select "
                        >
                            <option value="">All Villages</option>
                            {villages.map(village => (
                                <option key={village.id} value={village.id}>
                                    {village.name_village}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <MapContainer
                    center={[4.1416, 96.5096]}
                    zoom={10}
                    style={{ height: '500px', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {spatialData.data.map(item => (
                        <React.Fragment key={item.id}>
                            {/* Point Marker */}
                            {item.location && (
                                <Marker
                                    position={[
                                        item.location.coordinates[1],
                                        item.location.coordinates[0]
                                    ]}
                                >
                                    <Popup>{item.name_spatial}</Popup>
                                </Marker>
                            )}

                            {/* Polygon Area */}
                            {item.area && (
                                <Polygon
                                    positions={item.area.coordinates[0].map(coord => [
                                        coord[1],
                                        coord[0]
                                    ])}
                                    color="blue"
                                    fillOpacity={0.3}
                                >
                                    <Popup>{item.name_spatial} Area</Popup>
                                </Polygon>
                            )}

                            {/* LineString */}
                            {item.line && (
                                <Polyline
                                    positions={item.line.coordinates.map(coord => [
                                        coord[1],
                                        coord[0]
                                    ])}
                                    color="red"
                                >
                                    <Popup>{item.name_spatial} Route</Popup>
                                </Polyline>
                            )}
                        </React.Fragment>
                    ))}
                </MapContainer>

                {/* Spatial Data Table */}
                <div className="mt-4">
                    <table className="w-full bg-white border">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Village</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {spatialData.data.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name_spatial}</td>
                                    <td>{item.village.name}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        {/* Add view/edit/delete actions */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
};

export default SpatialDataIndex;
