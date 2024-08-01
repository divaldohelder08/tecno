"use client"
import { Button } from "@/components/ui/button"
import Role from "./role"
interface role {
  id: number
  name: string
  description: string | null
}

interface props {
  id: number
  userRoles: role[],
  roles: role[],
}
export default function Table({ userRoles, roles, id }: props) {
  const uniqueRoles = roles.filter(role =>
    !userRoles.some(h => h.id === role.id)
  );
  return (
    <div className="w-full">
      <div className="bg-background rounded-lg shadow-lg">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left text-muted-foreground">
            <thead className="text-xs uppercase bg-muted">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Assign
                </th>
              </tr>
            </thead>
            <tbody>
              {userRoles.sort().map((e, i) => <Role {...e} val={true} userId={id} key={i} />)}
              {uniqueRoles.sort().map((e, i) => <Role {...e} val={false} userId={id} key={i} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}