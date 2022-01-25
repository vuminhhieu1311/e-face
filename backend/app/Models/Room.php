<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'is_active',
        'type',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class)
            ->where('is_active', true)
            ->orderBy('created_at', 'desc');
    }

    public function hasUser($user)
    {
        return $this->users()
            ->where('user_id', $user->id)
            ->exists();
    }
}
