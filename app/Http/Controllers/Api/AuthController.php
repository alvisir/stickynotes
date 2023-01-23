<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserStoreRequest;
use App\Http\Resources\AuthUserResource;

class AuthController extends Controller
{   
    /**
     * Store a new user
     *
     * @param RegisteredUserResource $request
     * @return \Illuminate\Http\Response
     */
    public function registerUser(UserStoreRequest $request)
    {
        return new AuthUserResource(User::create($request->all()), 'User registered successfully');
    }

    /**
     * Authenticate user on logging
     *
     * @param UserLoginRequest $request
     * @return void
     */
    public function loginUser(UserLoginRequest $request)
    {
        if (!Auth::attempt($request->only(['username', 'password']))) {
            return response()->json([
                'errors' => true,
                'message' => 'Wrong login credentials.'], 401);
        }

        $user = User::where('username', $request->username)->first();

        return new AuthUserResource($user, 'User lgged successfully');
    }

    /**
     * Logout out user
     *
     * @param Request $request
     * @return void
     */
    public function logoutUser(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'User logged out successfully']);
    }
}
