<?php

namespace App\Http\Controllers\API;

use App\Events\SendMessageEvent;
use App\Http\Controllers\Controller;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use App\Models\Room;
use App\Repositories\Message\MessageRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    protected $messageRepo;

    public function __construct(MessageRepositoryInterface $messageRepo)
    {
        $this->messageRepo = $messageRepo;
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
        $message = $this->messageRepo->create([
            'user_id' => Auth::id(),
            'room_id' => $request['room_id'],
            'text' => $request['text'],
        ]);
        $message->load('user');
        $message = MessageResource::make($message);
        broadcast(new SendMessageEvent($message))->toOthers();

        return response()->json([
            'message' => $message,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function destroy(Message $message)
    {
        //
    }
}
