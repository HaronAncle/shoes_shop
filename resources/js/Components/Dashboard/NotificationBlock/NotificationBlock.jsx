import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import NotificationModal from "./NotificationModal";
import "./NotificationBlock.css";

const NotificationBlock = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const notificationRef = useRef(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(
                    `/api/dashboard/notifications/${userId}`
                );
                setNotifications(response.data.notifications);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };
        fetchNotifications();
    }, [userId]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setShowNotifications(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const handleNotificationClick = async (notification) => {
        setSelectedNotification(notification);

        if (!notification.is_read) {
            try {
                await axios.post(`/api/dashboard/notifications/mark-as-read`, {
                    notificationId: notification.id,
                    userId,
                });
                setNotifications((prevNotifications) =>
                    prevNotifications.map((notif) =>
                        notif.id === notification.id
                            ? { ...notif, is_read: true }
                            : notif
                    )
                );
            } catch (error) {
                console.error("Error marking notification as read:", error);
            }
        }
    };

    const closeModal = () => {
        setSelectedNotification(null);
    };

    const unreadCount = notifications.filter((notif) => !notif.is_read).length;

    return (
        <div className="notification-block" ref={notificationRef}>
            <div
                className="notification-icon-container"
                onClick={toggleNotifications}
            >
                <svg
                    className="notification-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 2C10.34 2 9 3.34 9 5V6C6.79 6.91 5 9.07 5 11.5V18L3 20V21H21V20L19 18V11.5C19 9.07 17.21 6.91 15 6V5C15 3.34 13.66 2 12 2zM12 22C10.9 22 10 21.1 10 20H14C14 21.1 13.1 22 12 22zM6.29 18L7.5 16.79V11.5C7.5 9.84 8.6 8.5 10.25 8.09C10.25 8.08 10.24 8.06 10.24 8.05C10.14 8.03 10.05 8 10 8H14C13.95 8 13.86 8.03 13.76 8.05C13.76 8.06 13.75 8.08 13.75 8.09C15.4 8.5 16.5 9.84 16.5 11.5V16.79L17.71 18H6.29z" />
                </svg>
                {unreadCount > 0 && (
                    <div className="notification-count">{unreadCount}</div>
                )}
            </div>
            {showNotifications && (
                <div className="notification-list">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`notification-item ${
                                !notification.is_read ? "notread" : ""
                            }`}
                            onClick={() =>
                                handleNotificationClick(notification)
                            }
                        >
                            <p>{notification.message}</p>
                            <span>{notification.timestamp}</span>
                        </div>
                    ))}
                </div>
            )}
            {selectedNotification && (
                <NotificationModal
                    show={!!selectedNotification}
                    onClose={closeModal}
                    notification={selectedNotification}
                />
            )}
        </div>
    );
};

export default NotificationBlock;
