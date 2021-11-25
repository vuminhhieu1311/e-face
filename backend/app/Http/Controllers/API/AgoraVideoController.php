<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateAgoraTokenRequest;
use Illuminate\Http\Request;
use App\Classes\AgoraDynamicKey\RtcTokenBuilder;
use App\Events\MakeAgoraCall;
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

    public function callUser(Request $request)
    {
        $data['userToCall'] = $request->user_to_call;
        $data['channelName'] = $request->channel_name;
        $data['from'] = Auth::id();
        broadcast(new MakeAgoraCall($data))->toOthers();
    }
}
