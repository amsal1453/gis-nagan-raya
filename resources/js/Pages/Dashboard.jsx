import MainLayout from '@/Layouts/MainLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

const Dashboard = ({ auth }) => {

  return (
    <MainLayout>
        <Head title='dashboard'/>
          <div className='p-4 rounded-md shadow-md bg-primary'>
              <h1 className="flex flex-col text-2xl font-semibold text-center text-white capitalize">Hai {auth.user.name} <span>
            datang di sistem informasi geografis data spasial</span> desa kecamatan tadu raya</h1>
          </div>
    </MainLayout>
  )
}

export default Dashboard
