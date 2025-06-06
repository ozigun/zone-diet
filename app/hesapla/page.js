"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BlockCalculator() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    height: "",
    weight: "",
    activityLevel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basit doğrulama
    const { gender, age, height, weight, activityLevel } = formData;
    if (!gender || !age || !height || !weight || !activityLevel) {
      alert("Please fill in all fields.");
      return;
    }

    // Query paramlarla sonuç sayfasına yönlendir
    const query = new URLSearchParams(formData).toString();
    router.push(`/yemek-listesi?${query}`);
  };

  return (
    <section className="max-w-md mx-auto bg-green-100 p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-900">
        Block Calculator
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block mb-1 font-semibold text-gray-800"
            htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded px-3 py-2 text-gray-900">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label
            className="block mb-1 font-semibold text-gray-800"
            htmlFor="age">
            Age (years)
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded px-3 py-2 text-gray-900"
            min="10"
            max="120"
          />
        </div>

        <div>
          <label
            className="block mb-1 font-semibold text-gray-800"
            htmlFor="height">
            Height (cm)
          </label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded px-3 py-2 text-gray-900"
            min="50"
            max="250"
          />
        </div>

        <div>
          <label
            className="block mb-1 font-semibold text-gray-800"
            htmlFor="weight">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded px-3 py-2 text-gray-900"
            min="20"
            max="300"
          />
        </div>

        <div>
          <label
            className="block mb-1 font-semibold text-gray-800"
            htmlFor="activityLevel">
            Weekly Exercise Frequency
          </label>
          <select
            id="activityLevel"
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded px-3 py-2 text-gray-900">
            <option value="">Select frequency</option>
            <option value="0">0 days</option>
            <option value="1-2">1-2 days</option>
            <option value="3-4">3-4 days</option>
            <option value="5+">5 or more days</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800 transition">
          Calculate Blocks
        </button>
      </form>
    </section>
  );
}
