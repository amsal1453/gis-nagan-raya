import React, { useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import Breadcrumbs from '@/Components/Breadcrumbs'
import MainLayout from '@/Layouts/MainLayout'

const Create = () => {
    const { data, setData, post, processing, errors } = useForm({
        name_category: ''
    })

    const breadCrumbsPath = [
        {label: 'Categories', link: '/categories'},
        {label: 'Create'}
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('categories.store'))
    }

    return (
        <MainLayout>
            <Head title='Create Category'/>
            <div className='p-4 mb-6 text-white rounded-md shadow-md bg-primary'>
                <Breadcrumbs items={breadCrumbsPath}/>
            </div>
            
            <div className='p-6 overflow-hidden shadow-sm bg-primary sm:rounded-lg'>
                <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
                    <div className='mb-4'>
                        <label 
                            htmlFor='name_categori' 
                            className='block mb-2 text-sm font-medium text-slate-100'
                        >
                            Category Name
                        </label>
                        <input 
                            type='text'
                            id='name_category'
                            value={data.name_category}
                            onChange={(e) => setData('name_category', e.target.value)}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Enter category name'
                        />
                        {errors.name_category && (
                            <p className='mt-1 text-xs text-red-500'>{errors.name_category}</p>
                        )}
                    </div>
                    
                    <div className='flex justify-center '>
                        <button 
                            type='submit' 
                            disabled={processing}
                            className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50'
                        >
                            {processing ? 'Saving...' : 'Create Category'}
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    )
}

export default Create