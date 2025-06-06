import Link from "next/link";

export default function HomePage() {
  return (
    <section className="text-center space-y-6">
      <h2 className="text-4xl font-extrabold text-green-700">
        What is the Zone Diet?
      </h2>

      <p className="max-w-xl mx-auto text-lg leading-relaxed">
        The Zone Diet is a nutritional approach that aims to balance hormones in
        the body by consuming the right proportions of protein, carbohydrates,
        and fats.
      </p>

      <p className="max-w-xl mx-auto text-lg leading-relaxed">
        On this platform, you can calculate your daily block needs based on your
        personal information and get meal suggestions tailored just for you.
      </p>

      <Link
        href="/hesapla"
        className="inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
        Start Block Calculation
      </Link>
    </section>
  );
}
