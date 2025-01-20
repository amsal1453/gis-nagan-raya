import Breadcrumbs from '@/Components/Breadcrumbs'
import MainLayout from '@/Layouts/MainLayout'
import { Inertia } from '@inertiajs/inertia'
import { Head, Link } from '@inertiajs/react'
import React, { useState } from 'react'

const Index = ({ auth, users, roles }) => {
    const breadCrumbsPath = [
        { label: 'User', link: '/users' },
        { label: 'List' }
    ]

    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('');

    const filteredUsers = users.filter(user => {
        const matchSearch = search === '' ||
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());

        const matchRole = roleFilter === '' || user.role === roleFilter;

        return matchSearch && matchRole;
    });

    return (
        <MainLayout>
            <Head title='users' />
            <div className='p-4 mb-4 text-white rounded-md shadow bg-primary '>
                <Breadcrumbs items={breadCrumbsPath} />
            </div>

            <div className="overflow-hidden shadow-sm bg-primary sm:rounded-lg">
                <div className="p-6">
                    {/* Search and Filter Controls */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Cari user..."
                                className="w-full px-4 py-2 border rounded-lg"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="w-48">
                            <select
                                className="w-full px-4 py-2 border rounded-lg"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                            >
                                <option value="">Semua Role</option>
                                {roles.map(role => (
                                    <option key={role.id} value={role.name}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <Link
                                href={route('users.create')}
                                className="inline-block px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                            >
                                Tambah User
                            </Link>
                        </div>
                    </div>

                    {/* Users Table */}
                    <div className="overflow-x-auto">
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
                                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.map(user => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                                        ${user.role === 'admin_kecamatan' ? 'bg-green-100 text-green-800' :
                                                    user.role === 'admin_desa' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-gray-100 text-gray-800'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {user.village ? user.village.name : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                            <Link
                                                href={route('users.edit', user.id)}
                                                className="mr-4 text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </MainLayout>
    )
}

export default Index
