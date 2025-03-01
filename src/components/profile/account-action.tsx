import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, KeyRound, User } from "lucide-react";
import { toast } from "sonner";

interface AccountActionsProps {
  onLogout: () => void;
}

const actions = [
  {
    label: "Change Password",
    icon: KeyRound,
    onClick: () =>
      toast("Password reset", {
        description: "Check your email for password reset instructions",
      }),
  },
  {
    label: "Setup Two-Factor Authentication",
    icon: User,
    onClick: () =>
      toast("Two-factor authentication", {
        description:
          "Two-factor authentication setup not available in this demo",
      }),
  },
];

export function AccountActions({ onLogout }: AccountActionsProps) {
  return (
    <Card className="md:col-span-2 shadow-inner">
      <CardHeader>
        <CardTitle>Account Actions</CardTitle>
        <CardDescription>
          Manage your account security and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map(({ label, icon: Icon, onClick }) => (
          <Button
            key={label}
            variant="outline"
            className="w-full h-10 justify-center "
            onClick={onClick}
          >
            <Icon className="mr-2 h-4 w-4" />
            {label}
          </Button>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="destructive" className="w-full h-10" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </CardFooter>
    </Card>
  );
}
