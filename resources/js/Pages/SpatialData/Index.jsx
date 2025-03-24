import Breadcrumbs from "@/Components/Breadcrumbs";
import MainLayout from "@/Layouts/MainLayout";
import { Head, usePage, router, Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import React, { useState, useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polygon,
    Polyline,
    GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import Pagination from "@/Components/Pagination";

// Definisi warna desa
const VILLAGE_COLORS = {
    default: "#808080",
    colors: [
        "#FF0000",
        "#00FF00",
        "#0000FF",
        "#FFA500",
        "#800080",
        "#FF00FF",
        "#008080",
    ],
};

// Fungsi untuk mendapatkan warna berdasarkan ID desa
const getColorByVillageId = (villageId) => {
    if (!villageId) return VILLAGE_COLORS.default;
    const index = parseInt(villageId) % VILLAGE_COLORS.colors.length;
    return VILLAGE_COLORS.colors[index];
};

// Ikon kustom untuk marker
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
    subdistricts,
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

    const { auth } = usePage().props;
    const userRole = auth?.roles?.[0] || "";
    const isAdminDesa = userRole === "admin_desa";
    const isAdminKecamatan = userRole === "admin_kecamatan";

    console.log("test")


    // Card component for mobile view
    const DataCard = ({ item }) => (
        <div className="p-4 mb-4 bg-white rounded-lg shadow md:hidden text-black">
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
                                router.get(route("spatial-data.edit", item.id))
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
                                    router.delete(
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
                            router.get(route("spatial-data.show", item.id))
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
            <div className="overflow-x-hidden">
                <Head title="Spatial Data" />
                <div className="p-4 mb-6 text-white rounded-md shadow-md bg-primary">
                    <Breadcrumbs items={breadcrumbsPath} />
                </div>

                {/* Responsive Filter Panel */}
                <div className="p-4 mb-6 bg-primary shadow-sm sm:p-6 sm:rounded-lg text-black">
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

                {/* Map Panel with boundary visualization */}
                <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="h-[300px] sm:h-[500px] relative">
                        <MapContainer
                            center={[4.1416, 96.5096]}
                            zoom={11}
                            className="w-full h-full"
                        >
                            <TileLayer
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                attribution="© Esri"
                            />
                            <TileLayer
                                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png"
                                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            />

                            {/* Render Subdistrict Boundaries for admin_kecamatan */}
                            {isAdminKecamatan &&
                                subdistricts?.map((subdistrict) => {
                                    if (
                                        subdistrict.boundary_subdistrict &&
                                        subdistrict.id === auth.user.subdistrict_id
                                    ) {
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
                                                onEachFeature={(feature, layer) => {
                                                    layer.bindPopup(
                                                        subdistrict.name_subdistrict
                                                    );
                                                }}
                                            />
                                        );
                                    }
                                    return null;
                                })}

                            {/* Render Village Boundaries */}
                            {villages?.map((village) => {
                                console.log('Processing village:', village);
                                
                                if (!village.boundary_village) {
                                    console.log('No boundary data for village:', village.name_village);
                                    return null;
                                }

                                try {
                                    const villageColor = getColorByVillageId(village.id);
                                    const boundaryData = JSON.parse(village.boundary_village);
                                    
                                    // Pastikan koordinat dalam format yang benar [longitude, latitude]
                                    const coordinates = boundaryData.coordinates[0].map(coord => [coord[1], coord[0]]);
                                    
                                    console.log('Coordinates for', village.name_village, ':', coordinates);

                                    return (
                                        <Polygon
                                            key={village.id}
                                            positions={coordinates}
                                            pathOptions={{
                                                fillColor: villageColor,
                                                weight: 2,
                                                color: villageColor,
                                                opacity: 1,
                                                fillOpacity: 0.4,
                                                dashArray: '3'
                                            }}
                                            eventHandlers={{
                                                mouseover: (e) => {
                                                    const layer = e.target;
                                                    layer.setStyle({
                                                        fillOpacity: 0.7
                                                    });
                                                },
                                                mouseout: (e) => {
                                                    const layer = e.target;
                                                    layer.setStyle({
                                                        fillOpacity: 0.4
                                                    });
                                                }
                                            }}
                                        >
                                            <Popup>{village.name_village}</Popup>
                                        </Polygon>
                                    );
                                } catch (error) {
                                    console.error('Error processing village boundary:', village.name_village, error);
                                    return null;
                                }
                            })}

                            {/* Existing Spatial Data Markers/Polygons/Polylines */}
                            {spatialData.data?.map((item) => (
                                <React.Fragment key={item.id}>
                                    {/* Render Point Marker */}
                                    {item.location && (
                                        <Marker
                                            position={[
                                                item.location.coordinates[1],
                                                item.location.coordinates[0],
                                            ]}
                                            icon={customIcon}
                                        >
                                            <Popup>{item.name_spatial}</Popup>
                                        </Marker>
                                    )}

                                    {/* Render Polygon */}
                                    {item.area && item.area.coordinates && (
                                        <Polygon
                                            positions={item.area.coordinates[0].map(
                                                (coord) => [coord[1], coord[0]]
                                            )}
                                            color="blue"
                                        />
                                    )}

                                    {/* Render Polyline */}
                                    {item.line && item.line.coordinates && (
                                        <Polyline
                                            positions={item.line.coordinates.map(
                                                (coord) => [coord[1], coord[0]]
                                            )}
                                            color="red"
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </MapContainer>
                    </div>
                </div>

                {/* Data Panel */}
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-4 bg-white border-b border-gray-200 sm:p-6">
                        <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:justify-between sm:items-center">
                            <h2 className="text-xl font-semibold text-black">
                                Daftar Data Spasial
                            </h2>
                            <div className="flex gap-2">
                                <a
                                    href="/download-pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white bg-green-500 rounded sm:w-auto hover:bg-green-600"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Export PDF
                                </a>
                                {can.create && (
                                    <button
                                        onClick={() =>
                                            router.get("/spatial-data/create")
                                        }
                                        className="w-full px-4 py-2 text-white bg-blue-500 rounded sm:w-auto hover:bg-blue-600"
                                    >
                                        Tambah Data
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Mobile View - Cards */}
                        <div className="md:hidden">
                            {spatialData.data?.map((item) => (
                                <DataCard key={item.id} item={item} />
                            ))}
                        </div>

                        {/* Desktop View - Table */}
                        <div className="hidden md:block">
                            <div className="w-full max-w-full overflow-x-auto">
                                <table
                                    className="w-full divide-y divide-gray-200"
                                    style={{ minWidth: "100%" }}
                                >
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider whitespace-nowrap">
                                                Nama
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider whitespace-nowrap">
                                                Desa
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider whitespace-nowrap">
                                                Kecamatan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider whitespace-nowrap">
                                                Kategori
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider whitespace-nowrap">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {spatialData.data?.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-gray-50 text-black"
                                                onMouseEnter={() =>
                                                    setActiveData(item)
                                                }
                                                onMouseLeave={() =>
                                                    setActiveData(null)
                                                }
                                            >
                                                <td className="px-6 py-4 whitespace-normal max-w-[200px]">
                                                    {item.name_spatial}
                                                </td>
                                                <td className="px-6 py-4 whitespace-normal">
                                                    {item.village?.name_village}
                                                </td>
                                                <td className="px-6 py-4 whitespace-normal">
                                                    {
                                                        item.subdistrict
                                                            ?.name_subdistrict
                                                    }
                                                </td>
                                                <td className="px-6 py-4 whitespace-normal">
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
            </div>
        </MainLayout>
    );
}