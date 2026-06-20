import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import api from "../services/api";
import PageShell from "../components/layout/PageShell";
import PageHeader from "../components/layout/PageHeader";
import BottomNav from "../components/layout/BottomNav";

const mealEmojis = { sarapan: "🍚", siang: "🍲", malam: "🍜", camilan: "🍌" };

function InfantEducation() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-3xl">🍼</span>
        <h2 className="text-[16px] font-bold text-gray-900">
          ASI Eksklusif untuk Si Kecil
        </h2>
      </div>
      <p className="text-[14px] text-gray-700 leading-relaxed">
        Bayi usia <strong>0–6 bulan</strong> hanya membutuhkan{" "}
        <strong>ASI eksklusif</strong>. MPASI dimulai setelah usia 6 bulan.
      </p>
    </div>
  );
}

export default function MealPlannerPage() {
  const { child } = useApp();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const ageMonths = child?.ageMonths || 0;
  const isInfant = ageMonths < 6;

  async function loadPlan() {
    if (!child) return;
    setLoading(true);
    if (isInfant) {
      setLoading(false);
      return;
    }
    try {
      const today = new Date().toISOString().split("T")[0];
      const existing = await api.mealPlans.get(child.id, today);
      if (existing) setPlan(existing);
      else setPlan(await api.mealPlans.generate(child.id));
    } catch {
      setPlan(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPlan();
  }, [child]);

  async function handleGenerate() {
    if (!child || generating) return;
    setGenerating(true);
    try {
      setPlan(await api.mealPlans.generate(child.id));
    } catch {}
    setGenerating(false);
  }

  return (
    <PageShell>
      <PageHeader title="Nuids" subtitle="Meal Planner" showBack />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
        <h1 className="text-[20px] font-bold text-gray-900 mb-4">
          Meal Planner
        </h1>

        {loading ? (
          <p className="text-center text-text-muted text-[13px] py-10">
            Memuat...
          </p>
        ) : isInfant ? (
          <InfantEducation />
        ) : !plan ? (
          <div className="text-center py-10">
            <p className="text-text-muted text-[13px] mb-4">
              Belum ada meal plan.
            </p>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="px-6 py-3 bg-primary text-white rounded-full text-[14px] font-bold disabled:opacity-50"
            >
              {generating ? "Memproses..." : "Buat Meal Plan"}
            </button>
          </div>
        ) : (
          <>
            {/* AI Note */}
            <div className="bg-[#587F74] rounded-2xl p-4 mb-4 text-white flex flex-row gap-4">
              <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#72998D"
                  strokeWidth="1.5"
                  className="w-4 h-4"
                >
                  <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                </svg>
              </div>
              <p className="text-[14px] leading-relaxed">{plan.aiNote}</p>
              {plan.totalPrice > 0 && (
                <p className="text-[12px] mt-2 opacity-80">
                  Estimasi biaya: Rp{plan.totalPrice.toLocaleString("id-ID")} /
                  Rp{plan.budget.toLocaleString("id-ID")}
                </p>
              )}
            </div>

            {/* Daftar Menu */}
            <div className="flex flex-col gap-2 mb-4">
              {(plan.meals || []).map((meal) => (
                <div
                  key={meal.type}
                  className="bg-white border border-[#C0C9BB] rounded-2xl px-4 py-3 flex items-center gap-3"
                >
                  <span className="text-2xl">
                    {mealEmojis[meal.type] || "🍽️"}
                  </span>
                  <div className="flex-1">
                    <div className="text-[11px] font-bold tracking-wide uppercase text-[#00629E]">
                      {meal.label}
                    </div>
                    <div className="text-[14px] font-bold text-gray-900">
                      {meal.name}
                    </div>
                    <div className="text-[12px] text-text-muted">
                      {meal.time}
                    </div>
                  </div>
                  {meal.price > 0 && (
                    <span className="text-[12px] text-green font-bold">
                      Rp{meal.price.toLocaleString("id-ID")}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Bahan */}
            {plan.ingredients?.length > 0 && (
              <div className="mb-4">
                <p className="text-[11px] font-bold tracking-wide uppercase text-text-muted mb-2">
                  Bahan:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {plan.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="bg-white border border-[#BDBDBD] rounded-full px-3 py-1 text-[12px] text-gray-800"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full h-12 rounded-xl border-2 border-primary text-primary text-[14px] font-bold hover:bg-primary hover:text-white transition-all disabled:opacity-50"
            >
              {generating ? "Memproses..." : "🔄 Ganti Menu"}
            </button>
          </>
        )}
      </div>
      <BottomNav />
    </PageShell>
  );
}
