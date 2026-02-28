import Link from "next/link";

export default function CheckingMePage() {
  const messages = [
    {
      date: "21/02/2026",
      status: "Unread",
    },
    {
      date: "21/02/2026",
      status: "Unread",
    },
    {
      date: "21/02/2026",
      status: "Read",
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
            <img src="/heart.png" className="w-12 mb-1" />
            <h1 className="font-semibold">Checking me</h1>
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
          className="w-full bg-white/80 rounded-xl px-4 py-3 shadow mb-10 outline-none"
        />

        {/* ================= MESSAGE LIST ================= */}
        <div className="space-y-10">

          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-blue-400/40 backdrop-blur-md rounded-2xl p-8 shadow-lg"
            >
              <div className="flex justify-between items-start">

                {/* TEXT */}
                <div>
                  <p className="font-semibold">
                    {msg.date} : Hi Username !!
                  </p>

                  <p className="text-sm mt-2">
                    How was your to-do list today? Did you complete
                    everything you planned?
                  </p>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-2">
                  <button className="bg-blue-200/70 px-3 py-1 rounded-md text-sm shadow">
                    {msg.status}
                  </button>

                  <button className="bg-blue-200/70 px-3 py-1 rounded-md text-sm shadow">
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* ================= BOTTOM NAV ================= */}
        <div className="flex justify-center gap-20 mt-7">

          <Link href="/add_journal">
            <img src="/add.png" className="w-7 opacity-70" />
          </Link>

          <Link href="/dashboard">
            <img src="/home.png" className="w-7 opacity-70" />
          </Link>

          <Link href="/to_do_list">
            <img src="/edit.png" className="w-6 opacity-70" />
          </Link>

        </div>

      </div>
    </main>
  );
}