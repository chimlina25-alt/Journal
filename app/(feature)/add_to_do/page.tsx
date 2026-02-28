import Link from "next/link";

export default function DailyCheckPage() {
  const tasks = [
    "Wake up early",
    "Write today’s journal entry",
    "Attend online class",
    "Review notes",
    "Sleep before 11 PM",
  ];

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center brightness-110 saturate-75 px-6"
      style={{ backgroundImage: `url('/${['bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg6.jpg', 'bg5.jpg', 'bg7.jpg', 'bg8.PNG'][new Date().getDay()]}')` }}
    >
      <div className="w-full max-w-5xl relative">

        {/* BACK */}
        <Link href="/to_do_list">
          <span className="absolute -top-10 left-0 text-lg italic font-medium cursor-pointer">
            Back
          </span>
        </Link>

        {/* CARD */}
        <div className="relative bg-white/30 backdrop-blur-md rounded-3xl border border-black/40 px-12 py-10 shadow-xl">

          {/* TITLE */}
          <h2 className="text-2xl font-semibold mb-6">
            Hii User name!! Did you complete your day?
          </h2>

          {/* INPUT FIELD */}
          <div className="flex items-center mb-8">
            <input
              type="text"
              placeholder="Enter your list"
              className="flex-1 bg-white/40 rounded-xl px-6 py-3 outline-none text-sm"
            />
            <Link href="/delete_to_do">
              <button className="ml-3 text-xl">
                🗑️
              </button>
            </Link>
          </div>

          {/* TASK LIST */}
          <ul className="space-y-4 text-lg mb-10 list-disc pl-6">
            {tasks.map((task, index) => (
              <li key={index}>
                {task}
              </li>
            ))}
          </ul>

          {/* DONE BUTTON */}
          <button className="bg-gray-400/70 px-8 py-2 rounded-lg shadow text-sm">
            Done
          </button>

          {/* ILLUSTRATION */}
          <img
            src="/to_do.png"
            alt="character"
            className="absolute -bottom-35 left-180 w-108"
          />
        </div>
      </div>
    </main>
  );
}