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

    public function getFriendByUserId($userId, $partnerId)
    {
        return $this->model->where([
            'requester_id' => $userId,
            'requested_id' => $partnerId,
        ])->orWhere([
            'requester_id' => $partnerId,
            'requested_id' => $userId,
        ])->first();
    }
}
