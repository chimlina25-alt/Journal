import Link from "next/link";

export default function DashboardPage() {
  const journals = [
    {
      date: "18/02/2026",
      text: "Today was a busy day, but I felt productive. I finished my tasks earlier than expected and had some time to relax in the evening.",
    },
    {
      date: "17/02/2026",
      text: "I felt a little tired today, but I tried my best. Some things didn't go as planned, but I learned to be patient with myself.",
    },
    {
      date: "16/02/2026",
      text: "Today I spent time learning something new. It was challenging at first, but I'm proud that I didn't give up.",
    },
  ];

  return (
    <main
      className="absolute inset-0 bg-cover bg-center filter brightness-110 saturate-75"
      style={{ backgroundImage: `url('/${['bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg6.jpg', 'bg5.jpg', 'bg7.jpg', 'bg8.PNG'][new Date().getDay()]}')` }}
    >
      <div className="max-w-6xl mx-auto px-6 py-6">

        {/* ================= HEADER ================= */}
        <div className="relative mb-8">

          {/* CENTER TITLE */}
          <div className="flex flex-col items-center">
            <img src="/book.png" className="w-20 mb-1" />
            <h1 className="font-semibold">Your Journal</h1>
          </div>

          {/* USER */}
          <div className="absolute right-0 top-0 flex flex-col items-center">
            <div className="bg-yellow-200 p-3 rounded-xl shadow">
              👤
            </div>

            <div className="flex items-center gap-1 bg-white/70 px-3 py-1 rounded-full mt-2 text-sm shadow">
              User Name
              <img src="/edit.png" className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* ================= SEARCH ================= */}
        <input
          placeholder="Search"
          className="w-full bg-white/80 rounded-xl px-4 py-3 shadow mb-8 outline-none"
        />


        {/* TABS */}
        <div className="flex justify-center items-center gap-12 mb-10">
          <Link href="/journal_page_saved">
            <button className="bg-white/70 px-4 py-1 rounded-md shadow">Saved</button>
          </Link>

          <div className="h-6 w-[1px] bg-black/30"></div>

          <Link href="/journal_page_dr">
            <button className="font-medium">
              Draft
            </button>
          </Link>
        </div>

        {/* JOURNAL LIST */}
        <div className="space-y-6 mb-12">
          {journals.map((item, index) => (
            <div
              key={index}
              className="bg-white/70 rounded-2xl p-5 flex justify-between items-center shadow"
            >
              {/* TEXT */}
              <div className="max-w-xl">
                <p className="text-sm">
                  <span className="font-semibold">
                    {item.date} :
                  </span>{" "}
                  {item.text}
                </p>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex items-center gap-6">

                {/* IMAGE PREVIEW */}
                <div className="flex gap-2">
                  <div className="w-14 h-14 bg-gray-200 rounded-md flex items-center justify-center">
                    🖼️
                  </div>
                  <div className="w-14 h-14 bg-gray-300 rounded-md flex items-center justify-center">
                    🖼️
                  </div>
                </div>

                {/* STAR RATING */}
                <div className="flex gap-1 text-gray-500 text-lg">
                  ☆☆☆☆☆
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM NAV */}
        <div className="flex justify-center items-center gap-16">
          <Link href="/add_journal">
            <img src="/add.png" className="w-6" />
          </Link>

          <Link href="/dashboard">
            <img src="/home.png" alt="home" className="w-6 h-6" />
          </Link>

          <Link href="/to_do_list">
            <img src="/edit.png" alt="edit" className="w-6 h-6 opacity-70" />
          </Link>
        </div>

      </div>
    </main>
  );
}