import { useState, useEffect } from 'react'
import { useApp } from "../context/AppContext"
import api from '../services/api'
import PageShell from "../components/layout/PageShell"
import PageHeader from "../components/layout/PageHeader"
import BottomNav from "../components/layout/BottomNav"
import GreetingSection from "../components/dashboard/GreetingSection"
import GrowthStatusCard from "../components/dashboard/GrowthStatusCard"
import TipSection from "../components/dashboard/TipSection"
import ActionButtons from "../components/dashboard/ActionButtons"
import NutritionCard from "../components/dashboard/NutritionCard"
import ArticleCard from "../components/dashboard/ArticleCard"

export default function DashboardPage() {
  const { child, checkups, user, loading } = useApp()
  const [zStatus, setZStatus] = useState(null)
  const latest = checkups?.[0]

  useEffect(() => {
    if (child) {
      api.growthChart.get(child.id)
        .then((data) => { if (data?.latestStatus) setZStatus(data.latestStatus) })
        .catch(() => {})
    }
  }, [child, checkups])

  const status = zStatus?.status || latest?.status || ""

  if (!user) return null

  return (
    <PageShell>
      <PageHeader title="Nuids" subtitle="Dashboard" />
      <div className="flex-1 overflow-y-auto pb-4">
        <GreetingSection userName={user?.name} childName={child?.name} />
        {child && (
          <>
            <GrowthStatusCard status={status} childName={child?.name} week={latest?.week} />
            <TipSection status={status} />
          </>
        )}
        <ActionButtons />
        {child && <NutritionCard />}
        <ArticleCard />
      </div>
      <BottomNav />
    </PageShell>
  )
}
