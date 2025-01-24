// resources/js/Pages/SpatialData/Components/FilterBar.jsx
import React from 'react';

const FilterBar = ({ 
    villages, 
    categories, 
    filters, 
    onFilterChange, 
    userRole 
}) => {
    return (
        <div className="p-4 mb-4 bg-gray-100 rounded-lg">
            <div className="flex flex-wrap items-center gap-4">
                {/* Search Input */}
                <div className="flex-grow">
                    <input 
                        type="text" 
                        placeholder="Search spatial data..." 
                        value={filters.search || ''}
                        onChange={(e) => onFilterChange({ search: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Village Filter (for admin kecamatan) */}
                {userRole === 'admin_kecamatan' && villages.length > 0 && (
                    <div>
                        <select
                            value={filters.village_id || ''}
                            onChange={(e) => onFilterChange({ village_id: e.target.value })}
                            className="p-2 border rounded"
                        >
                            <option value="">All Villages</option>
                            {villages.map(village => (
                                <option 
                                    key={village.id} 
                                    value={village.id}
                                >
                                    {village.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Category Filter */}
                {categories.length > 0 && (
                    <div>
                        <select
                            value={filters.category_id || ''}
                            onChange={(e) => onFilterChange({ category_id: e.target.value })}
                            className="p-2 border rounded"
                        >
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option 
                                    key={category.id} 
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterBar;