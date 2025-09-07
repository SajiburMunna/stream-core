import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Configure StreamCore" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Button variant="gradient">Accent: Teal → Indigo</Button>
            <Button variant="secondary">System Default</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Server</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-zinc-400">Status: Online</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
