import React from 'react';


const Pagination = ({ data, onPageChange }) => {
    if (!data.links || data.last_page <= 1) return null;

    return (
        <div className="flex justify-center space-x-2">
            {data.links.map((link, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(link.label)}
                    className={`
                        px-4 py-2 rounded
                        ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200'}
                        ${link.url ? 'hover:bg-blue-600' : 'cursor-not-allowed opacity-50'}
                    `}
                    disabled={!link.url}
                >
                    {link.label}
                </button>
            ))}
        </div>
    );
};

export default Pagination;