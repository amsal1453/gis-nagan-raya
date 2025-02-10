import MainLayout from '@/Layouts/MainLayout'
import React, { useEffect, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import Breadcrumbs from '@/Components/Breadcrumbs';

const Edit = ({ subdistrict }) => {
    const { data, setData, put,  processing, errors } = useForm({
        name_subdistrict: subdistrict.name_subdistrict,
        code_subdistrict: subdistrict.code_subdistrict,
        boundary_subdistrict: subdistrict.boundary_subdistrict
    });

    const featureGroupRef = useRef();

    useEffect(() => {
        if (featureGroupRef.current) {
            // Load existing boundary
            const geoJsonData = typeof data.boundary_subdistrict === 'string' 
                ? JSON.parse(data.boundary_subdistrict) 
                : data.boundary_subdistrict;
            
            const layer = L.geoJSON(geoJsonData);
            featureGroupRef.current.clearLayers();
            layer.addTo(featureGroupRef.current);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/subdistricts/${subdistrict.id}`);
    };

   

    const BreadcrumbsPath = [
        { label: 'Subdistricts', link: '/subdistricts' },
        { label: 'Edit' }
    ];

    return (
        <MainLayout>
            <Head title="Edit Subdistrict" />

            <div className='p-4 text-white rounded-md shadow-md bg-primary'>
                <Breadcrumbs items={BreadcrumbsPath} />
            </div>

            <div className="mt-4 bg-white shadow-sm sm:rounded-lg">
                <div className="p-6 border-b border-gray-200">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                value={data.name_subdistrict}
                                onChange={e => setData('name_subdistrict', e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                            {errors.name_subdistrict && (
                                <p className="text-red-500">{errors.name_subdistrict}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Code
                            </label>
                            <input
                                type="text"
                                value={data.code_subdistrict}
                                onChange={e => setData('code_subdistrict', e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                            {errors.code_subdistrict && (
                                <p className="text-red-500">{errors.code_subdistrict}</p>
                            )}
                        </div>

                        <div className="mb-4 h-96">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Boundary
                            </label>
                            <MapContainer
                                center={[4.1416, 96.5096]}
                                zoom={10}
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
                                <FeatureGroup ref={featureGroupRef}>
                                    <EditControl
                                        position="topright"
                                        onEdited={(e) => {
                                            const geoJson = featureGroupRef.current.toGeoJSON();
                                            setData('boundary_subdistrict', JSON.stringify(geoJson.features[0].geometry));
                                        }}
                                        onCreated={(e) => {
                                            const geoJson = featureGroupRef.current.toGeoJSON();
                                            setData('boundary_subdistrict', JSON.stringify(geoJson.features[0].geometry));
                                        }}
                                        draw={{
                                            rectangle: false,
                                            circle: false,
                                            circlemarker: false,
                                            marker: false,
                                            polyline: false
                                        }}
                                    />
                                </FeatureGroup>
                            </MapContainer>
                        </div>

                        <div className=" mt-10">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                            >
                                Update
                            </button>
                          
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default Edit;