import type { Route } from "./+types/bookings"

import { DataTable } from "~/features/admin/components/data-table"

import data from "~/dashboard/data.json"

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Admin | Bookings Page` },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function BookingsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <DataTable data={data} />
        </div>
      </div>
    </div>
  )
}
