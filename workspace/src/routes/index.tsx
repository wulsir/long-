import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/page";

export const Route = createFileRoute("/")({
  component: HomePage,
});
