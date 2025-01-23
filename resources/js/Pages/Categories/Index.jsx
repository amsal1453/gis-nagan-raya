import Breadcrumbs from '@/Components/Breadcrumbs'
import MainLayout from '@/Layouts/MainLayout'
import EachUtils from '@/Utils/EachUtils'
import { Inertia } from '@inertiajs/inertia'
import { Head, Link } from '@inertiajs/react'
import React from 'react'

const Index = ({ categories }) => {
    const breadCrumbsPath =[
        {label: 'Categories' , link: '/categories'},
        {label: 'List'}
    ]
    
    const handleDelete = (id) => {
        if(confirm('Apakah anda yakin menghapus category ini ?')){
            Inertia.delete(route('categories.destroy', id), {
                onSuccess: () => alert('category berhasil di hapus')
            })
        }
    }
    
  return (
    <MainLayout> 
        <Head title='categories'/>
        <div className='p-4 mb-6 text-white rounded-md shadow-md bg-primary'>
            <Breadcrumbs items={breadCrumbsPath}/>
        </div>
        <div className='overflow-hidden shadow-sm bg-primary sm:rounded-lg'> 
            <div className='flex items-center justify-between p-6'>
                <h2 className='text-xl font-semibold text-slate-100'>Categories</h2>
                <div>
                   <Link 
                    href={route('categories.create')}
                   className='px-4 py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-700'>Create</Link> 
                </div>
            </div>
            
              <div className="p-4 overflow-x-auto">
                  <table className="table min-w-full divide-y divide-gray-200">
                      {/* head */}
                      <thead className="bg-gray-50">
                          <tr >
                              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">No</th>
                              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Name</th>
                              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Action</th>
                          </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <EachUtils of={categories} render={(item, index) => (
                            <tr key={index}>
                                <th className="px-6 py-4 whitespace-nowrap">{index + 1}</th>
                                <td className="px-6 py-4 whitespace-nowrap">{item.name_category}</td>
                                  <td className="px-6 py-4 whitespace-nowrap"> 
                                    <div className='flex items-center gap-2'>
                                        <Link 
                                        href={route('categories.edit', item.id)}
                                        className='text-blue-500 hover:text-blue-700 hover:underline'
                                        >  Edit</Link>
                                        <button 
                                        onClick={() => handleDelete(item.id)}
                                        className='text-red-500 hover:text-red-700 hover:underline'>Delete </button>
                                    </div>
                                </td>
                                
                            </tr>
                        )}/>
                        
                      </tbody>
                  </table>
              </div>
            
            
        </div>


    </MainLayout>
  )
}

export default Index