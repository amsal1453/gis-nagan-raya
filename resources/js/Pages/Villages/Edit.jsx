import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { MapContainer, TileLayer, GeoJSON, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const Edit = ({ village, subdistricts }) => {
    const [mapCenter, setMapCenter] = useState([4.1416, 96.5096]);
    const [drawnLayers, setDrawnLayers] = useState(null);

    const { data, setData, put, errors, processing } = useForm({
        name_village: village.name_village || '',
        code_village: village.code_village || '',
        subdistrict_id: village.subdistrict_id || '',
        boundary_village: village.boundary_village || null,
    });

    const BreadcrumbsPath = [
        { label: 'Village', link: '/village' },
        { label: 'Edit' }
    ];

// 3. Ubah useEffect untuk penanganan data awal
useEffect(() => {
    if (village.boundary_village) {
        try {
            // Pastikan data yang diterima dalam format yang benar
            const geoJsonData = typeof village.boundary_village === 'string'
                ? JSON.parse(village.boundary_village)
                : village.boundary_village;

            // Jika data dalam format lengkap (dengan type dan coordinates)
            if (geoJsonData.type && geoJsonData.coordinates) {
                const coordinates = geoJsonData.coordinates[0][0];
                setMapCenter([coordinates[1], coordinates[0]]); // [lat, lng]
            }
            // Jika data hanya berupa array koordinat
            else if (Array.isArray(geoJsonData)) {
                const coordinates = geoJsonData[0];
                setMapCenter([coordinates[1], coordinates[0]]); // [lat, lng]
            }
        } catch (error) {
            console.error('Error parsing boundary data:', error);
        }
    }
}, [village]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('village.update', village.id));
    };

 const onCreated = (e) => {
    const layer = e.layer;
    const geoJSON = layer.toGeoJSON().geometry;
    setData('boundary_village', JSON.stringify(geoJSON.coordinates[0]));
    setDrawnLayers(layer);
};

    const onEdited = (e) => {
        const layers = e.layers;
        layers.eachLayer((layer) => {
            const geoJSON = layer.toGeoJSON().geometry;
            setData('boundary_village', JSON.stringify(geoJSON.coordinates[0]));
        });
    };
    const onDeleted = () => {
        setData('boundary_village', null);
        setDrawnLayers(null);
    };

    return (
        <MainLayout>
            <Head title="Edit Village" />

            <div className="p-4 mb-6 text-white rounded-md shadow-md bg-primary">
                <Breadcrumbs items={BreadcrumbsPath} />
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-semibold">Edit Village</h2>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Village Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={data.name_village}
                                onChange={(e) =>
                                    setData("name_village", e.target.value)
                                }
                            />
                            {errors.name_village && (
                                <div className="mt-1 text-sm text-red-500">
                                    {errors.name_village}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Village Code
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={data.code_village}
                                onChange={(e) =>
                                    setData("code_village", e.target.value)
                                }
                            />
                            {errors.code_village && (
                                <div className="mt-1 text-sm text-red-500">
                                    {errors.code_village}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Subdistrict
                            </label>
                            <select
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={data.subdistrict_id}
                                onChange={(e) =>
                                    setData("subdistrict_id", e.target.value)
                                }
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
                                <div className="mt-1 text-sm text-red-500">
                                    {errors.subdistrict_id}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block mb-2 text-sm font-medium">
                            Village Boundary
                        </label>
                        <div className="h-[400px] rounded-lg overflow-hidden">
                            <MapContainer
                                center={mapCenter}
                                zoom={13}
                                className="w-full h-full"
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
                                        onCreated={onCreated}
                                        onEdited={onEdited}
                                        onDeleted={onDeleted}
                                        draw={{
                                            rectangle: false,
                                            circle: false,
                                            circlemarker: false,
                                            marker: false,
                                            polyline: false,
                                        }}
                                    />
                                    {village.boundary_village &&
                                        !drawnLayers && (
                                            <GeoJSON
                                                data={
                                                    typeof village.boundary_village ===
                                                    "string"
                                                        ? JSON.parse(
                                                              village.boundary_village
                                                          )
                                                        : village.boundary_village
                                                }
                                            />
                                        )}
                                </FeatureGroup>
                            </MapContainer>
                        </div>
                        {errors.boundary_village && (
                            <div className="mt-1 text-sm text-red-500">
                                {errors.boundary_village}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4 mt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            {processing ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
};

export default Edit;
