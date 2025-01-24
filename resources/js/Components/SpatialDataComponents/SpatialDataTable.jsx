import { Link } from '@inertiajs/react';
import React from 'react';


const SpatialDataTable = ({ data, onDelete, userRole }) => {
    return (
        <div className="bg-white rounded-lg shadow">
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Village</th>
                        <th className="p-3 text-left">Categories</th>
                        <th className="p-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">{item.name_spatial}</td>
                            <td className="p-3">{item.village?.name}</td>
                            <td className="p-3">
                                {item.categories?.map(cat => cat.name).join(', ')}
                            </td>
                            <td className="p-3 text-right">
                                <div className="flex justify-end space-x-2">
                                    <Link 
                                        href={route('spatial-data.edit', item.id)} 
                                        className="text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <button 
                                        onClick={() => onDelete(item.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                    No spatial data found
                </div>
            )}
        </div>
    );
};

export default SpatialDataTable;