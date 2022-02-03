<?php

namespace App\Repositories\Room;

use App\Models\Room;
use App\Repositories\Repository;

class RoomRepository extends Repository implements RoomRepositoryInterface
{
    public function getModel()
    {
        return Room::class;
    }

    public function getRoomsByUser($user)
    {
        $rooms = $user->rooms;

        foreach ($rooms as $room) {
            $room->load(['users' => function ($query) use ($user){
                $query->where('users.id', '!=', $user->id);
            }]);
        }

        return $rooms;
    }

    public function getRoomByUserId($userID, $partnerID)
    {
//        $room = $this->model->where()
    }
}
