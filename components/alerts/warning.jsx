import { AlertOctagon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { cn } from "@/lib/utils";

export function AlertWarning({
  className = "",
  title = "Warning",
  description = "",
}) {
  return (
    <Alert variant="warning" className={cn(className)}>
      <AlertOctagon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
