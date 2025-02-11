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

const customIcon = new Icon({
    iconUrl: "/markers/marker-icon.png",
    iconRetinaUrl: "/markers/marker-icon-2x.png",
    shadowUrl: "/markers/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

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

    // Filter the spatial data based on current filters
    const filteredData = spatialData.filter((item) => {
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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="container mx-auto px-4 py-8 ">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Peta Data Spasial</h2>

                {/* Filter Panel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

                {/* Map Container */}
                <div className="h-[500px] relative rounded-lg overflow-hidden">
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

                        {filteredData.map((item) => (
                            <React.Fragment key={item.id}>
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

            {/* Data List */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Daftar Data Spasial</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b">Nama</th>
                                <th className="px-6 py-3 border-b">Desa</th>
                                <th className="px-6 py-3 border-b">
                                    Kecamatan
                                </th>
                                <th className="px-6 py-3 border-b">Kategori</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
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
                                            ?.map((cat) => cat.name_category)
                                            .join(", ")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
