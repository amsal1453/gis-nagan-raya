<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user1 = User::create([
            'name' => 'Admin Kecamatan',
            'email' => 'adminkecamatan@example.com',
            'password' => bcrypt('password123'), 
        ]);
        $user1->assignRole('admin_kecamatan');

        
        $user2 = User::create([
            'name' => 'Admin Desa',
            'email' => 'admindesa@example.com',
            'password' => bcrypt('password123'),
        ]);
        $user2->assignRole('admin_desa');
    }
}
