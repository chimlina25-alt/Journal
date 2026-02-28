import Link from "next/link";
export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg1.jpg')" }}
    >
      <section className="text-center max-w-3xl px-6">

        {/* Title */}
        <h1 className="text-3xl font-semibold mb-6">
          Welcome to Your Daily Journal
        </h1>

        <p className="italic mb-4">Every day is a blank page.</p>

        <p className="text-gray-700 leading-relaxed mb-12">
          Write your story, capture small moments, and turn everyday thoughts into something meaningful.
          Use this journal to reflect on your feelings, record your experiences, and grow through honest
          self-expression.
        </p>

        {/* Sticker Character */}
        <div className="flex justify-center mb-6">
          <img
            src="/pic1.png"
            alt="Journal character"
            className="w-80"
          />
        </div>

        {/* Button with Sticker */}
        <div className="relative inline-flex items-center">
          <Link href="/login">
            <button className="px-8 py-3 rounded-xl border-2 border-pink-300 bg-pink-100 text-pink-600 font-medium">
              Begin Your Journal
            </button>
          </Link>

          
        </div>

      </section>
    </main>
  );
}