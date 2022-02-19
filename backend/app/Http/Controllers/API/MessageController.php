<?php

namespace App\Http\Controllers\API;

use App\Events\SendMessageEvent;
use App\Http\Controllers\Controller;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use App\Models\Room;
use App\Notifications\NewMessageReceived;
use App\Repositories\Message\MessageRepositoryInterface;
use App\Repositories\Room\RoomRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

class MessageController extends Controller
{
    protected $messageRepo;
    protected $roomRepo;

    public function __construct(MessageRepositoryInterface $messageRepo, RoomRepositoryInterface $roomRepo)
    {
        $this->messageRepo = $messageRepo;
        $this->roomRepo = $roomRepo;
    }

    public function index(Room $room)
    {
        $messages = $room->messages;
        foreach ($messages as $message) {
            $message->load('user');
        }

        return response()->json([
            'messages' => MessageResource::collection($messages),
        ], 200);
    }

    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            $message = $this->messageRepo->create([
                'user_id' => Auth::id(),
                'room_id' => $request['room_id'],
                'text' => $request['text'],
            ]);
            $this->roomRepo->update($request['room_id'], [
                'last_message' => $message->id,
                'updated_at' => now(),
            ]);
            DB::commit();

            $message->load('user');
            $message = MessageResource::make($message);
            $users = $message->room->users;
            foreach ($users as $user) {
                if ($user->id !== Auth::id()) {
                    $user->notify(new NewMessageReceived($message));
                }
            }
            broadcast(new SendMessageEvent($message))->toOthers();

            return response()->json([
                'message' => $message,
            ], 200);
        } catch (Throwable $th) {
            DB::rollback();
            return response()->json([
                'message' => 'Can not send message.',
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Message $message
     * @return \Illuminate\Http\Response
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Message $message
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Message $message
     * @return \Illuminate\Http\Response
     */
    public function destroy(Message $message)
    {
        //
    }
}
