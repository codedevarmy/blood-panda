import type { Route } from "../admin/+types/home"

import { ChartAreaInteractive } from "~/features/admin/components/chart-area-interactive"
import { DataTable } from "~/features/admin/components/data-table"
import { SectionCards } from "~/features/admin/components/section-cards"

import data from "~/dashboard/data.json"

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Admin | Home` },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function AdminHome() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  )
}
