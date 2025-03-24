import React, { useState, useMemo } from "react";
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
import { divIcon } from "leaflet";

// Village colors definition remains the same
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

// Add this after VILLAGE_COLORS definition
const CATEGORY_COLORS = {
    default: "#FF0000", // Default red color
    colors: {
        // Will be populated based on categories
    }
};

// Tambahkan definisi marker icons berdasarkan kategori
const CATEGORY_MARKERS = {
    default: {
        color: "#FF0000",
        icon: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="32">
                <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
            </svg>`,
    },
    // Contoh marker untuk beberapa kategori
    sekolah: {
        color: "#4CAF50",
        icon: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="32">
                <path d="M12 3L1 9l11 6l9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
            </svg>`,
    },
    kesehatan: {
        color: "#2196F3",
        icon: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="32">
                <path d="M18 14h-4v4h-4v-4H6v-4h4V6h4v4h4m1-9H5c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2z"/>
            </svg>`,
    },
    masjid: {
        color: "#FFC107",
        icon: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="32">
                <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2zm0 3l6 6v1h-1v6h-2v-6h-6v6H7v-6H6v-1l6-6z"/>
            </svg>`,
    },
};

// Modifikasi fungsi createSVGMarker untuk menerima kategori
const createSVGMarker = (category, color) => {
    const markerConfig =
        CATEGORY_MARKERS[category?.toLowerCase()] || CATEGORY_MARKERS.default;
    const markerColor = color || markerConfig.color;

    const svgString = markerConfig.icon.replace(
        "/>",
        `fill="${markerColor}"
         stroke="#FFFFFF"
         stroke-width="20"
        />`
    );

    return divIcon({
        html: svgString,
        className: "",
        iconSize: [24, 32],
        iconAnchor: [12, 32],
        popupAnchor: [0, -32],
    });
};

const getColorByVillageId = (villageId) => {
    if (!villageId) return VILLAGE_COLORS.default;
    const index = parseInt(villageId) % VILLAGE_COLORS.colors.length;
    return VILLAGE_COLORS.colors[index];
};

// Add this function to get color by category
const getColorByCategory = (categoryId, categories) => {
    if (!categoryId) return CATEGORY_COLORS.default;

    // Check if color exists in cache
    if (CATEGORY_COLORS.colors[categoryId]) {
        return CATEGORY_COLORS.colors[categoryId];
    }

    // If not, assign a new color
    const categoryIndex = categories.findIndex(
        (cat) => cat.id === parseInt(categoryId)
    );
    if (categoryIndex === -1) return CATEGORY_COLORS.default;

    const colorIndex = categoryIndex % VILLAGE_COLORS.colors.length;
    const color = VILLAGE_COLORS.colors[colorIndex];

    // Cache the color for future use
    CATEGORY_COLORS.colors[categoryId] = color;

    return color;
};

