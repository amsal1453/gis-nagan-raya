import Breadcrumbs from '@/Components/Breadcrumbs'
import MainLayout from '@/Layouts/MainLayout'
import { Head, usePage } from '@inertiajs/react'
import React from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { Inertia } from '@inertiajs/inertia';

const Index = ({ villages, can }) => {
    console.log(villages)

    const BreadcrumbsPath = [
        { label: 'Village', link: '/village' },
        { label: 'List' }
    ]

    // State untuk tracking village yang di-hover
    const [activeVillage, setActiveVillage] = React.useState(null);

    // Style untuk GeoJSON
    const villageStyle = {
        fillColor: '#3388ff',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };

    // Event handlers untuk GeoJSON
    const highlightFeature = (e) => {
        const layer = e.target;
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
    };

    const resetHighlight = (e) => {
        const layer = e.target;
        layer.setStyle(villageStyle);
    };

    return (
        <MainLayout>
            <Head title='Village' />

            <div className='p-4 mb-6 text-white rounded-md shadow-md bg-primary'>
                <Breadcrumbs items={BreadcrumbsPath} />
            </div>

            <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="h-[500px] relative">
                    <MapContainer
                        center={[4.1416, 96.5096]}
                        zoom={14}
                        className="w-full h-full"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                            opacity={0.6}
                        />
                        {villages.map((village) => {

                            const geoJsonData = typeof village.boundary_village === 'string'
                                ? JSON.parse(village.boundary_village)
                                : village.boundary_village;

                            return (
                            <GeoJSON
                                key={village.id}
                                    data={geoJsonData}
                                style={villageStyle}
                                onEachFeature={(feature, layer) => {
                                    layer.on({
                                        mouseover: highlightFeature,
                                        mouseout: resetHighlight,
                                        click: () => setActiveVillage(village)
                                    });
                                    layer.bindPopup(village.name_village);
                                }}
                            />
                            )
                        })}
                    </MapContainer>
                </div>
            </div>
            
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="p-6 bg-white border-b border-gray-200">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-xl font-semibold">Daftar Desa</h2>
                        {can.create && (
                            <button
                                onClick={() => Inertia.get(route('village.create'))}
                                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                            >
                                Tambah Desa
                            </button>
                        )}
                    </div>
                    

                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b">Nama Desa</th>
                                    <th className="px-6 py-3 border-b">Kode Desa</th>
                                    <th className="px-6 py-3 border-b">Kecamatan</th>
                                    <th className="px-6 py-3 border-b">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {villages.map((village) => (
                                    <tr
                                        key={village.id}
                                        className="hover:bg-gray-50"
                                        onMouseEnter={() => setActiveVillage(village)}
                                        onMouseLeave={() => setActiveVillage(null)}
                                    >
                                        <td className="px-6 py-4 border-b">{village.name_village}</td>
                                        <td className="px-6 py-4 border-b">{village.code_village}</td>
                                        <td className="px-6 py-4 border-b">{village.subdistrict.name_subdistrict}</td>
                                        <td className="px-6 py-4 border-b">
                                            <div className="flex gap-2">
                                                {can.edit && (
                                                    <button
                                                        onClick={() => Inertia.get(route('villages.edit', village.id))}
                                                        className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                                {can.delete && (
                                                    <button
                                                        onClick={() => {
                                                            if (confirm('Apakah Anda yakin ingin menghapus desa ini?')) {
                                                                Inertia.delete(route('villages.destroy', village.id));
                                                            }
                                                        }}
                                                        className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                                                    >
                                                        Hapus
                                                    </button>
                                                )}
                                                <button
                                                onClick={() => Inertia.get(route('village.show', village.id))} 
                                                
                                                className='px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-700 '> 
                                                    Detail
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



        </MainLayout>
    )
}

export default Index