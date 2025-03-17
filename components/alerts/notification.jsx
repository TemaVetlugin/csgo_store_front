import { AlertOctagon } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";

import { cn } from "@/lib/utils";

export function AlertNotification({ className = "", description = "" }) {
  return (
    <Alert variant="notification" className={cn(className)}>
      <AlertOctagon className="h-4 w-4" />
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