// Modifikasi komponen MapLegend untuk menampilkan legenda kategori dan desa
const MapLegend = ({ categories, villages }) => {
    return (
        <div className="absolute bottom-4 right-4 z-[1000] bg-white p-2 rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
            {/* Legenda Kategori */}
            <div className="mb-4">
                <div className="text-sm font-bold mb-2 text-black border-b pb-1">
                    Legenda Kategori
                </div>
                <div className="space-y-1">
                    {categories.map((category) => {
                        const categoryColor = getColorByCategory(
                            category.id,
                            categories
                        );
                        const markerIcon = createSVGMarker(
                            category.name_category,
                            categoryColor
                        );
                        return (
                            <div
                                key={category.id}
                                className="flex items-center gap-2"
                            >
                                <div
                                    className="w-6 h-6 flex items-center justify-center"
                                    dangerouslySetInnerHTML={{
                                        __html: markerIcon.options.html,
                                    }}
                                />
                                <span className="text-xs text-black">
                                    {category.name_category}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Legenda Desa */}
            <div>
                <div className="text-sm font-bold mb-2 text-black border-b pb-1">
                    Legenda Desa
                </div>
                <div className="space-y-1">
                    {villages?.map((village) => {
                        const villageColor = getColorByVillageId(village.id);
                        return (
                            <div
                                key={village.id}
                                className="flex items-center gap-2"
                            >
                                <div
                                    className="w-4 h-4 rounded"
                                    style={{
                                        backgroundColor: villageColor,
                                        opacity: 0.4,
                                        border: `2px solid ${villageColor}`,
                                    }}
                                />
                                <span className="text-xs text-black">
                                    {village.name_village}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default function PublicSpatialMap({
    spatialData,
    villages,
    subdistricts,
    categories,
}) {
    console.log('subdistricts', subdistricts);
    const [filterValues, setFilterValues] = useState({
        search: "",
        village_id: "",
        category: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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

    // Mobile card view component for table data
    const MobileCardView = ({ item }) => (
        <div className="bg-white p-4 rounded-lg shadow mb-4 border border-gray-200">
            <div className="space-y-2">
                <div>
                    <span className="font-semibold">Nama:</span>
                    <p>{item.name_spatial}</p>
                </div>
                <div>
                    <span className="font-semibold">Desa:</span>
                    <p>{item.village?.name_village}</p>
                </div>
                <div>
                    <span className="font-semibold">Kecamatan:</span>
                    <p>{item.subdistrict?.name_subdistrict}</p>
                </div>
                <div>
                    <span className="font-semibold">Kategori:</span>
                    <p>
                        {item.categories
                            ?.map((cat) => cat.name_category)
                            .join(", ")}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <section
            id="spatial-data"
            className="bg-primary py-8 md:py-12 lg:py-16"
        >
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Filter Panel */}
                <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 text-black">
                        Peta Data Spasial
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
                        <input
                            type="text"
                            name="search"
                            value={filterValues.search}
                            onChange={handleFilterChange}
                            placeholder="Cari data spasial..."
                            className=" text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                        />

                        <select
                            name="village_id"
                            value={filterValues.village_id}
                            onChange={handleFilterChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base text-black"
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
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base text-black"
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
                    <div className="h-[300px] sm:h-[400px] md:h-[500px] relative rounded-lg overflow-hidden">
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

                            {/* Render Subdistrict Boundaries */}
                            {subdistricts?.map((subdistrict) => {
                                if (subdistrict.boundary_subdistrict) {
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
                                if (village.boundary_village) {
                                    const villageColor = getColorByVillageId(
                                        village.id
                                    );
                                    const geoJsonData =
                                        typeof village.boundary_village ===
                                        "string"
                                            ? JSON.parse(
                                                  village.boundary_village
                                              )
                                            : village.boundary_village;

                                    return (
                                        <GeoJSON
                                            key={village.id}
                                            data={geoJsonData}
                                            style={{
                                                fillColor: villageColor,
                                                weight: 0,
                                                opacity: 1,
                                                color: villageColor,
                                                fillOpacity: 0.4,
                                            }}
                                            onEachFeature={(feature, layer) => {
                                                layer.bindPopup(
                                                    village.name_village
                                                );
                                            }}
                                        />
                                    );
                                }
                                return null;
                            })}

                            {filteredData.map((item) => {
                                const categoryColor =
                                    item.categories &&
                                    item.categories.length > 0
                                        ? getColorByCategory(
                                              item.categories[0].id,
                                              categories
                                          )
                                        : CATEGORY_COLORS.default;

                                const categoryName =
                                    item.categories &&
                                    item.categories.length > 0
                                        ? item.categories[0].name_category
                                        : null;

                                const markerIcon = createSVGMarker(
                                    categoryName,
                                    categoryColor
                                );

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
                                                    color: categoryColor,
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
                                                    color: categoryColor,
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

                            {/* Add the legend component */}
                            <MapLegend
                                categories={categories}
                                villages={villages}
                            />
                        </MapContainer>
                    </div>
                </div>

                {/* Data List with Responsive Table */}
                <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 text-black">
                        Daftar Data Spasial
                    </h2>

                    {/* Mobile View (Card Layout) */}
                    <div className="md:hidden">
                        {paginatedData.map((item) => (
                            <MobileCardView key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Desktop View (Table Layout) */}
                    <div className="hidden md:block overflow-x-auto">
                        <div className="inline-block min-w-full align-middle">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                                        >
                                            Nama
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                                        >
                                            Desa
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                                        >
                                            Kecamatan
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                                        >
                                            Kategori
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedData.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                                {item.name_spatial}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                                {item.village?.name_village}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                                {
                                                    item.subdistrict
                                                        ?.name_subdistrict
                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-normal text-sm text-black">
                                                {item.categories
                                                    ?.map(
                                                        (cat) =>
                                                            cat.name_category
                                                    )
                                                    .join(", ")}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination Controls */}
                    <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
                        <div className="text-sm text-black text-center sm:text-left">
                            Menampilkan {(currentPage - 1) * itemsPerPage + 1}{" "}
                            sampai{" "}
                            {Math.min(
                                currentPage * itemsPerPage,
                                filteredData.length
                            )}{" "}
                            dari {filteredData.length} data
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                            <button
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                className={`px-3 py-1 rounded text-sm ${
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
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-3 py-1 rounded text-sm ${
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
                                className={`px-3 py-1 rounded text-sm ${
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
        </section>
    );
}