import React from 'react';
import { Head } from '@inertiajs/react';
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MainLayout from '@/Layouts/MainLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';

export default function Show({ village }) {
    const breadCrumbsPath = [
        {label: 'Village', link: '/village' },
        {label: 'Show'}
    ]
    return (
        <MainLayout>
            <Head title={`Detail Desa ${village.name_village}`} />
            
            <div className='p-4 mb-6 text-white rounded-md shadow-md bg-primary'> 
                <Breadcrumbs items={breadCrumbsPath}/>
            </div>
            
            <div className="py-6 mx-auto rounded-md max-w-7xl sm:px-6 lg:px-8 bg-primary">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Detail Informasi Desa
                        </h3>
                    </div>
                    
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Nama Desa</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {village.name_village}
                                </dd>
                            </div>
                            
                            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Kode Desa</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {village.code_village}
                                </dd>
                            </div>
                            
                            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Kecamatan</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {village.subdistrict.name_subdistrict}
                                </dd>
                            </div>

                            <div className="px-4 py-5 bg-white sm:px-6">
                                <dt className="mb-4 text-sm font-medium text-gray-500">Batas Desa</dt>
                                <dd className="mt-1">
                                    <div style={{ height: '400px' }}>
                                        <MapContainer
                                            center={[4.0619633, 96.2407869]}
                                            zoom={13}
                                            style={{ height: '100%', width: '100%' }}
                                            zoomControl={false}
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
                                            
                                            {village.boundary && (
                                                <GeoJSON 
                                                    data={village.boundary}
                                                    style={{
                                                        color: '#3388ff',
                                                        weight: 3,
                                                        opacity: 0.7,
                                                        fillOpacity: 0.2
                                                    }}
                                                />
                                            )}
                                        </MapContainer>
                                    </div>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}