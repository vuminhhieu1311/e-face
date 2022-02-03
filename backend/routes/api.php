<?php

use App\Http\Controllers\API\AgoraVideoController;
use App\Http\Controllers\API\Auth\RegisterController;
use App\Http\Controllers\API\Auth\TokenController;
use App\Http\Controllers\API\FriendController;
use App\Http\Controllers\API\MessageController;
use App\Http\Controllers\API\RoomController;
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

/* =================================GUEST=====================================*/
Route::middleware('guest')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('/token', [TokenController::class, 'store']);
        Route::post('/register', [RegisterController::class, 'register']);
    });
});

/* =================================AUTHENTICATED=====================================*/
Route::middleware('auth:sanctum')->group(function () {
    Route::delete('/auth/token', [TokenController::class, 'destroy']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/agora/token', [AgoraVideoController::class, 'createToken']);
    Route::post('/agora/call-user', [AgoraVideoController::class, 'callUser']);
    Route::resources([
        'users' => UserController::class,
        'rooms' => RoomController::class,
        'messages' => MessageController::class,
    ]);

    /* =================================FRIEND=====================================*/
    Route::prefix('friends')->group(function () {
        Route::get('/', [FriendController::class, 'index']);
        Route::post('/{user}', [FriendController::class, 'store']);
        Route::patch('/{user}', [FriendController::class, 'update']);
        Route::delete('/{user}/deny', [FriendController::class, 'deny']);
        Route::delete('/{user}', [FriendController::class, 'destroy']);
    });

    /* =================================MESSAGE=====================================*/
    Route::prefix('rooms')->group(function () {
        Route::get('/{room}/messages', [MessageController::class, 'index']);
    });
});
