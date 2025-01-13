
import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const Create = () => {
    const { data, setData, post, processing, errors } = useForm({
        name_subdistrict: '',
        code_subdistrict: '',
        boundary_subdistrict: null,
    });

    const handleCreated = (e) => {
        const layer = e.layer;
        const geoJSON = layer.toGeoJSON();
        setData('boundary_subdistrict', geoJSON);
    };

    const handleEdited = (e) => {
        const layers = e.layers;
        layers.eachLayer((layer) => {
            const geoJSON = layer.toGeoJSON();
            setData('boundary_subdistrict', geoJSON);
        });
    };

    const handleDeleted = () => {
        setData('boundary_subdistrict', null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/subdistricts');
    };

    return (
        <>
            <Head title="Create Subdistrict" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="mb-6 text-2xl font-semibold">Create New Subdistrict</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        value={data.name_subdistrict}
                                        onChange={e => setData('name_subdistrict', e.target.value)}
                                    />
                                    {errors.name_subdistrict && (
                                        <div className="mt-1 text-xs text-red-500">{errors.name_subdistrict}</div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700">
                                        Code
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        value={data.code_subdistrict}
                                        onChange={e => setData('code_subdistrict', e.target.value)}
                                    />
                                    {errors.code_subdistrict && (
                                        <div className="mt-1 text-xs text-red-500">{errors.code_subdistrict}</div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700">
                                        Boundary
                                    </label>
                                    <div className="border rounded h-96">
                                        <MapContainer
                                            center={[4.1416, 96.5096]}
                                            zoom={12}
                                            className="w-full h-full"
                                        >
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
                                                        circlemarker: false,
                                                        marker: false,
                                                        polyline: false,
                                                        polygon: {
                                                            allowIntersection: false,
                                                            drawError: {
                                                                color: '#e1e100',
                                                                message: '<strong>Polygon draw error!</strong> Please fix the shape.'
                                                            },
                                                            shapeOptions: {
                                                                color: '#3388ff'
                                                            }
                                                        }
                                                    }}
                                                />
                                            </FeatureGroup>
                                        </MapContainer>
                                    </div>
                                    {errors.boundary_subdistrict && (
                                        <div className="mt-1 text-xs text-red-500">{errors.boundary_subdistrict}</div>
                                    )}
                                    <p className="mt-2 text-sm text-gray-600">
                                        Use the drawing tools on the right side of the map to create the boundary
                                    </p>
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() => window.location.reload()}
                                        className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                                    >
                                        Reset
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                                        disabled={processing}
                                    >
                                        Create Subdistrict
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Create;

