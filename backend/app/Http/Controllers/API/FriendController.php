<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Friend;
use App\Models\User;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FriendController extends Controller
{
    protected $userRepo;

    public function __construct(UserRepositoryInterface $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    public function index()
    {
        return response()->json([
            'friends' => Auth::user()->friends(),
            'friend_requests' => Auth::user()->pendingRequests(),
        ], 200);
    }

    public function store(Request $request, User $user)
    {
        $friendRequest = Auth::user()->addFriend($user->id);
        if ($friendRequest) {
            //        event(new FriendRequestReceivedEvent($user));

            return response()->json([
                'friend_request' => $friendRequest,
            ], 200);
        }

        return response()->json([
            'message' => 'Can not send friend request.',
        ], 500);
    }

    public function update(Request $request, User $user)
    {
        $friendRequest = Auth::user()->acceptFriend($user->id);
        if ($friendRequest) {
            //        event(new FriendRequestAcceptedEvent($user));

            return response()->json([
                'friend_request' => $friendRequest,
            ], 200);
        }

        return response()->json([
            'message' => 'Can not accept friend request.',
        ], 500);
    }

    public function destroy(User $user)
    {
        if (Auth::user()->deleteFriend($user->id)) {
            return response()->json([
                'message' => 'Delete friend successfully.',
            ], 200);
        }

        return response()->json([
            'message' => 'Can not delete friend.',
        ], 500);
    }

    public function deny(User $user) {
        if (Auth::user()->denyFriend($user->id)) {
            return response()->json([
                'message' => 'Deny friend request successfully.',
            ], 200);
        }

        return response()->json([
            'message' => 'Can not deny friend request.',
        ], 500);
    }
}
