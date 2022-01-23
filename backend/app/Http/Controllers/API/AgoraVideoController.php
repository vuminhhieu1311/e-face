<?php

namespace App\Http\Controllers\API;

use App\Events\MakeAgoraCall;
use App\Http\Controllers\Controller;
use App\Http\Requests\CallUserRequest;
use App\Http\Requests\CreateAgoraTokenRequest;
use App\Classes\AgoraDynamicKey\RtcTokenBuilder;
use Illuminate\Support\Facades\Auth;

class AgoraVideoController extends Controller
{
    public function createToken(CreateAgoraTokenRequest $request)
    {
        $appID = env('AGORA_APP_ID');
        $appCertificate = env('AGORA_APP_CERTIFICATE');
        $channelName = $request->channel_name;
        $role = RtcTokenBuilder::RoleAttendee;
        $expireTimeInSeconds = 3600;
        $currentTimestamp = now()->getTimestamp();
        $privilegeExpiredTs = $currentTimestamp + $expireTimeInSeconds;
        $agoraToken = RtcTokenBuilder::buildTokenWithUserAccount($appID, $appCertificate, $channelName, 0, $role, $privilegeExpiredTs);

        return response()->json([
            'agora_token' => $agoraToken,
        ], 200);
    }

    public function callUser(CallUserRequest $request)
    {
        $data['to'] = $request->partner_id;
        $data['channel_name'] = $request->channel_name;
        $data['from_name'] = Auth::user()->name;
        $data['from_number'] = Auth::user()->profile->phone_number;

        $event = new MakeAgoraCall($data);
        broadcast($event)->toOthers();

        return response()->json([
            'calling_event' => $event,
        ], 200);

//        $partner = User::findOrFail($request->partner_id);
//        $firebaseTokens = $partner->firebaseTokens->pluck('value');
//        return $this->sendNotification($firebaseTokens, $request->channel_name);
    }

    private function sendNotification($firebaseTokens, $channelName)
    {
        $caller = Auth::user();
        $message = [
            'registration_ids' => $firebaseTokens,
            'data' => [
                'channel_name' => $channelName,
                'from_id' => $caller->id,
                'from_name' => $caller->name,
                'from_number' => $caller->profile->phone_number,
            ]
        ];
        $messageString = json_encode($message);

        $headers = [
            'Authorization: key=' . env('FIREBASE_API_KEY'),
            'Content-Type: application/json',
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $messageString);
        $response = curl_exec($ch);
        curl_close($ch);

        return $response;
    }
}
