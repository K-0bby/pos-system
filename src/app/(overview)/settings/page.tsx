"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

type SettingType = "email" | "stock" | "theme";

export default function Page() {
  const { resolvedTheme, setTheme } = useTheme(); // Use resolvedTheme to handle hydration issues
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [stockAlerts, setStockAlerts] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(resolvedTheme === "dark"); // Sync dark mode state
  }, [resolvedTheme]);

  const handleSettingChange = (setting: SettingType, value: boolean) => {
    switch (setting) {
      case "email":
        setEmailNotifications(value);
        break;
      case "stock":
        setStockAlerts(value);
        break;
      case "theme":
        setIsDarkMode(value);
        setTheme(value ? "light" : "dark"); // Correct toggle logic
        break;
    }

    toast("Settings Updated", {
      description: `${
        setting.charAt(0).toUpperCase() + setting.slice(1)
      } settings have been updated.`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 mt-5">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="grid gap-6">
        {/* Notifications Card */}
        <Card className="shadow-inner">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email about your account activity
                </p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={handleSettingChange.bind(null, "email")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Low Stock Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when products are running low
                </p>
              </div>
              <Switch
                checked={stockAlerts}
                onCheckedChange={handleSettingChange.bind(null, "stock")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Theme Card */}
        <Card className="shadow-inner">
          <CardHeader>
            <CardTitle className="font-bold">Theme</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Toggle dark mode on/off
                </p>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={handleSettingChange.bind(null, "theme")}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
