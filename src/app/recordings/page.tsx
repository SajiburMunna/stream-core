import { Metadata } from "next";

import { PageHeader } from "@/features/shared/components/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "StreamCore - Recordings",
  description: "StreamCore - Recordings, Manage and play your recorded content",
};

export default function RecordingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Recordings"
        subtitle="Manage and play your recorded content"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Storage</CardTitle>
            <CardDescription>Usage and availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-3 w-full rounded-full bg-zinc-800">
              <div className="h-3 w-2/3 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500" />
            </div>
            <p className="mt-2 text-sm text-zinc-400">64% used of 2 TB</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
            <CardDescription>Upcoming recordings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-400">No upcoming recordings.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
