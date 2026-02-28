import Link from "next/link";
export default function WriteJournalPage() {
  return (
    <main
      className="absolute inset-0 bg-cover bg-center filter brightness-110 saturate-75"
      style={{ backgroundImage: `url('/${['bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg6.jpg', 'bg5.jpg', 'bg7.jpg', 'bg8.PNG'][new Date().getDay()]}')` }}
    >
      <div className="max-w-5xl mx-auto">

        {/* USER */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-yellow-200 rounded-2xl flex items-center justify-center shadow">
            <span className="text-3xl">👤</span>
          </div>

          <div className="mt-3 flex items-center gap-2 bg-white/70 px-5 py-2 rounded-full text-sm">
            User Name
            <img src="/edit.png" className="w-4 h-4" />
          </div>
        </div>

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-4">
          <p className="italic font-medium">Tell me your day!</p>

          <div className="flex items-center gap-2 bg-white/60 px-3 py-1 rounded-lg text-sm">
            Sep 01, 2025
            <img src="/calendar.png" className="w-4 h-4" />
          </div>
        </div>

        {/* TOOLBAR */}
        <div className="bg-white/60 rounded-xl px-4 py-2 flex flex-wrap gap-3 text-sm mb-3">
          <button className="font-bold">B</button>
          <button className="italic">I</button>
          <button className="underline">U</button>
          <button>S</button>
          <select className="bg-transparent outline-none">
            <option>Heading 4</option>
          </select>
          <button>≡</button>
          <button>≣</button>
          <button>🔗</button>
          <button>🖼️</button>
          <button>⋯</button>
        </div>

        {/* JOURNAL BOX */}
        <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 min-h-[280px] mb-6 relative">
          <textarea
            placeholder="Start writing your thoughts..."
            className="w-full h-48 bg-transparent outline-none resize-none"
          />

          <div className="absolute bottom-4 right-4 flex gap-2">
            <button className="px-4 py-1 rounded-lg bg-white/60 text-sm">
              Draft
            </button>
            <Link href="/journal_page_saved"><button className="px-4 py-1 rounded-lg bg-black text-white text-sm">
              Save
            </button>
            </Link>
          </div>
        </div>

        {/* MOOD SLIDERS */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <input key={i} type="range" className="w-full accent-black" />
            ))}
          </div>

          {/* IMAGE UPLOAD */}
          <div className="flex gap-4">
            <div className="w-24 h-20 bg-white/60 rounded-xl flex items-center justify-center">
              <img src="/image.png" className="w-8" />
            </div>
            <div className="w-24 h-20 bg-white/60 rounded-xl flex items-center justify-center">
              <img src="/image.png" className="w-8" />
            </div>
          </div>
        </div>

        {/* BOTTOM NAV */}
        <div className="flex justify-center items-center gap-16">
          <div className="bg-white/70 p-4 rounded-full shadow">
            <img src="/add.png" className="w-6" />
          </div>

          <Link href="/dashboard"><img src="/home.png" alt="home" className="w-6 h-6" /></Link>
          <Link href="/to_do_list"><img src="/edit.png" alt="edit" className="w-6 h-6 opacity-70" /></Link>
        </div>

      </div>
    </main>
  );
}