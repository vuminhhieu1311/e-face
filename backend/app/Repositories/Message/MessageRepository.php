<?php

namespace App\Repositories\Message;

use App\Models\Message;
use App\Repositories\Repository;

class MessageRepository extends Repository implements MessageRepositoryInterface
{

    public function getModel()
    {
        return Message::class;
    }
}
