import MainLayout from '@/Layouts/MainLayout'
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Index = ({ subdistricts }) => {
  return (
    <MainLayout>
          <Head title="Subdistricts" />

          <div className="py-12">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                      <div className="p-6 bg-white border-b border-gray-200">
                          <div className="flex justify-between items-center mb-6">
                              <h2 className="text-2xl font-semibold">Subdistricts</h2>
                              <Link
                                  href="/subdistricts/create"
                                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                  Add New Subdistrict
                              </Link>
                          </div>

                          {/* Map */}
                          <div className="mb-6 h-96">
                              <MapContainer
                                  center={[4.1416, 96.5096]} // Jakarta center coordinates
                                  zoom={10}
                                  className="h-full w-full"
                              >
                                  <TileLayer
                                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                  />
                                  {subdistricts.map((subdistrict) => (
                                      <GeoJSON
                                          key={subdistrict.id}
                                          data={subdistrict.boundary_subdistrict}
                                          style={{
                                              fillColor: '#3388ff',
                                              weight: 2,
                                              opacity: 1,
                                              color: 'white',
                                              fillOpacity: 0.7
                                          }}
                                      />
                                  ))}
                              </MapContainer>
                          </div>

                          {/* Table */}
                          <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                  <tr>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Name
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Code
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                                                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                                              >
                                                  Edit
                                              </Link>
                                              {/* Add delete functionality here */}
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
        
    </MainLayout>
  )
}

export default Index