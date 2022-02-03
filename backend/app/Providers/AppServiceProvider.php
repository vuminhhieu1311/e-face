<?php

namespace App\Providers;

use App\Repositories\Friend\FriendRepository;
use App\Repositories\Friend\FriendRepositoryInterface;
use App\Repositories\Message\MessageRepository;
use App\Repositories\Message\MessageRepositoryInterface;
use App\Repositories\Room\RoomRepository;
use App\Repositories\Room\RoomRepositoryInterface;
use App\Repositories\RoomUser\RoomUserRepository;
use App\Repositories\RoomUser\RoomUserRepositoryInterface;
use App\Repositories\User\UserRepository;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(
            UserRepositoryInterface::class,
            UserRepository::class,
        );
        $this->app->singleton(
            MessageRepositoryInterface::class,
            MessageRepository::class,
        );
        $this->app->singleton(
            RoomRepositoryInterface::class,
            RoomRepository::class,
        );
        $this->app->singleton(
            FriendRepositoryInterface::class,
            FriendRepository::class,
        );
        $this->app->singleton(
            RoomUserRepositoryInterface::class,
            RoomUserRepository::class,
        );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
