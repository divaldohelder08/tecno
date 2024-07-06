import api from "@/lib/axios";
import { member } from "@/types";

export async function getMembers() {
  const { data } = await api.get<{
    members: member[]
  }>('/users')
  return data.members
}

