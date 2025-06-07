"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { calculateBlocks } from "../../lib/zoneCalculation";
import { meals } from "../../lib/mealsData";
import { Suspense } from "react";

const mealLimits = {
  breakfast: 1,
  lunch: 1,
  dinner: 1,
  snack: 2,
};

function InnerMealListPage() {
  const searchParams = useSearchParams();
  const [dailyBlocks, setDailyBlocks] = useState(null);
  const [selectedMeals, setSelectedMeals] = useState([]);

  const gender = searchParams.get("gender");
  const age = searchParams.get("age");
  const height = searchParams.get("height");
  const weight = searchParams.get("weight");
  const activityLevel = searchParams.get("activityLevel");

  useEffect(() => {
    if (gender && age && height && weight && activityLevel) {
      const blocks = calculateBlocks({
        gender,
        age,
        height,
        weight,
        activityLevel,
      });
      setDailyBlocks(blocks);
    }
  }, [gender, age, height, weight, activityLevel]);

  if (!dailyBlocks) {
    return (
      <div className="max-w-md mx-auto mt-12 text-center">
        <p className="text-red-600">Please fill in the form first.</p>
      </div>
    );
  }

  const toggleMealSelection = (meal) => {
    const sameTypeMeals = selectedMeals.filter(
      (m) => m.mealType === meal.mealType
    );
    const alreadySelected = selectedMeals.find((m) => m.name === meal.name);

    if (alreadySelected) {
      setSelectedMeals(selectedMeals.filter((m) => m.name !== meal.name));
    } else {
      if (sameTypeMeals.length < mealLimits[meal.mealType]) {
        setSelectedMeals([...selectedMeals, meal]);
      } else {
        const updated = selectedMeals.filter(
          (m) => m.mealType !== meal.mealType
        );
        setSelectedMeals([...updated, meal]);
      }
    }
  };

  const totalSelected = selectedMeals.reduce(
    (acc, meal) => {
      acc.protein += meal.proteinBlocks;
      acc.carb += meal.carbBlocks;
      acc.fat += meal.fatBlocks;
      acc.total += meal.proteinBlocks + meal.carbBlocks + meal.fatBlocks;
      return acc;
    },
    { protein: 0, carb: 0, fat: 0, total: 0 }
  );

  const getBlockColor = (used, allowed) => {
    if (used === allowed) return "text-green-600";
    if (used < allowed) return "text-yellow-600";
    return "text-red-600";
  };

  const mealTypes = [
    { key: "breakfast", label: "Breakfast" },
    { key: "snack", label: "Snack" },
    { key: "lunch", label: "Lunch" },
    { key: "dinner", label: "Dinner" },
  ];

  return (
    <section className="max-w-7xl mx-auto mt-12 px-6">
      <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Daily Zone Blocks</h2>
        <p className="text-lg">
          <strong className="text-green-700 text-xl">
            {dailyBlocks.totalBlocks}
          </strong>{" "}
          total blocks per day.
        </p>
        <div className="mt-2 text-sm text-gray-700 space-y-1">
          <p>
            Protein Grams: <strong>{dailyBlocks.totalBlocks * 7}</strong>
          </p>
          <p>
            Carb Grams: <strong>{dailyBlocks.totalBlocks * 9}</strong>
          </p>
          <p>
            Fat Grams: <strong>{dailyBlocks.totalBlocks * 3}</strong>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            Sample Meals Matching Your Blocks
          </h3>

          {mealTypes.map(({ key, label }) => {
            const filteredMeals = meals.filter(
              (meal) =>
                meal.mealType === key &&
                meal.proteinBlocks <= dailyBlocks.proteinBlocks &&
                meal.carbBlocks <= dailyBlocks.carbBlocks &&
                meal.fatBlocks <= dailyBlocks.fatBlocks
            );

            return (
              <div key={key} className="mb-10">
                <h4 className="text-xl font-semibold mb-4 text-blue-700 border-b pb-1 border-blue-200">
                  {label} (choose {mealLimits[key]})
                </h4>
                {filteredMeals.length === 0 ? (
                  <p className="text-gray-500 italic">
                    No meals match your block limits.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredMeals.map((meal, idx) => {
                      const isSelected = selectedMeals.some(
                        (m) => m.name === meal.name
                      );
                      const totalBlocks = meal.totalBlocks;

                      return (
                        <div
                          key={idx}
                          onClick={() => toggleMealSelection(meal)}
                          className={`cursor-pointer bg-white rounded-lg border p-4 transition shadow ${
                            isSelected
                              ? "border-green-500 shadow-md"
                              : "hover:shadow-md"
                          }`}>
                          <h5 className="text-lg font-semibold text-gray-800 mb-1">
                            {meal.name}
                          </h5>
                          <p className="text-sm text-gray-600 mb-2">
                            {meal.description}
                          </p>
                          <p className="text-sm text-gray-700">
                            🥩 {meal.macros.proteinGrams}g | 🍞{" "}
                            {meal.macros.carbGrams}g | 🥑 {meal.macros.fatGrams}
                            g
                          </p>
                          <p className="text-sm font-semibold mt-1 text-indigo-600">
                            Total: {totalBlocks} blocks
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Your Selected Meals</h3>

              {selectedMeals.length === 0 ? (
                <p className="text-gray-500">No meals selected yet.</p>
              ) : (
                <ul className="space-y-2 mb-4 text-sm">
                  {selectedMeals.map((meal, idx) => (
                    <li key={idx} className="text-gray-700">
                      ✅ {meal.name} - 🥩 {meal.macros.proteinGrams}g | 🍞{" "}
                      {meal.macros.carbGrams}g | 🥑 {meal.macros.fatGrams}g
                    </li>
                  ))}
                </ul>
              )}

              <div className="bg-gray-100 p-3 rounded text-sm space-y-1">
                <p
                  className={getBlockColor(
                    totalSelected.protein * 7,
                    dailyBlocks.totalBlocks * 7
                  )}>
                  Protein: {totalSelected.protein * 7}g /{" "}
                  {dailyBlocks.totalBlocks * 7}g
                </p>
                <p
                  className={getBlockColor(
                    totalSelected.carb * 9,
                    dailyBlocks.totalBlocks * 9
                  )}>
                  Carbs: {totalSelected.carb * 9}g /{" "}
                  {dailyBlocks.totalBlocks * 9}g
                </p>
                <p
                  className={getBlockColor(
                    totalSelected.fat * 3,
                    dailyBlocks.totalBlocks * 3
                  )}>
                  Fat: {totalSelected.fat * 3}g / {dailyBlocks.totalBlocks * 3}g
                </p>
                <p className="font-bold mt-2">
                  <span
                    className={getBlockColor(
                      totalSelected.total / 3,
                      dailyBlocks.totalBlocks
                    )}>
                    Total Blocks: {totalSelected.total / 3} /{" "}
                    {dailyBlocks.totalBlocks}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MealListPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <InnerMealListPage />
    </Suspense>
  );
}
