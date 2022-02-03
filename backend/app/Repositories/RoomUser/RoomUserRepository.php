<?php

namespace App\Repositories\RoomUser;

use App\Models\RoomUser;
use App\Repositories\Repository;

class RoomUserRepository extends Repository implements RoomUserRepositoryInterface
{
    public function getModel()
    {
        return RoomUser::class;
    }
}
