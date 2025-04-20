"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const email = "adityahota99@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <TooltipProvider>
      <Card className="w-full max-w-md mx-auto p-4 shadow-lg rounded-2xl bg-white dark:bg-zinc-900">
        <CardContent className="flex items-center justify-between space-x-4">
          <span className="text-lg font-medium text-zinc-800 dark:text-zinc-100">
            {email}
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleCopy}
                variant="outline"
                className={cn("flex gap-2 items-center")}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? "Email copied!" : "Copy email to clipboard"}</p>
            </TooltipContent>
          </Tooltip>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
