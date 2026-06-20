import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import api from "../../services/api";

const mealIcons = {
  sarapan: "🍚",
  siang: "🍲",
  malam: "🍜",
  camilan: "🍌",
};

export default function NutritionCard() {
  const { child } = useApp();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    if (!child) return;
    const today = new Date().toISOString().split("T")[0];
    api.mealPlans
      .get(child.id, today)
      .then((data) => {
        if (data && data.meals) setPlan(data);
      })
      .catch((err) => console.warn("Gagal memuat meal plan:", err));
  }, [child]);

  if (!plan || !plan.meals) return null;

  return (
    <section className="mx-5 mb-4 bg-[#FAFAF8] rounded-[28px] p-[18px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[16px] font-bold text-gray-900">Menu Hari Ini</h3>
        <span className="bg-[#D7EAF8] text-primary rounded-full px-3 py-1.5 text-[12px] font-bold">
          {plan.date}
        </span>
      </div>

      {plan.meals.map((meal, i) => (
        <div
          key={meal.type}
          className={`flex justify-between items-center ${i < plan.meals.length - 1 ? "mb-6" : ""}`}
        >
          <div className="flex gap-3 items-center">
            <div className="w-[42px] h-[42px] rounded-xl bg-[#EEF6EC] flex items-center justify-center text-2xl">
              {mealIcons[meal.type] || "🍽️"}
            </div>
            <div>
              <div className="text-[15px] font-bold text-gray-900">
                {meal.label}
              </div>
              <div className="text-[13px] text-gray-500 mt-0.5">
                {meal.name}
              </div>
            </div>
          </div>
          <div className="text-[13px] text-gray-500">{meal.time}</div>
        </div>
      ))}
    </section>
  );
}
