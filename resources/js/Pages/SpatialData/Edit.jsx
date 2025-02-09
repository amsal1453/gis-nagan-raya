import React, { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    MapContainer,
    TileLayer,
    Marker,
    FeatureGroup,
    Polygon,
    Polyline,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { Icon } from "leaflet";
import Breadcrumbs from "@/Components/Breadcrumbs";

// Custom icon definition
const customIcon = new Icon({
    iconUrl: "/markers/marker-icon.png",
    iconRetinaUrl: "/markers/marker-icon-2x.png",
    shadowUrl: "/markers/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

export default function Edit({
    spatialData,
    villages,
    categories,
    subdistricts,
}) {
    const { data, setData, put, processing, errors } = useForm({
        subdistrict_id: spatialData.subdistrict_id,
        village_id: spatialData.village_id,
        name_spatial: spatialData.name_spatial,
        description: spatialData.description,
        categories: spatialData.categories.map((cat) => cat.id),
        location: spatialData.location
            ? JSON.stringify(spatialData.location)
            : null,
        area: spatialData.area ? JSON.stringify(spatialData.area) : null,
        line: spatialData.line ? JSON.stringify(spatialData.line) : null,
    });

    useEffect(() => {
        // Set initial geometry data
        if (spatialData.location) {
            setData("location", JSON.stringify(spatialData.location));
        }
        if (spatialData.area) {
            setData("area", JSON.stringify(spatialData.area));
        }
        if (spatialData.line) {
            setData("line", JSON.stringify(spatialData.line));
        }
    }, [spatialData]);

    const handleCreated = (e) => {
        const layer = e.layer;
        const geoJSON = layer.toGeoJSON();
        const geometry = geoJSON.geometry;

        // Reset geometry values
        setData((prevData) => ({
            ...prevData,
            location: null,
            area: null,
            line: null,
        }));

        // Set geometry based on type
        switch (geometry.type) {
            case "Point":
                setData("location", JSON.stringify(geometry));
                break;
            case "Polygon":
                setData("area", JSON.stringify(geometry));
                break;
            case "LineString":
                setData("line", JSON.stringify(geometry));
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("spatial-data.update", spatialData.id));
    };

    const breadCrumbsPath = [
        { label: "Spatial Data", link: "/spatial-data" },
        { label: "Edit" },
    ];

    return (
        <MainLayout>
            <Head title="Edit Data Spasial" />

            <div className="p-4 mb-6 text-white rounded-md shadow-md bg-primary">
                <Breadcrumbs items={breadCrumbsPath} />
            </div>

            {/* Map Panel */}
            <div className="p-4 mb-6 bg-primary rounded-lg shadow">
                <div className="h-[600px]">
                    <MapContainer
                        center={[4.1416, 96.5096]}
                        zoom={13}
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
                        <FeatureGroup>
                            <EditControl
                                position="topright"
                                onCreated={handleCreated}
                                draw={{
                                    rectangle: false,
                                    circle: false,
                                    circlemarker: false,
                                    marker: true,
                                    polyline: true,
                                    polygon: true,
                                }}
                            />
                            {/* Render existing geometries */}
                            {spatialData.location && (
                                <Marker
                                    position={[
                                        spatialData.location.coordinates[1],
                                        spatialData.location.coordinates[0],
                                    ]}
                                    icon={customIcon}
                                />
                            )}
                            {spatialData.area && (
                                <Polygon
                                    positions={spatialData.area.coordinates[0].map(
                                        (coord) => [coord[1], coord[0]]
                                    )}
                                    pathOptions={{ color: "blue" }}
                                />
                            )}
                            {spatialData.line && (
                                <Polyline
                                    positions={spatialData.line.coordinates.map(
                                        (coord) => [coord[1], coord[0]]
                                    )}
                                    pathOptions={{ color: "red" }}
                                />
                            )}
                        </FeatureGroup>
                    </MapContainer>
                </div>
                <p className="mt-2 text-sm text-gray-100">
                    * Gunakan tools di sebelah kanan peta untuk mengedit titik,
                    garis, atau area
                </p>
            </div>

            {/* Form Panel */}
            <div className="p-6 bg-primary rounded-lg shadow">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="mb-4">
                            <label className="block mb-2 text-slate-100">
                                Nama Data Spasial
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded text-black"
                                value={data.name_spatial}
                                onChange={(e) =>
                                    setData("name_spatial", e.target.value)
                                }
                            />
                            {errors.name_spatial && (
                                <div className="text-red-500">
                                    {errors.name_spatial}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-slate-100">
                                Kecamatan
                            </label>
                            <select
                                className="w-full px-3 py-2 border rounded"
                                value={data.subdistrict_id}
                                onChange={(e) =>
                                    setData("subdistrict_id", e.target.value)
                                }
                            >
                                <option value="">Pilih Kecamatan</option>
                                {subdistricts.map((subdistrict) => (
                                    <option
                                        key={subdistrict.id}
                                        value={subdistrict.id}
                                    >
                                        {subdistrict.name_subdistrict}
                                    </option>
                                ))}
                            </select>
                            {errors.subdistrict_id && (
                                <div className="text-red-500">
                                    {errors.subdistrict_id}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-slate-100">
                                Desa
                            </label>
                            <select
                                className="w-full px-3 py-2 border rounded"
                                value={data.village_id}
                                onChange={(e) =>
                                    setData("village_id", e.target.value)
                                }
                            >
                                <option value="">Pilih Desa</option>
                                {villages.map((village) => (
                                    <option key={village.id} value={village.id}>
                                        {village.name_village}
                                    </option>
                                ))}
                            </select>

                            {errors.village_id && (
                                <div className="text-red-500">
                                    {errors.village_id}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-slate-100">
                                Kategori
                            </label>
                            <select
                                className="w-full px-3 py-2 border rounded"
                                multiple={false}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setData(
                                        "categories",
                                        value ? [parseInt(value)] : []
                                    );
                                }}
                            >
                                <option value="">Pilih Kategori</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name_category}
                                    </option>
                                ))}
                            </select>
                            {errors.categories && (
                                <div className="text-red-500">
                                    {errors.categories}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-slate-100">
                            Deskripsi
                        </label>
                        <textarea
                            className="w-full px-3 py-2 border rounded"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            rows="4"
                        />
                        {errors.description && (
                            <div className="text-red-500">
                                {errors.description}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            {processing ? "Menyimpan..." : "Simpan"}
                        </button>
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
