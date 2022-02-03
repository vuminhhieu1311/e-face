<?php

namespace App\Repositories\Friend;

use App\Repositories\RepositoryInterface;

interface FriendRepositoryInterface extends RepositoryInterface
{
    public function getFriendByUserId($userId, $partnerId);
}
