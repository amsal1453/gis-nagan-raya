import MainLayout from "@/Layouts/MainLayout";
import React from "react";
import { Head, Link } from "@inertiajs/react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { Inertia } from "@inertiajs/inertia";

const Index = ({ subdistricts }) => {
    const BreadcrumbsPath = [
        { label: "Subdistricts", link: "/subdistricts" },
        { label: "List" },
    ];

    const handleDelete = (id) => {
        if (confirm("apakah kamu yakin menghapus data ini")) {
            Inertia.delete(`/subdistricts/${id}`, {
                onSuccess: () => {
                    alert("Data berhasil di hapus");
                },
            });
        }
    };

    return (
        <MainLayout>
            <Head title="Subdistricts" />

            <div className="bg-primary text-[#ffff] p-4 rounded-md shadow-md">
                <Breadcrumbs items={BreadcrumbsPath} />
            </div>

            <div className="mt-4 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="p-4 md:p-6 border-b border-gray-200 bg-primary">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
                        <h2 className="text-xl md:text-2xl font-semibold text-white">
                            Subdistricts
                        </h2>
                        <Link
                            href="/subdistricts/create"
                            className="text-sm md:text-base px-3 py-1.5 md:px-4 md:py-2 text-white bg-blue-600 rounded hover:bg-blue-700 text-center"
                        >
                            Add New Subdistrict
                        </Link>
                    </div>

                    {/* Map */}
                    <div className="mb-6 h-64 md:h-96">
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
                                            weight: 2,
                                            color: "#3388ff",
                                            opacity: 1,
                                            fillOpacity: 0,
                                        }}
                                    />
                                );
                            })}
                        </MapContainer>
                    </div>

                    {/* Responsive Table */}
                    <div className="w-full overflow-hidden">
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
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
                                        <tr
                                            key={subdistrict.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {subdistrict.name_subdistrict}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {subdistrict.code_subdistrict}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex space-x-4">
                                                    <Link
                                                        href={`/subdistricts/${subdistrict.id}/edit`}
                                                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                subdistrict.id
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-900 font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden space-y-4">
                            {subdistricts.map((subdistrict) => (
                                <div
                                    key={subdistrict.id}
                                    className="bg-white rounded-lg shadow-sm p-4"
                                >
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">
                                                    Name
                                                </p>
                                                <p className="mt-1 text-gray-900">
                                                    {
                                                        subdistrict.name_subdistrict
                                                    }
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-gray-500">
                                                    Code
                                                </p>
                                                <p className="mt-1 text-gray-900">
                                                    {
                                                        subdistrict.code_subdistrict
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pt-3 border-t border-gray-200">
                                            <div className="flex justify-end space-x-4">
                                                <Link
                                                    href={`/subdistricts/${subdistrict.id}/edit`}
                                                    className="text-indigo-600 hover:text-indigo-900 font-medium text-sm"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            subdistrict.id
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-900 font-medium text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Index;
