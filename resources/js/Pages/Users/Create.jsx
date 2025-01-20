import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';

export default function Create({ auth, villages, roles }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
        village_id: ''
    });

    // Reset village_id when role changes
    useEffect(() => {
        if (data.role !== 'admin_desa') {
            setData('village_id', '');
        }
    }, [data.role]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('users.store'), {
            onSuccess: () => reset()
        });
    };

    console.log(villages)

    return (
        <MainLayout>
            <Head title="Tambah User" />


                    <div className="overflow-hidden shadow-sm bg-primary sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Nama */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-100">
                                        Nama
                                    </label>
                                    <input
                                        type="text"
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                    />
                                    {errors.name &&
                                        <div className="mt-1 text-sm text-red-500">{errors.name}</div>
                                    }
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-100">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                    />
                                    {errors.email &&
                                        <div className="mt-1 text-sm text-red-500">{errors.email}</div>
                                    }
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-100">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                    />
                                    {errors.password &&
                                        <div className="mt-1 text-sm text-red-500">{errors.password}</div>
                                    }
                                </div>

                                {/* Password Confirmation */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-100">
                                        Konfirmasi Password
                                    </label>
                                    <input
                                        type="password"
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                    />
                                </div>

                                {/* Role Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-100">
                                        Role
                                    </label>
                                    <select
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        value={data.role}
                                        onChange={e => setData('role', e.target.value)}
                                    >
                                        <option value="">Pilih Role</option>
                                        {roles.map(role => (
                                            <option key={role.id} value={role.name}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.role &&
                                        <div className="mt-1 text-sm text-red-500">{errors.role}</div>
                                    }
                                </div>

                                {/* Village Selection (Only shown for admin_desa) */}
                                {data.role === 'admin_desa' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-100">
                                            Desa
                                        </label>
                                        <select
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            value={data.village_id}
                                            onChange={e => setData('village_id', e.target.value)}
                                        >
                                            <option value="">Pilih Desa</option>
                                            {villages.map(village => (
                                                <option key={village.id} value={village.id}>
                                                    {village.name_village}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.village_id &&
                                            <div className="mt-1 text-sm text-red-500">{errors.village_id}</div>
                                        }
                                    </div>
                                )}

                                {/* Submit Button */}
                                <div className="flex items-center justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>


        </MainLayout>
    );
}
