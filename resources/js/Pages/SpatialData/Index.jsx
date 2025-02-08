import Breadcrumbs from "@/Components/Breadcrumbs";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Index() {
    const breadcrumbsPath = [
        {
            label: "Spatial Data",
            link: "/spatial-data",
        },
        {
            label: "List",
        },
    ];
    return (
        <MainLayout>
            <Head title="Spatial Data" />
            <div className="p-4 bg-primary text-white rounded-md shadow-md">
                <Breadcrumbs items={breadcrumbsPath} />
            </div>
        </MainLayout>
    );
}
