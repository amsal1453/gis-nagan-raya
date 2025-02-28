<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function updateProfilePhoto(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|max:5048',
        ]);

        $user = $request->user();

        // Delete old photo if it exists and is not the default avatar
        if ($user->profile_photo && !str_contains($user->profile_photo, 'default-avatar')) {
            Storage::disk('public')->delete($user->profile_photo);
        }

        // Generate unique filename with timestamp
        $filename = time() . '_' . $request->file('photo')->getClientOriginalName();
        
        // Upload new photo with unique filename
        $path = $request->file('photo')->storeAs('profile-photos', $filename, 'public');

        // Update user
        $user->update([
            'profile_photo' => $path
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Profile photo updated successfully',
            'photo_url' => Storage::url($path)
        ]);
    }
}
