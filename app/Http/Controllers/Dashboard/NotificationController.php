<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function getNotifications($userId)
    {
        $unreadNotifications = Notification::where('addressee_id', $userId)
            ->where('is_read', false)
            ->orderBy('sendtime', 'desc')
            ->get();

        $additionalNotifications = Notification::where('addressee_id', $userId)
            ->where('is_read', true)
            ->orderBy('sendtime', 'desc')
            ->take(6 - $unreadNotifications->count())
            ->get();

        $notifications = $unreadNotifications->merge($additionalNotifications);

        return response()->json(['notifications' => $notifications]);
    }

    public function markAsRead(Request $request)
    {
        $notification = Notification::find($request->notificationId);

        if ($notification && $notification->addressee_id == $request->userId) {
            $notification->is_read = true;
            $notification->save();
            return response()->json(['message' => 'Notification marked as read.']);
        }

        return response()->json(['message' => 'Notification not found or unauthorized.'], 404);
    }
}
