<?php

namespace App\Traits;

use App\Enums\Friend\Status;
use App\Models\Friend;
use App\Models\User;

trait Friendable
{
    public function friends()
    {
        $friends = [];
        $f1 = Friend::where([
            'status' => Status::ACCEPTED,
            'requester_id' => $this->id,
        ])->get();
        foreach ($f1 as $friend) {
            $friends[] = User::find($friend->requested_id);
        }

        $f2 = Friend::where([
            'status' => Status::ACCEPTED,
            'requested_id' => $this->id,
        ])->get();
        foreach ($f2 as $friend) {
            $friends[] = User::find($friend->requester_id);
        }

        return $friends;
    }

    public function friendIds()
    {
        return collect($this->friends())->pluck('id')->toArray();
    }

    public function isFriendWith($userId)
    {
        if (in_array($userId, $this->friendIds())) {
            return true;
        }

        return false;
    }

    public function pendingRequests()
    {
        $friendIds = Friend::where([
            'status' => Status::PENDING,
            'requested_id' => $this->id,
        ])->get();
        $pendingFriends = [];
        foreach ($friendIds as $friend) {
            $pendingFriends[] = User::find($friend->requester_id);
        }

        return $pendingFriends;
    }

    public function pendingRequestIds()
    {
        return collect($this->pendingRequests())->pluck('id')->toArray();
    }

    public function hasPendingRequestFrom($userId)
    {
        if (in_array($userId, $this->pendingRequestIds())) {
            return true;
        }

        return false;
    }

    public function pendingSentRequests()
    {
        $users = [];
        $friendships = Friend::where([
            'status' => Status::PENDING,
            'requester_id' => $this->id,
        ])->get();
        foreach ($friendships as $friend) {
            $users[] = User::find($friend->requested_id);
        }

        return $users;
    }

    public function pendingSentRequestIds()
    {
        return collect($this->pendingSentRequests())->pluck('id')->toArray();
    }

    public function hasPendingSentRequestTo($userId)
    {
        if (in_array($userId, $this->pendingSentRequestIds())) {
            return true;
        }

        return false;
    }

    public function addFriend($userId)
    {
        if ($this->id === $userId || $this->isFriendWith($userId) || $this->hasPendingSentRequestTo($userId)) {
            return false;
        }

        if ($this->hasPendingRequestFrom($userId)) {
            return $this->acceptFriend($userId);
        }

        $friendship = Friend::create([
            'requester_id' => $this->id,
            'requested_id' => $userId,
        ]);

        return $friendship;
    }

    public function acceptFriend($userId)
    {
        if ($this->hasPendingRequestFrom($userId)) {
            $friendship = Friend::where([
                'requester_id' => $userId,
                'requested_id' => $this->id,
            ])->first();
            if ($friendship) {
                $friendship->update([
                    'status' => Status::ACCEPTED,
                ]);

                return $friendship;
            }
        }

        return false;
    }

    public function denyFriend($userId)
    {
        if ($this->hasPendingRequestFrom($userId)) {
            $friendship = Friend::where([
                'requester_id' => $userId,
                'requested_id' => $this->id,
            ])->first();
            if ($friendship) {
                $friendship->delete();

                return true;
            }
        }

        return false;
    }

    public function deleteFriend($userId)
    {
        if ($this->isFriendWith($userId)) {
            $friend1 = Friend::where([
                'requester_id' => $userId,
                'requested_id' => $this->id,
            ])->first();
            if ($friend1) {
                return $friend1->delete();
            }

            $friend2 = Friend::where([
                'requester_id' => $this->id,
                'requested_id' => $userId,
            ])->first();
            if ($friend2) {
                return $friend2->delete();
            }
        }

        return false;
    }
}
