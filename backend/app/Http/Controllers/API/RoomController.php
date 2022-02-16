<?php

namespace App\Http\Controllers\API;

use App\Enums\Friend\Status;
use App\Enums\Room\Type;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoomRequest;
use App\Repositories\Friend\FriendRepositoryInterface;
use App\Repositories\Room\RoomRepositoryInterface;
use App\Repositories\RoomUser\RoomUserRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

class RoomController extends Controller
{
    protected $roomRepo;
    protected $friendRepo;
    protected $roomUserRepo;

    public function __construct(
        RoomRepositoryInterface $roomRepo,
        FriendRepositoryInterface $friendRepo,
        RoomUserRepositoryInterface $roomUserRepo
    ) {
        $this->roomRepo = $roomRepo;
        $this->friendRepo = $friendRepo;
        $this->roomUserRepo = $roomUserRepo;
    }

    public function index()
    {
        return response()->json([
            'rooms' => $this->roomRepo->getRoomsByUser(Auth::user()),
        ], 200);
    }

    public function store(StoreRoomRequest $request)
    {
        try {
            DB::beginTransaction();
            $room = $this->roomRepo->create([
                'name' => $request->input('name'),
                'type' => Type::GROUP,
            ]);

            $this->roomUserRepo->create([
                'room_id' => $room->id,
                'user_id' => Auth::id(),
            ]);

            foreach ($request->input('user_ids') as $userId) {
                $this->roomUserRepo->create([
                    'room_id' => $room->id,
                    'user_id' => $userId,
                ]);
            }
            DB::commit();

            return response()->json([
                'room' => $room,
            ], 200);
        } catch (Throwable $th) {
            DB::rollback();
            return response()->json('false');
        }
    }

    public function show($userId)
    {
        $friend = $this->friendRepo->getFriendByUserId(Auth::id(), $userId);

        if (!$friend) {
            try {
                DB::beginTransaction();
                $room = $this->roomRepo->create([
                    'type' => Type::PRIVATE,
                    'name' => Auth::id() . '-' . $userId,
                ]);
                $this->roomUserRepo->create([
                    'room_id' => $room->id,
                    'user_id' => Auth::id(),
                ]);
                $this->roomUserRepo->create([
                    'room_id' => $room->id,
                    'user_id' => $userId,
                ]);
                $room->friend()->create([
                    'requester_id' => Auth::id(),
                    'requested_id' => $userId,
                    'status' => Status::NOT_FRIEND,
                ]);
                DB::commit();
                $room->load('notAuthUsers');

                return response()->json([
                    'room' => $room,
                ], 200);
            } catch (Throwable $th) {
                DB::rollback();
                return response()->json('false');
            }
        }
        $room = $friend->room;
        $room->load('notAuthUsers');

        return response()->json([
            'room' => $room,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
