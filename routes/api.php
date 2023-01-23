<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NotesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['namespace' => 'App\Http\Controllers\Api'], function(){
    Route::post('auth/register', [AuthController::class, 'registerUser']);
    Route::post('auth/login', [AuthController::class, 'loginUser']);

    Route::middleware('auth:sanctum')->group(function() {
        Route::apiResource('notes', NotesController::class);
        Route::post('auth/logout', [AuthController::class, 'logoutUser']);
    });
});
