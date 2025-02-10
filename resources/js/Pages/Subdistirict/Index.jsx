import MainLayout from '@/Layouts/MainLayout'
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { Inertia } from '@inertiajs/inertia';

const Index = ({ subdistricts }) => {
    const BreadcrumbsPath = [
        { label: 'Subdistricts', link: '/subdistricts' },
        { label: 'List' }

    ]

    const handleDelete = (id) => {
        if(confirm('apakah kamu yakin menghapus data ini')){
            Inertia.delete(`/subdistricts/${id}`,{
                onSuccess: () => {
                    alert('Data berhasil di hapus')
                }
            })
        }
        

    }

  return (
      <MainLayout>
          <Head title="Subdistricts" />

          <div className="bg-primary text-[#ffff] p-4 rounded-md shadow-md">
              <Breadcrumbs items={BreadcrumbsPath} />
          </div>

          <div className="mt-4 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="p-6 border-b border-gray-200 bg-primary">
                  <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-semibold text-white">
                          Subdistricts
                      </h2>
                      <Link
                          href="/subdistricts/create"
                          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                      >
                          Add New Subdistrict
                      </Link>
                  </div>

                  {/* Map */}
                  <div className="mb-6 h-96">
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
                          {subdistricts.map((subdistrict) => {
                              // Parse string GeoJSON menjadi object
                              const geoJsonData =
                                  typeof subdistrict.boundary_subdistrict ===
                                  "string"
                                      ? JSON.parse(
                                            subdistrict.boundary_subdistrict
                                        )
                                      : subdistrict.boundary_subdistrict;

                              return (
                                  <GeoJSON
                                      key={subdistrict.id}
                                      data={geoJsonData}
                                      style={{
                                          weight: 2, // Ketebalan garis
                                          color: "#3388ff", // Warna garis batas
                                          opacity: 1, // Transparansi garis
                                          fillOpacity: 0,
                                      }}
                                  />
                              );
                          })}
                      </MapContainer>
                  </div>

                  {/* Table */}
                  <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                          <tr>
                              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                  Name
                              </th>
                              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                  Code
                              </th>
                              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                  Actions
                              </th>
                          </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                          {subdistricts.map((subdistrict) => (
                              <tr key={subdistrict.id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                      {subdistrict.name_subdistrict}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                      {subdistrict.code_subdistrict}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                      <Link
                                          href={`/subdistricts/${subdistrict.id}/edit`}
                                          className="mr-4 text-indigo-600 hover:text-indigo-900"
                                      >
                                          Edit
                                      </Link>
                                      <button
                                          onClick={() =>
                                              handleDelete(subdistrict.id)
                                          }
                                      >
                                          Delete
                                      </button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      </MainLayout>
  );
}

export default Index
