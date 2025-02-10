import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import MainLayout from '@/Layouts/MainLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';

export default function Create({ subdistricts }) {
    const { data, setData, post, processing, errors } = useForm({
        subdistrict_id: '',
        name_village: '',
        code_village: '',
        boundary_village: []
    });

    const handleCreated = (e) => {
        const layer = e.layer;
        const geoJSON = layer.toGeoJSON();
        const geometry = geoJSON.geometry;
        setData('boundary_village', JSON.stringify(geometry));
    };

    const handleEdited = (e) => {
        const layers = e.layers;
        layers.eachLayer((layer) => {
            const geoJSON = layer.toGeoJSON();
            const geometry = geoJSON.geometry;
            setData('boundary_village', JSON.stringify(geometry));
        });
    };

    const handleDeleted = () => {
        setData('boundary_village', null);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        post(route(("village.index")), {
            onSuccess: () => alert('village created successfully!'),
        });
    };

    const breadCrumbsPath = [
        { label: 'Village', link: '/village' },
        { label: 'Create' }
    ]

    return (
        <MainLayout>
            <Head title="Create Village" />

            <div className="p-4 mb-6 text-white rounded-md shadow-md bg-primary">
                <Breadcrumbs items={breadCrumbsPath} />
            </div>

            <div className="py-6 mx-auto rounded-md max-w-7xl sm:px-6 lg:px-8 bg-primary">
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-100">
                            Subdistrict
                        </label>
                        <select
                            value={data.subdistrict_id}
                            onChange={(e) =>
                                setData("subdistrict_id", e.target.value)
                            }
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="">Select Subdistrict</option>
                            {subdistricts.map((subdistrict) => (
                                <option
                                    key={subdistrict.id}
                                    value={subdistrict.id}
                                >
                                    {subdistrict.name_subdistrict}
                                </option>
                            ))}
                        </select>
                        {errors.subdistrict_id && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.subdistrict_id}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-100">
                            Village Name
                        </label>
                        <input
                            type="text"
                            value={data.name_village}
                            onChange={(e) =>
                                setData("name_village", e.target.value)
                            }
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.name_village && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.name_village}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-100">
                            Village Code
                        </label>
                        <input
                            type="text"
                            value={data.code_village}
                            onChange={(e) =>
                                setData("code_village", e.target.value)
                            }
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.code_village && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.code_village}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-100">
                            Village Boundary
                        </label>
                        <div className="mt-1" style={{ height: "600px" }}>
                            <MapContainer
                                center={[4.0619633, 96.2407869]}
                                zoom={13}
                                style={{ height: "100%", width: "100%" }}
                            >
                                <TileLayer
                                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                    attribution="&copy; Esri"
                                />
                                <TileLayer
                                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
                                            polygon: true, // Simplified polygon configuration
                                        }}
                                    />
                                </FeatureGroup>
                            </MapContainer>
                        </div>
                        <div className="mt-2 text-sm text-gray-300">
                            * Klik untuk menambah titik polygon, double klik
                            untuk menyelesaikan polygon
                        </div>
                        {errors.boundary_village && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.boundary_village}
                            </p>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {processing ? "Creating..." : "Create Village"}
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
