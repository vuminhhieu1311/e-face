<?php

namespace App\Http\Resources;

use App\Http\Resources\Custom\ShareResource;

class MessageResource extends ShareResource
{
    /**
     * Transform the resource into an array.
     *
     * @var  \Illuminate\Http\Request  $request
     *
     * @return array
     */
    public function toArray($request) // @codingStandardsIgnoreLine
    {
        return [
            'id' => $this->id,
            '_id' => $this->id,
            'text' => $this->text,
            'isRead' => $this->is_read,
            'createdAt' => $this->created_at,
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}
