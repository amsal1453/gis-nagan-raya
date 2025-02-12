import React, { useState, useMemo } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polygon,
    Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { divIcon } from "leaflet";

// Definisi warna untuk desa
const VILLAGE_COLORS = {
    default: "#808080", // Abu-abu untuk default
    colors: [
        "#FF0000", // Merah
        "#00FF00", // Hijau
        "#0000FF", // Biru
        "#FFA500", // Oranye
        "#800080", // Ungu
        "#FF00FF", // Magenta
        "#008080", // Teal
    ],
};

// Fungsi untuk membuat SVG marker
const createSVGMarker = (color) => {
    const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="24">
            <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8z" 
                fill="${color}" 
                stroke="white" 
                stroke-width="1"
            />
        </svg>
    `;

    return divIcon({
        html: svgString,
        className: "",
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24],
    });
};

// Fungsi untuk mendapatkan warna berdasarkan ID desa
const getColorByVillageId = (villageId) => {
    if (!villageId) return VILLAGE_COLORS.default;
    const index = parseInt(villageId) % VILLAGE_COLORS.colors.length;
    return VILLAGE_COLORS.colors[index];
};

export default function PublicSpatialMap({
    spatialData,
    villages,
    categories,
}) {
    const [filterValues, setFilterValues] = useState({
        search: "",
        village_id: "",
        category: "",
    });

    // State untuk pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Memoize filtered data untuk performa
    const filteredData = useMemo(() => {
        return spatialData.filter((item) => {
            const matchesSearch =
                !filterValues.search ||
                item.name_spatial
                    .toLowerCase()
                    .includes(filterValues.search.toLowerCase());
            const matchesVillage =
                !filterValues.village_id ||
                item.village?.id.toString() === filterValues.village_id;
            const matchesCategory =
                !filterValues.category ||
                item.categories?.some(
                    (cat) => cat.id.toString() === filterValues.category
                );

            return matchesSearch && matchesVillage && matchesCategory;
        });
    }, [spatialData, filterValues]);

    // Hitung total halaman dan data yang akan ditampilkan
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterValues((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Reset halaman ke 1 ketika filter berubah
        setCurrentPage(1);
    };

    // Handler untuk perubahan halaman
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Render fungsi untuk popup content
    const renderPopupContent = (item) => (
        <div className="text-gray-800">
            <h3 className="font-bold">{item.name_spatial}</h3>
            <p>Desa: {item.village?.name_village}</p>
            <p>Kecamatan: {item.subdistrict?.name_subdistrict}</p>
            <p>Deskripsi: {item.description}</p>
            {item.categories && (
                <p>
                    Kategori:{" "}
                    {item.categories.map((cat) => cat.name_category).join(", ")}
                </p>
            )}
        </div>
    );

    return (
        <section id="spatial-data" className="bg-primary py-12 md:py-16 z-10">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full">
                {/* Filter Panel */}
                <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">
                        Peta Data Spasial
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
                        <input
                            type="text"
                            name="search"
                            value={filterValues.search}
                            onChange={handleFilterChange}
                            placeholder="Cari data spasial..."
                            className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
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

                    {/* Map Container */}
                    <div className="h-[500px] relative rounded-lg overflow-hidden z-10">
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

                            {filteredData.map((item) => {
                                const villageColor = getColorByVillageId(
                                    item.village?.id
                                );
                                const markerIcon =
                                    createSVGMarker(villageColor);

                                return (
                                    <React.Fragment key={item.id}>
                                        {item.location && (
                                            <Marker
                                                position={[
                                                    item.location
                                                        .coordinates[1],
                                                    item.location
                                                        .coordinates[0],
                                                ]}
                                                icon={markerIcon}
                                                eventHandlers={{
                                                    mouseover: (e) =>
                                                        e.target.openPopup(),
                                                    mouseout: (e) =>
                                                        e.target.closePopup(),
                                                }}
                                            >
                                                <Popup>
                                                    {renderPopupContent(item)}
                                                </Popup>
                                            </Marker>
                                        )}

                                        {item.area && (
                                            <Polygon
                                                positions={item.area.coordinates[0].map(
                                                    (coord) => [
                                                        coord[1],
                                                        coord[0],
                                                    ]
                                                )}
                                                pathOptions={{
                                                    color: villageColor,
                                                }}
                                                eventHandlers={{
                                                    mouseover: (e) =>
                                                        e.target.openPopup(),
                                                    mouseout: (e) =>
                                                        e.target.closePopup(),
                                                }}
                                            >
                                                <Popup>
                                                    {renderPopupContent(item)}
                                                </Popup>
                                            </Polygon>
                                        )}

                                        {item.line && (
                                            <Polyline
                                                positions={item.line.coordinates.map(
                                                    (coord) => [
                                                        coord[1],
                                                        coord[0],
                                                    ]
                                                )}
                                                pathOptions={{
                                                    color: villageColor,
                                                }}
                                                eventHandlers={{
                                                    mouseover: (e) =>
                                                        e.target.openPopup(),
                                                    mouseout: (e) =>
                                                        e.target.closePopup(),
                                                }}
                                            >
                                                <Popup>
                                                    {renderPopupContent(item)}
                                                </Popup>
                                            </Polyline>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </MapContainer>
                    </div>
                </div>

                {/* Data List dengan Pagination */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        Daftar Data Spasial
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b text-left">
                                        Nama
                                    </th>
                                    <th className="px-6 py-3 border-b text-left">
                                        Desa
                                    </th>
                                    <th className="px-6 py-3 border-b text-left">
                                        Kecamatan
                                    </th>
                                    <th className="px-6 py-3 border-b text-left">
                                        Kategori
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50"
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
                        <div className="flex items-center justify-between mt-4 px-4">
                            <div className="text-sm text-gray-700">
                                Menampilkan{" "}
                                {(currentPage - 1) * itemsPerPage + 1} sampai{" "}
                                {Math.min(
                                    currentPage * itemsPerPage,
                                    filteredData.length
                                )}{" "}
                                dari {filteredData.length} data
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 rounded ${
                                        currentPage === 1
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : "bg-blue-500 text-white hover:bg-blue-600"
                                    }`}
                                >
                                    Sebelumnya
                                </button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() =>
                                            handlePageChange(index + 1)
                                        }
                                        className={`px-3 py-1 rounded ${
                                            currentPage === index + 1
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-100 hover:bg-gray-200"
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-1 rounded ${
                                        currentPage === totalPages
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : "bg-blue-500 text-white hover:bg-blue-600"
                                    }`}
                                >
                                    Selanjutnya
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
