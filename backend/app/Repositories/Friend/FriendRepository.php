<?php

namespace App\Repositories\Friend;

use App\Models\Friend;
use App\Repositories\Repository;
use App\Repositories\User\UserRepositoryInterface;

class FriendRepository extends Repository implements FriendRepositoryInterface
{
    public function getModel()
    {
        return Friend::class;
    }
}
