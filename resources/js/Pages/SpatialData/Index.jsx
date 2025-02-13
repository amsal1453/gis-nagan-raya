import Breadcrumbs from "@/Components/Breadcrumbs";
import MainLayout from "@/Layouts/MainLayout";
import { Head, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polygon,
    Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import Pagination from "@/Components/Pagination";

// Definisikan custom icon
const customIcon = new Icon({
    iconUrl: "/markers/marker-icon.png",
    iconRetinaUrl: "/markers/marker-icon-2x.png",
    shadowUrl: "/markers/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

export default function Index({
    spatialData,
    can,
    filters,
    villages,
    categories,
}) {
    const breadcrumbsPath = [
        {
            label: "Spatial Data",
            link: "/spatial-data",
        },
        {
            label: "List",
        },
    ];
    console.log(spatialData);

    // State untuk tracking data yang aktif
    const [activeData, setActiveData] = useState(null);

    // State untuk filter
    const [filterValues, setFilterValues] = useState({
        search: filters?.search || "",
        subdistrict_id: filters?.subdistrict_id || "",
        village_id: filters?.village_id || "",
        category: filters?.category || "",
    });

    

    // Handle perubahan filter
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterValues((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Kirim request dengan filter baru
        Inertia.get(
            route("spatial-data.index"),
            {
                ...filterValues,
                [name]: value,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <MainLayout>
            <Head title="Spatial Data" />
            <div className="p-4 mb-6 text-white rounded-md shadow-md bg-primary">
                <Breadcrumbs items={breadcrumbsPath} />
            </div>

            {/* Filter Panel - Tambahkan sebelum Panel Peta */}
            <div className="p-6 mb-6 bg-primary shadow-sm sm:rounded-lg">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    {/* Search Filter */}
                    <input
                        type="text"
                        name="search"
                        value={filterValues.search}
                        onChange={handleFilterChange}
                        placeholder="Cari data spasial..."
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Village Filter */}
                    <select
                        name="village_id"
                        value={filterValues.village_id}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Pilih Desa</option>
                        {villages?.map((village) => (
                            <option key={village.id} value={village.id}>
                                {village.name_village}
                            </option>
                        ))}
                    </select>

                    {/* Category Filter */}
                    <select
                        name="category"
                        value={filterValues.category}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Pilih Kategori</option>
                        {categories?.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name_category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Panel Peta */}
            <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="h-[500px] relative">
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

                        {spatialData.data?.map((item) => (
                            <React.Fragment key={item.id}>
                                {/* Render Point */}
                                {item.location && (
                                    <Marker
                                        position={[
                                            item.location.coordinates[1],
                                            item.location.coordinates[0],
                                        ]}
                                        icon={customIcon}
                                    >
                                        <Popup>
                                            <div>
                                                <h3 className="font-bold">
                                                    {item.name_spatial}
                                                </h3>
                                                <p>
                                                    Desa:{" "}
                                                    {item.village?.name_village}
                                                </p>
                                                <p>
                                                    Kecamatan:{" "}
                                                    {
                                                        item.subdistrict
                                                            ?.name_subdistrict
                                                    }
                                                </p>
                                                <p>
                                                    Kategori:{" "}
                                                    {item.categories
                                                        ?.map(
                                                            (cat) =>
                                                                cat.name_category
                                                        )
                                                        .join(", ")}
                                                </p>
                                            </div>
                                        </Popup>
                                    </Marker>
                                )}

                                {/* Render Polygon */}
                                {item.area && (
                                    <Polygon
                                        positions={item.area.coordinates[0].map(
                                            (coord) => [coord[1], coord[0]]
                                        )}
                                        pathOptions={{ color: "blue" }}
                                    >
                                        <Popup>
                                            <div>
                                                <h3 className="font-bold">
                                                    {item.name_spatial}
                                                </h3>
                                                <p>
                                                    Desa:{" "}
                                                    {item.village?.name_village}
                                                </p>
                                                <p>
                                                    Kecamatan:{" "}
                                                    {
                                                        item.subdistrict
                                                            ?.name_subdistrict
                                                    }
                                                </p>
                                            </div>
                                        </Popup>
                                    </Polygon>
                                )}

                                {/* Render Line */}
                                {item.line && (
                                    <Polyline
                                        positions={item.line.coordinates.map(
                                            (coord) => [coord[1], coord[0]]
                                        )}
                                        pathOptions={{ color: "red" }}
                                    >
                                        <Popup>
                                            <div>
                                                <h3 className="font-bold">
                                                    {item.name_spatial}
                                                </h3>
                                                <p>
                                                    Desa:{" "}
                                                    {item.village?.name_village}
                                                </p>
                                                <p>
                                                    Kecamatan:{" "}
                                                    {
                                                        item.subdistrict
                                                            ?.name_subdistrict
                                                    }
                                                </p>
                                            </div>
                                        </Popup>
                                    </Polyline>
                                )}
                            </React.Fragment>
                        ))}
                    </MapContainer>
                </div>
            </div>

            {/* Panel Data */}
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="p-6 bg-white border-b border-gray-200">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-xl font-semibold">
                            Daftar Data Spasial
                        </h2>
                        {can.create && (
                            <button
                                onClick={() =>
                                    Inertia.get(route("spatial-data.create"))
                                }
                                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                            >
                                Tambah Data
                            </button>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b">Nama</th>
                                    <th className="px-6 py-3 border-b">Desa</th>
                                    <th className="px-6 py-3 border-b">
                                        Kecamatan
                                    </th>
                                    <th className="px-6 py-3 border-b">
                                        Kategori
                                    </th>
                                    <th className="px-6 py-3 border-b">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {spatialData.data?.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50"
                                        onMouseEnter={() => setActiveData(item)}
                                        onMouseLeave={() => setActiveData(null)}
                                    >
                                        <td className="px-6 py-4 border-b">
                                            {item.name_spatial}
                                        </td>
                                        <td className="px-6 py-4 border-b">
                                            {item.village?.name_village}
                                        </td>
                                        <td className="px-6 py-4 border-b">
                                            {item.subdistrict?.name_subdistrict}
                                        </td>
                                        <td className="px-6 py-4 border-b">
                                            {item.categories
                                                ?.map(
                                                    (cat) => cat.name_category
                                                )
                                                .join(", ")}
                                        </td>
                                        <td className="px-6 py-4 border-b">
                                            <div className="flex gap-2">
                                                {can.edit && (
                                                    <button
                                                        onClick={() =>
                                                            Inertia.get(
                                                                route(
                                                                    "spatial-data.edit",
                                                                    item.id
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
                                                                    "Apakah Anda yakin ingin menghapus data ini?"
                                                                )
                                                            ) {
                                                                Inertia.delete(
                                                                    route(
                                                                        "spatial-data.destroy",
                                                                        item.id
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
                                                                "spatial-data.show",
                                                                item.id
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

                        <Pagination
                            links={spatialData.links}
                            className="mt-4 justify-center"
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
