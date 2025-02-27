"use client";

import { useState } from "react";
import { Bell, LogOut, UserRoundPen } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Notification {
  id: string;
  message: string;
  date: Date;
  read: boolean;
}

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notification, setNotification] = useState<Notification[]>([
    {
      id: "1",
      message: "Low stock alert: Premium Lager",
      date: new Date(),
      read: false,
    },
    {
      id: "2",
      message: "New order received #1234",
      date: new Date(Date.now() - 3600000),
      read: false,
    },
  ]);

  const unreadCount = notification.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotification((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotification((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="flex justify-end items-center px-10 py-2">
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Bell className="h-8 w-8 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-4 py-2 border-b">
              <span className="font-semibold">Notifications</span>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Mark all as read
                </Button>
              )}
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {notification.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-2">
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p
                        className={
                          notification.read ? "text-gray-600" : "font-medium"
                        }
                      >
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400">
                        {notification.date.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar>
                <AvatarImage
                  src="/avatar.png"
                  alt="user"
                  className="border border-[#F3C5D5] rounded-full bg-[#F3C5D5]"
                />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>

              <span className="text-sm font-medium text-gray-700">
                Robert Singer
              </span>
              <span
                className={`text-gray-700 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-4 w-4"
                >
                  <path
                    d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-lg">
            <DropdownMenuItem asChild>
              <Link
                href="/profile-settings"
                className="flex items-center gap-2"
              >
                <UserRoundPen />
                Profile settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/logout" className="flex items-center gap-2">
                <LogOut />
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
