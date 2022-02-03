<?php

namespace App\Enums\Friend;

final class Status
{
    public const ACCEPTED = 1;
    public const PENDING = 0;
    public const IS_FRIEND = 'is_friend';
    public const HAS_PENDING_REQUEST_FROM = 'has_pending_request_from';
    public const HAS_PENDING_SENT_REQUEST_TO = 'has_pending_sent_request_to';
    public const IS_NOT_FRIEND = 'is_not_friend';
}
