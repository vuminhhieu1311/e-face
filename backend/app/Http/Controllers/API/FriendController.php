<?php

namespace App\Http\Controllers\API;

use App\Enums\Friend\Status;
use App\Enums\Room\Type;
use App\Http\Controllers\Controller;
use App\Models\Friend;
use App\Models\User;
use App\Repositories\Friend\FriendRepositoryInterface;
use App\Repositories\Room\RoomRepositoryInterface;
use App\Repositories\RoomUser\RoomUserRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

class FriendController extends Controller
{
    protected $userRepo;
    protected $friendRepo;
    protected $roomRepo;
    protected $roomUserRepo;

    public function __construct(
        UserRepositoryInterface $userRepo,
        FriendRepositoryInterface $friendRepo,
        RoomRepositoryInterface $roomRepo,
        RoomUserRepositoryInterface $roomUserRepo
    ) {
        $this->userRepo = $userRepo;
        $this->friendRepo = $friendRepo;
        $this->roomRepo = $roomRepo;
        $this->roomUserRepo = $roomUserRepo;
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
        $friend = $this->friendRepo->getFriendByUserId(Auth::id(), $user->id);

        if ($friend) {
            $friend = $this->friendRepo->update($friend->id, [
                'requester_id' => Auth::id(),
                'requested_id' => $user->id,
                'status' => Status::PENDING,
            ]);

            return response()->json([
                'friend_request' => $friend,
            ], 200);
        }

        try {
            DB::beginTransaction();
            $room = $this->roomRepo->create([
                'type' => Type::PRIVATE,
                'name' => Auth::id() . '-' . $user->id,
            ]);
            $this->roomUserRepo->create([
                'room_id' => $room->id,
                'user_id' => Auth::id(),
            ]);
            $this->roomUserRepo->create([
                'room_id' => $room->id,
                'user_id' => $user->id,
            ]);
            $friendRequest = Auth::user()->addFriend($room->id, $user->id);
            DB::commit();

            return response()->json([
                'friend_request' => $friendRequest,
            ], 200);
        } catch (Throwable $th) {
            DB::rollback();
            return response()->json([
                'message' => 'Can not send friend request.',
            ], 500);
        }
    }

    public function update(Request $request, User $user)
    {
        $friendRequest = Auth::user()->acceptFriend($user->id);
        if ($friendRequest) {
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
