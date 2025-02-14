import Breadcrumbs from "@/Components/Breadcrumbs";
import MainLayout from "@/Layouts/MainLayout";
import { Head, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Inertia } from "@inertiajs/inertia";

const Index = ({ villages, can }) => {
    const BreadcrumbsPath = [
        { label: "Village", link: "/village" },
        { label: "List" },
    ];

    const [activeVillage, setActiveVillage] = useState(null);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const villageStyle = {
        fillColor: "#3388ff",
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
    };

    const highlightFeature = (e) => {
        const layer = e.target;
        layer.setStyle({
            weight: 5,
            color: "#666",
            dashArray: "",
            fillOpacity: 0.7,
        });
    };

    const resetHighlight = (e) => {
        const layer = e.target;
        layer.setStyle(villageStyle);
    };

    return (
        <MainLayout>
            <Head title="Village" />

            <div className="p-4 mb-4 md:mb-6 text-white rounded-md shadow-md bg-primary">
                <Breadcrumbs items={BreadcrumbsPath} />
            </div>

            <div className="mb-4 md:mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="h-[300px] md:h-[500px] relative">
                    <MapContainer
                        center={[4.1416, 96.5096]}
                        zoom={11}
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
                        {villages.map((village) => {
                            const geoJsonData =
                                typeof village.boundary_village === "string"
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
                                            click: () =>
                                                setActiveVillage(village),
                                        });
                                        layer.bindPopup(village.name_village);
                                    }}
                                />
                            );
                        })}
                    </MapContainer>
                </div>
            </div>

            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="p-4 md:p-6 bg-white border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                        <h2 className="text-lg md:text-xl font-semibold">
                            Daftar Desa
                        </h2>
                        {can.create && (
                            <button
                                onClick={() =>
                                    Inertia.get(route("village.create"))
                                }
                                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 text-sm md:text-base w-full md:w-auto"
                            >
                                Tambah Desa
                            </button>
                        )}
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                        Nama Desa
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                        Kode Desa
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                        Kecamatan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {villages.map((village) => (
                                    <tr
                                        key={village.id}
                                        className="hover:bg-gray-50"
                                        onMouseEnter={() =>
                                            setActiveVillage(village)
                                        }
                                        onMouseLeave={() =>
                                            setActiveVillage(null)
                                        }
                                    >
                                        <td className="px-6 py-4">
                                            {village.name_village}
                                        </td>
                                        <td className="px-6 py-4">
                                            {village.code_village}
                                        </td>
                                        <td className="px-6 py-4">
                                            {
                                                village.subdistrict
                                                    .name_subdistrict
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                {can.edit && (
                                                    <button
                                                        onClick={() =>
                                                            Inertia.get(
                                                                route(
                                                                    "village.edit",
                                                                    village.id
                                                                )
                                                            )
                                                        }
                                                        className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                                {can.delete && (
                                                    <button
                                                        onClick={() => {
                                                            if (
                                                                confirm(
                                                                    "Apakah Anda yakin ingin menghapus desa ini?"
                                                                )
                                                            ) {
                                                                Inertia.delete(
                                                                    route(
                                                                        "village.destroy",
                                                                        village.id
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                        className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                                                    >
                                                        Hapus
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() =>
                                                        Inertia.get(
                                                            route(
                                                                "village.show",
                                                                village.id
                                                            )
                                                        )
                                                    }
                                                    className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-700"
                                                >
                                                    Detail
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden space-y-4">
                        {villages.map((village) => (
                            <div
                                key={village.id}
                                className="bg-white rounded-lg shadow p-4 border border-gray-200"
                                onMouseEnter={() => setActiveVillage(village)}
                                onMouseLeave={() => setActiveVillage(null)}
                            >
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs text-gray-500">
                                            Nama Desa
                                        </label>
                                        <p className="font-medium">
                                            {village.name_village}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">
                                            Kode Desa
                                        </label>
                                        <p className="font-medium">
                                            {village.code_village}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">
                                            Kecamatan
                                        </label>
                                        <p className="font-medium">
                                            {
                                                village.subdistrict
                                                    .name_subdistrict
                                            }
                                        </p>
                                    </div>
                                    <div className="pt-3 border-t border-gray-200">
                                        <div className="flex flex-wrap gap-2">
                                            {can.edit && (
                                                <button
                                                    onClick={() =>
                                                        Inertia.get(
                                                            route(
                                                                "village.edit",
                                                                village.id
                                                            )
                                                        )
                                                    }
                                                    className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600 text-sm"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                            {can.delete && (
                                                <button
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                "Apakah Anda yakin ingin menghapus desa ini?"
                                                            )
                                                        ) {
                                                            Inertia.delete(
                                                                route(
                                                                    "village.destroy",
                                                                    village.id
                                                                )
                                                            );
                                                        }
                                                    }}
                                                    className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 text-sm"
                                                >
                                                    Hapus
                                                </button>
                                            )}
                                            <button
                                                onClick={() =>
                                                    Inertia.get(
                                                        route(
                                                            "village.show",
                                                            village.id
                                                        )
                                                    )
                                                }
                                                className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-700 text-sm"
                                            >
                                                Detail
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Index;
