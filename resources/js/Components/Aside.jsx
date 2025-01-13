import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { LIST_ASIDE } from '@/Constants/ListAside';

const Aside = () => {
    const { auth } = usePage().props;
    const userRole = auth?.roles?.[0] || '';
    console.log('Current User Role:', userRole);

    const filteredMenu = LIST_ASIDE.filter(item => {
        const hasPermission = item.permission.includes(userRole);
       
        return hasPermission;
    });

 

    
    return (
        <aside className='relative top-0 left-0 w-1/5 min-h-full bg-primary'>
            <div className='absolute left-0 flex items-center justify-center w-full h-16 text-center top-5 bg-primary'>
                <h1 className='text-2xl font-bold text-black bg-[#ffff] w-full'>MAIN NAVIGATION</h1>
            </div>
            <div className='flex flex-col items-center w-full mt-20'> {/* Tambahkan margin-top agar daftar tidak menutupi judul */}
                <ul className="w-full">
                    {filteredMenu.map((item, index) => (
                        <li key={index} className="w-full mb-4 text-lg font-bold text-white">
                            {item.title === 'Logout' ? (
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="flex items-center w-full px-4 py-2 transition duration-200 hover:bg-[#ffff] hover:text-black hover:rounded"
                                >
                                    {item.title}
                                </Link>
                            ) : (
                                <Link
                                    href={route(item.route)}
                                    className="flex items-center px-4 py-2 transition duration-200 hover:bg-[#ffff] hover:text-black hover:rounded"
                                >
                                    <item.icon size={20} className="mr-2" /> {item.title}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>

            </div>
        </aside>
    );
};

export default Aside;
