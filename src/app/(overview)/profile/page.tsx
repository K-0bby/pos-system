"use client";

import { useState } from "react";
import { ProfileForm } from "@/components/profile/profile-form";
import { AccountActions } from "@/components/profile/account-action";
import { toast } from "sonner";

export default function Profile() {
  // Mock user data - replace with actual API data
  const [userData, setUserData] = useState({
    name: "Robert Singer",
    email: "rob.singer@example.com",
    company: "Afro Drinks",
    phone: "+1 (555) 123-4567",
    role: "Admin",
  });

  const handleUpdateProfile = (updatedData: typeof userData) => {
    setUserData(updatedData);
    toast("Profile Updated", {
      description: "Your profile details have been successfully updated.",
    });
  };

  const handleLogout = () => {
    // Implement logout logic
    toast("Logged Out", {
      description: "You have been successfully logged out.",
    });

    // Redirect to login page
    // window.location.href = "/login";
  };

  return (
    <div>
      <div className="container max-w-4xl py-8 animate-fadeIn">
        <div className="space-y-6">
          <header>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">
              View and manage your account information
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            <ProfileForm
              userData={userData}
              onUpdateProfile={handleUpdateProfile}
            />
            <AccountActions onLogout={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  );
}
