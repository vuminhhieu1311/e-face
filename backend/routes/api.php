<?php

use App\Http\Controllers\API\AgoraVideoController;
use App\Http\Controllers\API\Auth\RegisterController;
use App\Http\Controllers\API\Auth\TokenController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('guest')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('/token', [TokenController::class, 'store']);
        Route::post('/register', [RegisterController::class, 'register']);
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::delete('/auth/token', [TokenController::class, 'destroy']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/agora/token', [AgoraVideoController::class, 'createToken']);
    Route::post('/agora/call-user', [AgoraVideoController::class, 'callUser']);
    Route::resources([
        'users' => UserController::class,
    ]);
});
