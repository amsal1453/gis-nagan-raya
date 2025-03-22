// Buat file terpisah: PrintableSpatialData.jsx
import React, { useEffect, useState } from "react";

const PrintableSpatialData = React.forwardRef(({ data }, ref) => {
    const [isReady, setIsReady] = useState(false);

    // Pastikan komponen ini siap saat data tersedia
    useEffect(() => {
        if (data && data.length > 0) {
            setIsReady(true);
        }
    }, [data]);

    if (!isReady) {
        return <div ref={ref}>Loading data...</div>;
    }

    return (
        <div
            ref={ref}
            className="p-4"
            style={{ width: "100%", maxWidth: "1000px" }}
        >
            <div style={{ textAlign: "center", marginBottom: "25px" }}>
                <h1
                    style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        margin: "5px 0",
                    }}
                >
                    LAPORAN DATA SPASIAL
                </h1>
                <h2 style={{ fontSize: "18px", margin: "5px 0" }}>
                    SISTEM INFORMASI GEOGRAFIS NAGAN RAYA
                </h2>
                <p style={{ fontSize: "14px", margin: "5px 0" }}>
                    Tanggal:{" "}
                    {new Date().toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            </div>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginBottom: "20px",
                    fontSize: "12px",
                }}
            >
                <thead>
                    <tr>
                        <th
                            style={{
                                border: "1.5px solid #000",
                                padding: "10px 8px",
                                backgroundColor: "#f0f0f0",
                                fontWeight: "bold",
                            }}
                        >
                            No
                        </th>
                        <th
                            style={{
                                border: "1.5px solid #000",
                                padding: "10px 8px",
                                backgroundColor: "#f0f0f0",
                                fontWeight: "bold",
                                width: "25%",
                            }}
                        >
                            Nama
                        </th>
                        <th
                            style={{
                                border: "1.5px solid #000",
                                padding: "10px 8px",
                                backgroundColor: "#f0f0f0",
                                fontWeight: "bold",
                                width: "20%",
                            }}
                        >
                            Desa
                        </th>
                        <th
                            style={{
                                border: "1.5px solid #000",
                                padding: "10px 8px",
                                backgroundColor: "#f0f0f0",
                                fontWeight: "bold",
                                width: "20%",
                            }}
                        >
                            Kecamatan
                        </th>
                        <th
                            style={{
                                border: "1.5px solid #000",
                                padding: "10px 8px",
                                backgroundColor: "#f0f0f0",
                                fontWeight: "bold",
                                width: "25%",
                            }}
                        >
                            Kategori
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((item, index) => (
                            <tr key={item.id}>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "8px",
                                        textAlign: "center",
                                    }}
                                >
                                    {index + 1}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "8px",
                                    }}
                                >
                                    {item.name_spatial}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "8px",
                                    }}
                                >
                                    {item.village?.name_village || "-"}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "8px",
                                    }}
                                >
                                    {item.subdistrict?.name_subdistrict || "-"}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #000",
                                        padding: "8px",
                                    }}
                                >
                                    {item.categories &&
                                    item.categories.length > 0
                                        ? item.categories
                                              .map((cat) => cat.name_category)
                                              .join(", ")
                                        : "-"}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <div
                style={{
                    marginTop: "40px",
                    fontSize: "14px",
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <div style={{ textAlign: "center", width: "200px" }}>
                    <p>Nagan Raya, {new Date().toLocaleDateString("id-ID")}</p>
                    <p style={{ marginTop: "70px", fontWeight: "bold" }}>
                        Petugas
                    </p>
                </div>
            </div>

            <div
                style={{
                    position: "fixed",
                    bottom: "20px",
                    left: "20px",
                    fontSize: "10px",
                    color: "#666",
                }}
            >
                <p>Dicetak dari Sistem Informasi Geografis Nagan Raya</p>
            </div>
        </div>
    );
});

export default PrintableSpatialData;
