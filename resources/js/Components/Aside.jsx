import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { LIST_ASIDE } from '@/Constants/ListAside';
import { IoLogOutSharp } from 'react-icons/io5';

const Aside = () => {
    const { auth } = usePage().props;
    const userRole = auth?.roles?.[0] || '';

    const filteredMenu = LIST_ASIDE.filter(item => {
        const hasPermission = item.permission.includes(userRole);
        return hasPermission;
    });

    return (
        <aside className='fixed top-0 left-0  h-screen bg-primary overflow-y-auto mt-16   w-full'>
            <div className='mt-10   bg-[#ffff]' > 
                <h1 className='text-xl font-semibold text-black pl-8 '>MAIN NAVIGATION</h1>
            </div>
            <div className='flex flex-col items-center w-full mt-5'>
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
                                   <IoLogOutSharp size={20} className='mr-2'/> {item.title}
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