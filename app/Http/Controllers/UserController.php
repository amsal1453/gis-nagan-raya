<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Village;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Users/Index', [
            'users' => User::with(['roles', 'village'])
                ->get()
                ->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'village' => $user->village ? [
                            'id' => $user->village->id,
                            'name' => $user->village->name_village
                        ] : null,
                        'role' => $user->roles->first() ? $user->roles->first()->name : 'No Role'
                    ];
                }),
            'roles' => Role::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create', [
            'villages' => Village::all(),
            'roles' => Role::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|exists:roles,name',
            'village_id' => 'required_if:role,admin_desa|exists:villages,id'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'village_id' => $request->village_id
        ]);

        $user->assignRole($request->role);

        return redirect()->route('users.index')
            ->with('success', 'User berhasil dibuat');
    }

    public function edit(User $user){

        return Inertia::render('Users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'village_id' => $user->village_id,
                'role' => $user->roles->first() ? $user->roles->first()->name : null
            ],
            'villages' => Village::all(),
            'roles' => Role::all()
        ]);

    }
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|exists:roles,name',
            'village_id' => 'required_if:role,admin_desa|exists:villages,id',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'village_id' => $request->village_id,
        ]);

        // Update password jika diisi
        if ($request->filled('password')) {
            $user->update(['password' => Hash::make($request->password)]);
        }

        // Update role
        $user->syncRoles([$request->role]);

        return redirect()->route('users.index')
        ->with('success', 'User berhasil diperbarui');
    }

    public function destroy(User $user){
        $user->delete();
        return redirect()->route('users.index')
        ->with('success', 'user berhasil di hapus');
    }
}
