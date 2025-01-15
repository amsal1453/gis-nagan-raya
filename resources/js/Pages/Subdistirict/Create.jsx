import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { MapContainer, TileLayer, FeatureGroup, Polygon } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import MainLayout from '@/Layouts/MainLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';

const Create = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name_subdistrict: '',
        code_subdistrict: '',
        boundary_subdistrict: null,
    });

    console.log(data.boundary_subdistrict)

    const [coordinates, setCoordinates] = useState('');
    const [showCoordinateInput, setShowCoordinateInput] = useState(false);

    const handleCreated = (e) => {
        const layer = e.layer;
        const geoJSON = layer.toGeoJSON();
        const geometry = geoJSON.geometry;
        setData('boundary_subdistrict',JSON.stringify(geometry));

        const coords = layer.getLatLngs()[0];
        const coordsString = coords.map(coord => `${coord.lat}, ${coord.lng}`).join('\n');
        setCoordinates(coordsString);
    };

    const handleEdited = (e) => {
        const layers = e.layers;
        layers.eachLayer((layer) => {
            const geoJSON = layer.toGeoJSON();
            const geometry = geoJSON.geometry;
            setData('boundary_subdistrict',  JSON.stringify(geometry));

            const coords = layer.getLatLngs()[0];
            const coordsString = coords.map(coord => `${coord.lat}, ${coord.lng}`).join('\n');
            setCoordinates(coordsString);
        });
    };

    const handleDeleted = () => {
        setData('boundary_subdistrict', null);
        setCoordinates('');
    };

    const handleCoordinatesChange = (e) => {
        const newCoords = e.target.value;
        setCoordinates(newCoords);

        try {
            const coordArray = newCoords.split('\n')
                .map(pair => pair.split(',').map(num => parseFloat(num.trim())))
                .filter(pair => pair.length === 2 && !isNaN(pair[0]) && !isNaN(pair[1]));

            if (coordArray.length >= 3) {
                const geoJSON = {
                    type: 'Polygon',
                    coordinates: [coordArray.map(([lat, lng]) => [lng, lat])],
                };
                setData('boundary_subdistrict', geoJSON);
            }
        } catch (error) {
            console.error('Error parsing coordinates:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route(("subdistricts.store")), {
            onSuccess: () => alert('Subdistrict created successfully!'),
        });
    };

    const breadCrumbsPath = [
        { label: 'Subdistrict', link: '/subdistricts' },
        { label: 'Create' }
    ];

    return (
        <MainLayout>
            <Head title="Create Subdistrict" />
            <div className="p-4 text-white rounded-md shadow-md bg-primary">
                <Breadcrumbs items={breadCrumbsPath} />
            </div>
            <div className="mt-4 bg-white shadow-sm sm:rounded-lg">
                <div className="p-6 bg-white border-b border-gray-200">
                    <h2 className="mb-6 text-2xl font-semibold">Create New Subdistrict</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700">Name</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded shadow focus:outline-none focus:shadow-outline"
                                value={data.name_subdistrict}
                                onChange={e => setData('name_subdistrict', e.target.value)}
                            />
                            {errors.name_subdistrict && <div className="mt-1 text-xs text-red-500">{errors.name_subdistrict}</div>}
                        </div>

                        {/* Code */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700">Code</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded shadow focus:outline-none focus:shadow-outline"
                                value={data.code_subdistrict}
                                onChange={e => setData('code_subdistrict', e.target.value)}
                            />
                            {errors.code_subdistrict && <div className="mt-1 text-xs text-red-500">{errors.code_subdistrict}</div>}
                        </div>

                        {/* Map */}
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-bold text-gray-700">Boundary</label>
                                <button
                                    type="button"
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                    onClick={() => setShowCoordinateInput(!showCoordinateInput)}
                                >
                                    {showCoordinateInput ? 'Hide Coordinates Input' : 'Show Coordinates Input'}
                                </button>
                            </div>
                            {showCoordinateInput && (
                                <textarea
                                    className="w-full px-3 py-2 mt-2 border rounded shadow focus:outline-none focus:shadow-outline"
                                    rows="5"
                                    value={coordinates}
                                    onChange={handleCoordinatesChange}
                                    placeholder="Enter coordinates (latitude, longitude) one pair per line"
                                />
                            )}
                            <div className="mt-4 border rounded h-96">
                                <MapContainer center={[4.1416, 96.5096]} zoom={12} className="w-full h-full">
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; OpenStreetMap contributors'
                                    />
                                    <FeatureGroup>
                                        <EditControl
                                            position="topright"
                                            onCreated={handleCreated}
                                            onEdited={handleEdited}
                                            onDeleted={handleDeleted}
                                            draw={{
                                                rectangle: false,
                                                circle: false,
                                                marker: false,
                                                circlemarker: false,
                                                polyline: false,
                                            }}
                                        />
                                    </FeatureGroup>
                                </MapContainer>
                            </div>
                            {errors.boundary_subdistrict && (
                                <div className="mt-1 text-xs text-red-500">{errors.boundary_subdistrict}</div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => reset()}
                                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                                disabled={processing}
                            >
                                {processing ? 'Creating...' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default Create;
