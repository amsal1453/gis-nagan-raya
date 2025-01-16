<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Village;
use Illuminate\Auth\Access\HandlesAuthorization;

class VillagePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return $user->hasRole(['admin_kecamatan', 'admin_desa']);
    }

    public function view(User $user, Village $village)
    {
        if ($user->hasRole('admin_kecamatan')) {
            return true;
        }

        return $user->hasRole('admin_desa') && $user->village_id === $village->id;
    }

    public function create(User $user)
    {
        return $user->hasRole('admin_kecamatan');
    }

    public function update(User $user, Village $village)
    {
        if ($user->hasRole('admin_kecamatan')) {
            return true;
        }

        return $user->hasRole('admin_desa') && $user->village_id === $village->id;
    }

    public function delete(User $user)
    {
        return $user->hasRole('admin_kecamatan');
    }
}
