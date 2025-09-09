import { Metadata } from "next";

import { PageHeader } from "@/features/shared/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "StreamCore - Profile",
  description: "StreamCore - Profile, Manage your account",
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Profile" subtitle="Manage your account" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-zinc-400">Username: stream.user</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-zinc-400">Theme: Dark</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
