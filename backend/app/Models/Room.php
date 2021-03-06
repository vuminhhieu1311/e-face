<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'is_active',
        'type',
        'last_message',
        'updated_at',
    ];

    public function getLastMessageAttribute($value)
    {
        if ($value) {
            return Message::findOrFail($value);
        }

        return null;
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function notAuthUsers()
    {
        return $this->belongsToMany(User::class)
            ->where('users.id', '!=', Auth::id());
    }

    public function messages()
    {
        return $this->hasMany(Message::class)
            ->where('is_active', true)
            ->orderBy('created_at', 'desc');
    }

    public function friend()
    {
        return $this->hasOne(Friend::class);
    }

    public function hasUser($user)
    {
        return $this->users()
            ->where('user_id', $user->id)
            ->exists();
    }
}
