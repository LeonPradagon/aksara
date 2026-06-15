"use client";

import { useParams } from "next/navigation";
import TeamForm from "../../_components/TeamForm";

export default function EditTeamMemberPage() {
  const params = useParams();
  return <TeamForm memberId={params.id as string} />;
}
