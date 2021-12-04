<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTokenRequest;
use App\Models\FirebaseToken;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class TokenController extends Controller
{
    public function store(StoreTokenRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Save firebase token sent from client
        $firebaseToken = FirebaseToken::create([
            'user_id' => $user->id,
            'value' => $request->firebase_token,
        ]);
        $user->firebase_token = $firebaseToken;

        return response()->json([
            'user' => $user,
            'token' => $user->createToken($request->device_name)->plainTextToken
        ], 200);
    }

    public function destroy(Request $request)
    {
        if ($request->user()->tokens()->delete()) {
            FirebaseToken::destroy($request->firebase_token_id);

            return response()->json([
                'message' => 'Revoke tokens successfully.',
            ], 200);
        }

        return response()->json([
            'message' => 'Revoke tokens unsuccessfully.',
        ], 500);
    }
}
