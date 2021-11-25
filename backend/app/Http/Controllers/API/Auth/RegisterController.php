<?php

namespace App\Http\Controllers\API\Auth;

use App\Actions\Fortify\CreateNewUser;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function register(Request $request, CreateNewUser $creator)
    {
        $user = $creator->create($request->all());

        if ($user) {
            return response()->json([
                'user' => $user,
            ], 201);
        }

        return response()->json([
            'message' => 'Register unsuccessfully.',
        ], 500);
    }
}
