import React from 'react'

const Navbar = () => {
    return (
        <nav className='fixed top-0 left-0 z-10 w-full py-5 bg-primary'>
            <div className='container flex items-center justify-between mx-auto '>
                <div className='flex items-center space-x-4'>
                <img src='/lambang.png' alt='Logo' className='w-14 ' />
                <h2 className='text-[#ffff] font-bold text-2xl'>Kecamatan Tadu Raya - Nagan Raya</h2>
                    
                </div>
            </div>
        </nav>
    )
}

export default Navbar
