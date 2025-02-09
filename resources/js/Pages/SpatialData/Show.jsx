import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    MapContainer,
    TileLayer,
    Marker,
    Polygon,
    Polyline,
    Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
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

export default function Show({ spatialData }) {
    const breadcrumbsPath = [
        { label: "Spatial Data", link: "/spatial-data" },
        { label: "Detail" },
    ];

    return (
        <MainLayout>
            <Head title={`Detail - ${spatialData.name_spatial}`} />

            <div className="p-4 mb-6 text-white rounded-md shadow-md bg-primary">
                <Breadcrumbs items={breadcrumbsPath} />
            </div>

            {/* Map Panel */}
            <div className="p-4 mb-6 bg-primary rounded-lg shadow">
                <div className="h-[500px]">
                    <MapContainer
                        center={[4.1416, 96.5096]}
                        zoom={15}
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

                        {/* Render Point */}
                        {spatialData.location && (
                            <Marker
                                position={[
                                    spatialData.location.coordinates[1],
                                    spatialData.location.coordinates[0],
                                ]}
                                icon={customIcon}
                            >
                                <Popup>
                                    <div>
                                        <h3 className="font-bold">
                                            {spatialData.name_spatial}
                                        </h3>
                                    </div>
                                </Popup>
                            </Marker>
                        )}

                        {/* Render Polygon */}
                        {spatialData.area && (
                            <Polygon
                                positions={spatialData.area.coordinates[0].map(
                                    (coord) => [coord[1], coord[0]]
                                )}
                                pathOptions={{ color: "blue" }}
                            >
                                <Popup>
                                    <div>
                                        <h3 className="font-bold">
                                            {spatialData.name_spatial}
                                        </h3>
                                    </div>
                                </Popup>
                            </Polygon>
                        )}

                        {/* Render Line */}
                        {spatialData.line && (
                            <Polyline
                                positions={spatialData.line.coordinates.map(
                                    (coord) => [coord[1], coord[0]]
                                )}
                                pathOptions={{ color: "red" }}
                            >
                                <Popup>
                                    <div>
                                        <h3 className="font-bold">
                                            {spatialData.name_spatial}
                                        </h3>
                                    </div>
                                </Popup>
                            </Polyline>
                        )}
                    </MapContainer>
                </div>
            </div>

            {/* Detail Information Panel */}
            <div className="p-6 bg-primary rounded-lg shadow text-white">
                <h2 className="mb-6 text-2xl font-bold">Informasi Detail</h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">
                            Data Umum
                        </h3>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-3 gap-4">
                                <label className="font-medium text-gray-200">
                                    Nama:
                                </label>
                                <p className="text-white col-span-2">
                                    {spatialData.name_spatial}
                                </p>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <label className="font-medium text-gray-200">
                                    Desa:
                                </label>
                                <p className="text-white col-span-2">
                                    {spatialData.village?.name_village}
                                </p>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <label className="font-medium text-gray-200">
                                    Kecamatan:
                                </label>
                                <p className="text-white col-span-2">
                                    {spatialData.subdistrict?.name_subdistrict}
                                </p>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <label className="font-medium text-gray-200">
                                    Kategori:
                                </label>
                                <p className="text-white col-span-2">
                                    {spatialData.categories
                                        ?.map((cat) => cat.name_category)
                                        .join(", ")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">
                            Deskripsi
                        </h3>
                        <p className="text-gray-100">
                            {spatialData.description || "Tidak ada deskripsi"}
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <button
                        onClick={() => window.history.back()}
                        className="px-4 py-2 text-primary bg-white rounded hover:bg-gray-100"
                    >
                        Kembali
                    </button>
                </div>
            </div>
        </MainLayout>
    );
}
