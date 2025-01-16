import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { MapContainer, TileLayer, FeatureGroup, ZoomControl } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

export default function Create({ subdistricts }) {
    const [boundaries, setBoundaries] = useState([]);
    const [map, setMap] = useState(null);
    
    const { data, setData, post, processing, errors } = useForm({
        subdistrict_id: '',
        name_village: '',
        code_village: '',
        boundary_village: []
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('villages.store'));
    };

    const handleCreated = (e) => {
        const { layerType, layer } = e;
        if (layerType === 'polygon') {
            const coordinates = layer.getLatLngs()[0];
            setData('boundary_village', coordinates.map(coord => ({
                lat: coord.lat,
                lng: coord.lng
            })));
            setBoundaries([...boundaries, layer]);
        }
    };

    // Konfigurasi drawing tools yang sudah diperbaiki
    const drawOptions = {
        position: 'topright',
        polygon: {
            allowIntersection: false,
            showArea: true,
            drawError: {
                color: '#e1e100',
                message: '<strong>Polygon tidak boleh berpotongan!</strong>'
            },
            shapeOptions: {
                color: '#3388ff',
                weight: 3,
                opacity: 0.7,
                fillOpacity: 0.2,
                clickable: true
            },
            guide: {
                color: '#00ff00',
                weight: 1,
                opacity: 0.5,
                dashArray: '5, 5'
            },
            repeatMode: true,  // Bisa menggambar polygon berulang kali
            metric: true,      // Menampilkan ukuran dalam meter
        },
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false,
        polyline: false
    };

    const editOptions = {
        featureGroup: boundaries,
        edit: {
            selectedPathOptions: {
                maintainColor: true,
                opacity: 0.6,
                dashArray: '10, 10',
                fillOpacity: 0.1,
            }
        },
        remove: true,
    };

    // Inisialisasi custom handlers untuk drawing
    React.useEffect(() => {
        if (!map) return;

        // Override default draw handlers
        L.Draw.Polygon.prototype._calculateFinishDistance = function(t) {
            if (this._markers.length > 2) {
                const first = this._map.latLngToContainerPoint(this._markers[0].getLatLng());
                const last = this._map.latLngToContainerPoint(t);
                return Math.min(first.distanceTo(last), Infinity);
            }
            return Infinity;
        };
    }, [map]);

    return (
        <>
            <Head title="Create Village" />
            
            <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Subdistrict
                        </label>
                        <select
                            value={data.subdistrict_id}
                            onChange={e => setData('subdistrict_id', e.target.value)}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="">Select Subdistrict</option>
                            {subdistricts.map(subdistrict => (
                                <option key={subdistrict.id} value={subdistrict.id}>
                                    {subdistrict.name_subdistrict}
                                </option>
                            ))}
                        </select>
                        {errors.subdistrict_id && (
                            <p className="mt-1 text-sm text-red-600">{errors.subdistrict_id}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Village Name
                        </label>
                        <input
                            type="text"
                            value={data.name_village}
                            onChange={e => setData('name_village', e.target.value)}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.name_village && (
                            <p className="mt-1 text-sm text-red-600">{errors.name_village}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Village Code
                        </label>
                        <input
                            type="text"
                            value={data.code_village}
                            onChange={e => setData('code_village', e.target.value)}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.code_village && (
                            <p className="mt-1 text-sm text-red-600">{errors.code_village}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Village Boundary
                        </label>
                        <div className="mt-1" style={{ height: '600px' }}>
                            <MapContainer
                                center={[4.0619633, 96.2407869]}
                                zoom={13}
                                style={{ height: '100%', width: '100%' }}
                                zoomControl={false}
                                whenCreated={setMap}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                
                                <TileLayer
                                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                    attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                                    opacity={0.5}
                                />

                                <ZoomControl position="topright" />

                                <FeatureGroup ref={(featureGroupRef) => {
                                    if (featureGroupRef) {
                                        setBoundaries(featureGroupRef);
                                    }
                                }}>
                                    <EditControl
                                        position="topright"
                                        onCreated={handleCreated}
                                        draw={drawOptions}
                                        edit={editOptions}
                                    />
                                </FeatureGroup>
                            </MapContainer>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                            * Klik untuk menambah titik polygon, double klik untuk menyelesaikan polygon
                        </div>
                        {errors.boundary_village && (
                            <p className="mt-1 text-sm text-red-600">{errors.boundary_village}</p>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {processing ? 'Creating...' : 'Create Village'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}