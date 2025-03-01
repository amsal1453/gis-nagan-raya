import React, { useState, useRef, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import MainLayout from '@/Layouts/MainLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import L from 'leaflet';

export default function Create({ subdistricts }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        subdistrict_id: '',
        name_village: '',
        code_village: '',
        boundary_village: null
    });

    const [coordinates, setCoordinates] = useState('');
    const [showCoordinateInput, setShowCoordinateInput] = useState(false);
    const [map, setMap] = useState(null);
    const featureGroupRef = useRef(null);

    // Function to handle map creation
    const onMapCreated = (mapInstance) => {
        setMap(mapInstance);
    };

    // Function to handle feature group ready
    const onFeatureGroupReady = (reactFGref) => {
        featureGroupRef.current = reactFGref;
    };

    // Function to handle drawing creation
    const handleCreated = (e) => {
        const layer = e.layer;
        const geoJSON = layer.toGeoJSON();
        const geometry = geoJSON.geometry;
        setData('boundary_village', JSON.stringify(geometry));

        const coords = layer.getLatLngs()[0];
        const coordsString = coords.map(coord => `${coord.lat}, ${coord.lng}`).join('\n');
        setCoordinates(coordsString);
    };

    // Function to handle editing of polygons
    const handleEdited = (e) => {
        const layers = e.layers;
        layers.eachLayer((layer) => {
            const geoJSON = layer.toGeoJSON();
            const geometry = geoJSON.geometry;
            setData('boundary_village', JSON.stringify(geometry));

            const coords = layer.getLatLngs()[0];
            const coordsString = coords.map(coord => `${coord.lat}, ${coord.lng}`).join('\n');
            setCoordinates(coordsString);
        });
    };

    // Function to handle deletion of polygons
    const handleDeleted = () => {
        setData('boundary_village', null);
        setCoordinates('');
    };

    // Function to parse coordinates string into an array
    const parseCoordinatesString = (coordString) => {
        return coordString.split('\n')
            .map(pair => pair.split(',').map(num => parseFloat(num.trim())))
            .filter(pair => pair.length === 2 && !isNaN(pair[0]) && !isNaN(pair[1]));
    };

    // Function to handle changes in coordinates text input
    const handleCoordinatesChange = (e) => {
        const newCoords = e.target.value;
        setCoordinates(newCoords);

        try {
            // Parse coordinates from text input
            let coordArray = parseCoordinatesString(newCoords);

            // Verify minimum number of points
            if (coordArray.length < 3) {
                console.warn('Minimal 3 titik koordinat diperlukan untuk membuat polygon');
                return;
            }

            // Ensure polygon is closed (first point = last point)
            const firstPoint = coordArray[0];
            const lastPoint = coordArray[coordArray.length - 1];
            
            if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
                coordArray.push([...firstPoint]);
            }

            // Create GeoJSON object
            const geoJSON = {
                type: 'Polygon',
                coordinates: [coordArray.map(([lat, lng]) => [lng, lat])]
            };
            
            setData('boundary_village', JSON.stringify(geoJSON));

            // Update map if featureGroup is available
            if (featureGroupRef.current && map) {
                // Clear existing layers
                featureGroupRef.current.clearLayers();
                
                // Create new polygon layer and add to feature group
                const polygonLayer = L.polygon(coordArray);
                polygonLayer.addTo(featureGroupRef.current);
                
                // Optionally fit bounds to show the entire polygon
                map.fitBounds(polygonLayer.getBounds());
            }
        } catch (error) {
            console.error('Error parsing coordinates:', error);
        }
    };

    // Function to fill sample coordinates
    const fillSampleCoordinates = () => {
        const sampleCoords = "4.1416, 96.5096\n4.1516, 96.5196\n4.1616, 96.5296\n4.1516, 96.5396\n4.1416, 96.5096";
        setCoordinates(sampleCoords);
        handleCoordinatesChange({ target: { value: sampleCoords } });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("village.store"), {
            onSuccess: () => alert('Village created successfully!'),
        });
    };

    // Update map when coordinates change
    useEffect(() => {
        if (coordinates && featureGroupRef.current && map) {
            const coordArray = parseCoordinatesString(coordinates);
            
            if (coordArray.length >= 3) {
                featureGroupRef.current.clearLayers();
                const polygonLayer = L.polygon(coordArray);
                polygonLayer.addTo(featureGroupRef.current);
                map.fitBounds(polygonLayer.getBounds());
            }
        }
    }, [coordinates]);

    const breadCrumbsPath = [
        { label: 'Village', link: '/village' },
        { label: 'Create' }
    ];

    return (
        <MainLayout>
            <Head title="Create Village" />
            <div className="p-4 text-white rounded-md shadow-md bg-primary">
                <Breadcrumbs items={breadCrumbsPath} />
            </div>

            <div className="mt-4 bg-white shadow-sm sm:rounded-lg">
                <div className="p-6 bg-white border-b border-gray-200">
                    <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                        Create New Village
                    </h2>
                    <form onSubmit={onSubmit}>
                        {/* Subdistrict Selection */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-900">
                                Subdistrict
                            </label>
                            <select
                                value={data.subdistrict_id}
                                onChange={(e) => setData("subdistrict_id", e.target.value)}
                                className="w-full px-3 py-2 border rounded shadow focus:outline-none focus:shadow-outline"
                            >
                                <option value="">Select Subdistrict</option>
                                {subdistricts.map((subdistrict) => (
                                    <option key={subdistrict.id} value={subdistrict.id}>
                                        {subdistrict.name_subdistrict}
                                    </option>
                                ))}
                            </select>
                            {errors.subdistrict_id && (
                                <div className="mt-1 text-xs text-red-500">
                                    {errors.subdistrict_id}
                                </div>
                            )}
                        </div>

                        {/* Village Name */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-900">
                                Village Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded shadow focus:outline-none focus:shadow-outline"
                                value={data.name_village}
                                onChange={(e) => setData("name_village", e.target.value)}
                            />
                            {errors.name_village && (
                                <div className="mt-1 text-xs text-red-500">
                                    {errors.name_village}
                                </div>
                            )}
                        </div>

                        {/* Village Code */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700">
                                Village Code
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded shadow focus:outline-none focus:shadow-outline"
                                value={data.code_village}
                                onChange={(e) => setData("code_village", e.target.value)}
                            />
                            {errors.code_village && (
                                <div className="mt-1 text-xs text-red-500">
                                    {errors.code_village}
                                </div>
                            )}
                        </div>

                        {/* Map and Coordinates Input */}
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-bold text-gray-700">
                                    Village Boundary
                                </label>
                                <button
                                    type="button"
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                    onClick={() => setShowCoordinateInput(!showCoordinateInput)}
                                >
                                    {showCoordinateInput ? "Hide Coordinates Input" : "Show Coordinates Input"}
                                </button>
                            </div>
                            
                            {showCoordinateInput && (
                                <div className="mt-2">
                                    <div className="flex justify-between">
                                        <p className="mb-2 text-sm text-gray-600">
                                            Masukkan koordinat (latitude, longitude) satu pasang per baris.
                                            Contoh format:
                                            <br />
                                            4.1416, 96.5096
                                            <br />
                                            4.1516, 96.5196
                                            <br />
                                            4.1616, 96.5296
                                        </p>
                                        <button
                                            type="button"
                                            className="ml-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 border border-blue-600 rounded"
                                            onClick={fillSampleCoordinates}
                                        >
                                            Isi Contoh
                                        </button>
                                    </div>
                                    <textarea
                                        className="w-full px-3 py-2 border rounded shadow focus:outline-none focus:shadow-outline"
                                        rows="5"
                                        value={coordinates}
                                        onChange={handleCoordinatesChange}
                                        placeholder="4.1416, 96.5096&#10;4.1516, 96.5196&#10;4.1616, 96.5296"
                                    />
                                </div>
                            )}

                            <div className="mt-4 border rounded h-96">
                                <MapContainer
                                    center={[4.1416, 96.5096]}
                                    zoom={12}
                                    className="w-full h-full"
                                    whenCreated={onMapCreated}
                                >
                                    <TileLayer
                                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                        attribution="&copy; Esri"
                                    />
                                    <TileLayer
                                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                    />
                                    <FeatureGroup ref={onFeatureGroupReady}>
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
                            {errors.boundary_village && (
                                <div className="mt-1 text-xs text-red-500">
                                    {errors.boundary_village}
                                </div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    reset();
                                    setCoordinates('');
                                    if (featureGroupRef.current) {
                                        featureGroupRef.current.clearLayers();
                                    }
                                }}
                                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                                disabled={processing}
                            >
                                {processing ? "Creating..." : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
