<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Spatie\Permission\Models\Permission;


class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminKecamatan = Role::create(['name' => 'admin_kecamatan']);
        $adminDesa = Role::create(['name' => 'admin_desa']);


        Permission::create(['name' => 'kelola-data-kecamatan']);
        Permission::create(['name' => 'kelola-data-desa']);
        Permission::create(['name' => 'kelola-data-spasial']);
        Permission::create(['name' => 'kelola-data-kategori']);
        Permission::create(['name' => 'kelola-akun-admin']);

        $adminKecamatan->givePermissionTo([
            'kelola-data-kecamatan',
            'kelola-data-desa',
            'kelola-data-spasial',
            'kelola-data-kategori',
            'kelola-akun-admin'
        ]);

        $adminDesa->givePermissionTo([
            'kelola-data-desa',
            'kelola-data-spasial',
            'kelola-data-kategori',
        ]);
    }
}
