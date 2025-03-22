import MainLayout from '@/Layouts/MainLayout'
import { Head } from '@inertiajs/react'
import React, { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell, AreaChart, Area
} from 'recharts'

const Dashboard = ({ auth, stats }) => {
  const [timeRange, setTimeRange] = useState('month')
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d']

  return (
      <MainLayout>
          <Head title="Dashboard - Sistem Informasi Geografis" />

          {/* Welcome Banner */}
          <div className="p-6 mb-6 rounded-lg shadow-md bg-gradient-to-r from-primary to-primary/70">
              <h1 className="flex flex-col text-2xl font-semibold text-center text-white">
                  <span className="text-3xl mb-2">
                      Selamat Datang, {auth.user.name}
                  </span>
                  <span className="text-xl">
                      Sistem Informasi Geografis Data Spasial
                  </span>
                  <span className="text-lg">
                      Kecamatan Tadu Raya, Nagan Raya
                  </span>
              </h1>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-sm text-black mb-2">Total Kecamatan</div>
                  <div className="text-3xl font-bold text-black">
                      {stats.totalSubdistricts}
                  </div>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-sm text-black mb-2">Total Desa</div>
                  <div className="text-3xl font-bold text-black">
                      {stats.totalVillages}
                  </div>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-sm text-black mb-2">
                      Total Data Spasial
                  </div>
                  <div className="text-3xl font-bold text-black">
                      {stats.totalSpatialData}
                  </div>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-sm text-black mb-2">Total Kategori</div>
                  <div className="text-3xl font-bold text-black">
                      {stats.totalCategories}
                  </div>
              </div>
          </div>

        

          {/* Main Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Data Spasial per Desa */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold mb-4 text-black">
                      Data Spasial per Desa
                  </h2>
                  <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                              data={stats.spatialDataByVillage}
                              margin={{
                                  top: 10,
                                  right: 30,
                                  left: 0,
                                  bottom: 20,
                              }}
                          >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis
                                  dataKey="name"
                                  angle={-45}
                                  textAnchor="end"
                                  height={60}
                              />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar
                                  dataKey="count"
                                  name="Jumlah Data"
                                  fill="#8884d8"
                              />
                          </BarChart>
                      </ResponsiveContainer>
                  </div>
              </div>

              {/* Kategori Data */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold mb-4 text-black">
                      Distribusi Kategori Data
                  </h2>
                  <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                              <Pie
                                  data={stats.spatialDataByCategory}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                  nameKey="name"
                                  label={({ name, percent }) =>
                                      `${name}: ${(percent * 100).toFixed(0)}%`
                                  }
                              >
                                  {stats.spatialDataByCategory.map(
                                      (entry, index) => (
                                          <Cell
                                              key={`cell-${index}`}
                                              fill={
                                                  COLORS[index % COLORS.length]
                                              }
                                          />
                                      )
                                  )}
                              </Pie>
                              <Tooltip
                                  formatter={(value, name) => [
                                      `${value} data`,
                                      name,
                                  ]}
                              />
                              <Legend />
                          </PieChart>
                      </ResponsiveContainer>
                  </div>
              </div>
          </div>

          {/* Secondary Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Tren Data Spasial */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold mb-4 text-black">
                      Tren Penambahan Data Spasial
                  </h2>
                  <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                              data={stats.spatialDataTrend}
                              margin={{
                                  top: 10,
                                  right: 30,
                                  left: 0,
                                  bottom: 0,
                              }}
                          >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line
                                  type="monotone"
                                  dataKey="value"
                                  name="Jumlah Data"
                                  stroke="#8884d8"
                                  activeDot={{ r: 8 }}
                              />
                          </LineChart>
                      </ResponsiveContainer>
                  </div>
              </div>

              {/* Distribusi Tipe Data */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold mb-4 text-black">
                      Distribusi Tipe Data Spasial
                  </h2>
                  <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                              data={stats.spatialDataByType}
                              margin={{
                                  top: 10,
                                  right: 30,
                                  left: 0,
                                  bottom: 0,
                              }}
                          >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Area
                                  type="monotone"
                                  dataKey="point"
                                  name="Titik"
                                  stackId="1"
                                  fill="#8884d8"
                                  stroke="#8884d8"
                              />
                              <Area
                                  type="monotone"
                                  dataKey="line"
                                  name="Garis"
                                  stackId="1"
                                  fill="#82ca9d"
                                  stroke="#82ca9d"
                              />
                              <Area
                                  type="monotone"
                                  dataKey="polygon"
                                  name="Area"
                                  stackId="1"
                                  fill="#ffc658"
                                  stroke="#ffc658"
                              />
                          </AreaChart>
                      </ResponsiveContainer>
                  </div>
              </div>
          </div>

          {/* Analytics by Village */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-lg font-semibold mb-4 text-black">
                  Data Spasial per Desa (Top 10)
              </h2>
              <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                          data={stats.spatialDataByVillage.slice(0, 10)}
                          layout="vertical"
                          margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
                      >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis type="category" dataKey="name" width={100} />
                          <Tooltip />
                          <Legend />
                          <Bar
                              dataKey="count"
                              name="Jumlah Data"
                              fill="#82ca9d"
                          />
                      </BarChart>
                  </ResponsiveContainer>
              </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-lg font-semibold mb-4 text-black">
                  Aktivitas Terbaru
              </h2>
              <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                          <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                  Data
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                  Kategori
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                  Lokasi
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                  Dibuat Oleh
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                  Tanggal
                              </th>
                          </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                          {stats.recentActivities.map((activity, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                                      {activity.name}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                      {activity.category}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                      {activity.location}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                      {activity.user}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                      {activity.date}
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      </MainLayout>
  );
}

export default Dashboard
