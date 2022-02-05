<?php

namespace App\Repositories\User;

use App\Models\User;
use App\Repositories\Repository;

class UserRepository extends Repository implements UserRepositoryInterface
{
    public function getModel()
    {
        return User::class;
    }

    public function getAllUsers($keyword)
    {
        return $this->model->notAuthorized()
            ->where('name', 'like', '%'.$keyword.'%')
            ->orWhere('email', 'like', '%'.$keyword.'%')
            ->get();
    }
}
