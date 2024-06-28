import { createFileRoute } from "@tanstack/react-router";
import Members from "@/pages/members/Members";

export const Route = createFileRoute(
  "/_authenticated/projects/$projectName/members"
)({
  component: () => (
    <Members />
  ),
});
