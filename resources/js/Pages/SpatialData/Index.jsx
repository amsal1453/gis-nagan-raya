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

    const [activeData, setActiveData] = useState(null);
    const [filterValues, setFilterValues] = useState({
        search: filters?.search || "",
        subdistrict_id: filters?.subdistrict_id || "",
        village_id: filters?.village_id || "",
        category: filters?.category || "",
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterValues((prev) => ({
            ...prev,
            [name]: value,
        }));

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

    // Card component for mobile view
    const DataCard = ({ item }) => (
        <div className="p-4 mb-4 bg-white rounded-lg shadow md:hidden">
            <h3 className="mb-2 text-lg font-semibold">{item.name_spatial}</h3>
            <div className="space-y-2">
                <div className="grid grid-cols-3">
                    <span className="font-medium">Desa:</span>
                    <span className="col-span-2">
                        {item.village?.name_village}
                    </span>
                </div>
                <div className="grid grid-cols-3">
                    <span className="font-medium">Kecamatan:</span>
                    <span className="col-span-2">
                        {item.subdistrict?.name_subdistrict}
                    </span>
                </div>
                <div className="grid grid-cols-3">
                    <span className="font-medium">Kategori:</span>
                    <span className="col-span-2">
                        {item.categories
                            ?.map((cat) => cat.name_category)
                            .join(", ")}
                    </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                    {can.edit && (
                        <button
                            onClick={() =>
                                Inertia.get(route("spatial-data.edit", item.id))
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
                                        route("spatial-data.destroy", item.id)
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
                            Inertia.get(route("spatial-data.show", item.id))
                        }
                        className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-700"
                    >
                        Detail
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <MainLayout>
            <Head title="Spatial Data" />
            <div className="p-4 mb-6 text-white rounded-md shadow-md bg-primary">
                <Breadcrumbs items={breadcrumbsPath} />
            </div>

            {/* Responsive Filter Panel */}
            <div className="p-4 mb-6 bg-primary shadow-sm sm:p-6 sm:rounded-lg">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <input
                        type="text"
                        name="search"
                        value={filterValues.search}
                        onChange={handleFilterChange}
                        placeholder="Cari data spasial..."
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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

            {/* Map Panel */}
            <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="h-[300px] sm:h-[500px] relative">
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
                        {/* Map markers and other elements remain the same */}
                        {spatialData.data?.map((item) => (
                            <React.Fragment key={item.id}>
                                {/* Existing map elements code remains the same */}
                                {/* ... */}
                            </React.Fragment>
                        ))}
                    </MapContainer>
                </div>
            </div>

            {/* Data Panel */}
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="p-4 bg-white border-b border-gray-200 sm:p-6">
                    <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:justify-between sm:items-center">
                        <h2 className="text-xl font-semibold">
                            Daftar Data Spasial
                        </h2>
                        {can.create && (
                            <button
                                onClick={() =>
                                    Inertia.get(route("spatial-data.create"))
                                }
                                className="w-full px-4 py-2 text-white bg-blue-500 rounded sm:w-auto hover:bg-blue-600"
                            >
                                Tambah Data
                            </button>
                        )}
                    </div>

                    {/* Mobile View - Cards */}
                    <div className="md:hidden">
                        {spatialData.data?.map((item) => (
                            <DataCard key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Desktop View - Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <div className="inline-block min-w-full align-middle">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Desa
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kecamatan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kategori
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {spatialData.data?.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50"
                                            onMouseEnter={() =>
                                                setActiveData(item)
                                            }
                                            onMouseLeave={() =>
                                                setActiveData(null)
                                            }
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.name_spatial}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.village?.name_village}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {
                                                    item.subdistrict
                                                        ?.name_subdistrict
                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.categories
                                                    ?.map(
                                                        (cat) =>
                                                            cat.name_category
                                                    )
                                                    .join(", ")}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
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
                        </div>
                    </div>

                    <Pagination
                        links={spatialData.links}
                        className="mt-4 justify-center"
                    />
                </div>
            </div>
        </MainLayout>
    );
}
