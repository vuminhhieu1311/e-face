<?php

namespace App\Models;

use App\Enums\Friend\Status;
use App\Traits\Friendable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, Friendable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $with = [
        'profile',
    ];

    protected $appends = [
        'friend_status'
    ];

    public function getFriendStatusAttribute()
    {
        $authUser = Auth::user();
        if (Auth::user() && $this->id !== Auth::id()) {
            if ($authUser->isFriendWith($this->id)) {
                return Status::IS_FRIEND;
            }

            if ($authUser->hasPendingRequestFrom($this->id)) {
                return Status::HAS_PENDING_REQUEST_FROM;
            }

            if ($authUser->hasPendingSentRequestTo($this->id)) {
                return Status::HAS_PENDING_SENT_REQUEST_TO;
            }

            return Status::IS_NOT_FRIEND;
        }

        return null;
    }

    public function scopeNotAuthorized($query)
    {
        return $query->where('id', '!=', Auth::id());
    }

    public function scopeNotFriend($query)
    {
        return $query->where('id', '!=', Auth::id())->get();
    }

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    public function firebaseTokens()
    {
        return $this->hasMany(FirebaseToken::class);
    }

    public function rooms()
    {
        return $this->belongsToMany(Room::class)
            ->orderBy('rooms.updated_at', 'desc');
    }
}
