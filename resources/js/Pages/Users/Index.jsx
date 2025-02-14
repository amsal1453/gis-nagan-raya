import Breadcrumbs from "@/Components/Breadcrumbs";
import MainLayout from "@/Layouts/MainLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";

const Index = ({ users, roles }) => {
    const breadCrumbsPath = [
        { label: "User", link: "/users" },
        { label: "List" },
    ];

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");

    const filteredUsers = users.filter((user) => {
        const matchSearch =
            search === "" ||
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());

        const matchRole = roleFilter === "" || user.role === roleFilter;

        return matchSearch && matchRole;
    });

    const handleDelete = (id) => {
        if (confirm("apakah anda yakin menghapus user ini ?")) {
            Inertia.delete(route("users.destroy", id), {
                onSuccess: () => alert("user berhasil di hapus"),
            });
        }
    };

    // Card component for mobile view
    const UserCard = ({ user }) => (
        <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
            <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full
                        ${
                            user.role === "admin_kecamatan"
                                ? "bg-green-100 text-green-800"
                                : user.role === "admin_desa"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                    >
                        {user.role}
                    </span>
                </div>
                <div className="text-sm text-gray-600">
                    <p>Email: {user.email}</p>
                    <p>Desa: {user.village ? user.village.name : "-"}</p>
                </div>
                <div className="flex justify-end space-x-3 pt-2 border-t">
                    <Link
                        href={route("users.edit", user.id)}
                        className="px-3 py-1 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <MainLayout>
            <Head title="users" />
            <div className="p-4 mb-4 text-white rounded-md shadow bg-primary">
                <Breadcrumbs items={breadCrumbsPath} />
            </div>

            <div className="overflow-hidden bg-primary shadow-sm sm:rounded-lg">
                <div className="p-4 sm:p-6">
                    {/* Responsive Search and Filter Controls */}
                    <div className="space-y-4 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-4 mb-6">
                        <div className="w-full sm:flex-1">
                            <input
                                type="text"
                                placeholder="Cari user..."
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="w-full sm:w-48">
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                            >
                                <option value="">Semua Role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.name}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full sm:w-auto">
                            <Link
                                href={route("users.create")}
                                className="w-full sm:w-auto flex justify-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Tambah User
                            </Link>
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="block md:hidden">
                        {filteredUsers.length === 0 ? (
                            <p className="text-center py-4 text-gray-500">
                                Tidak ada user ditemukan
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {filteredUsers.map((user) => (
                                    <UserCard key={user.id} user={user} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:block">
                        <div className="overflow-x-auto rounded-lg">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden border border-gray-200 rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                    Nama
                                                </th>
                                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                    Email
                                                </th>
                                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                    Role
                                                </th>
                                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                    Desa
                                                </th>
                                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredUsers.length === 0 ? (
                                                <tr>
                                                    <td
                                                        colSpan="5"
                                                        className="px-6 py-4 text-center text-gray-500"
                                                    >
                                                        Tidak ada user ditemukan
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredUsers.map((user) => (
                                                    <tr
                                                        key={user.id}
                                                        className="hover:bg-gray-50"
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {user.name}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-500">
                                                                {user.email}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span
                                                                className={`px-2 py-1 text-xs font-semibold rounded-full
                                                                ${
                                                                    user.role ===
                                                                    "admin_kecamatan"
                                                                        ? "bg-green-100 text-green-800"
                                                                        : user.role ===
                                                                          "admin_desa"
                                                                        ? "bg-blue-100 text-blue-800"
                                                                        : "bg-gray-100 text-gray-800"
                                                                }`}
                                                            >
                                                                {user.role}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {user.village
                                                                ? user.village
                                                                      .name
                                                                : "-"}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                                            <div className="flex items-center justify-center space-x-4">
                                                                <Link
                                                                    href={route(
                                                                        "users.edit",
                                                                        user.id
                                                                    )}
                                                                    className="text-indigo-600 hover:text-indigo-900 hover:underline"
                                                                >
                                                                    Edit
                                                                </Link>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            user.id
                                                                        )
                                                                    }
                                                                    className="text-red-600 hover:text-red-900 hover:underline"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Index;
    