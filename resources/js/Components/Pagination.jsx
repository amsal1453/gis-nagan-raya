import { Inertia } from '@inertiajs/inertia';
import React from 'react';

export default function Pagination({ links, className = '' }) {
    return (
        <div className={`flex items-center justify-between ${className}`}>
            <div className="flex gap-1">
                {links.map((link, index) => (
                    <button
                        key={index}
                        onClick={() => Inertia.get(link.url)}
                        className={`px-3 py-1 rounded ${
                            link.active
                                ? 'bg-primary text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                        } ${
                            !link.url ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={!link.url}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
}
