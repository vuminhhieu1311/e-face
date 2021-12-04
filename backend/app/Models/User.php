<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

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

    public function scopeNotAuthorized($query)
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
}
