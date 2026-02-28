import Link from "next/link";
export default function TodoPage() {
  return (
    <main
      className="absolute inset-0 bg-cover bg-center filter brightness-110 saturate-75"
      style={{ backgroundImage: `url('/${['bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg6.jpg', 'bg5.jpg', 'bg7.jpg', 'bg8.PNG'][new Date().getDay()]}')` }}
    >
      <div className="max-w-6xl mx-auto px-4 py-6">

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
        <div className="flex items-center justify-center gap-6 mb-6">
          <h2 className="text-xl italic font-medium">To-do List</h2>

          <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-lg text-sm">
            Sep 01, 2025
            <img src="/calendar.png" className="w-4 h-4" />
          </div>
          <Link href="/add_to_do">
            <button className="bg-purple-300/70 px-6 py-2 rounded-lg text-sm font-medium">
              + ADD
            </button></Link>
        </div>

        {/* TODO TABLE */}
        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4 shadow-lg mb-12">
          {/* TABLE HEADER */}
          <div className="grid grid-cols-4 text-sm font-medium mb-3 px-4">
            <span>To-do</span>
            <span>Task</span>
            <span>Time</span>
            <span className="text-right">More</span>
          </div>

          {/* ROWS */}
          {[
            "Gym",
            "Dance",
            "Making Dinner",
            "New Task",
            "Adding",
            "Management",
          ].map((task, index) => (
            <div
              key={index}
              className="grid grid-cols-4 items-center px-4 py-3 text-sm border-t border-white/30"
            >
              <input type="checkbox" className="w-4 h-4" />
              <span className="truncate">{task}</span>
              <span className="text-xs">6:00–7:00am</span>
              <span className="text-right text-lg">⋯</span>
            </div>
          ))}
        </div>

        {/* BOTTOM NAV */}
        <div className="flex justify-center items-center gap-16">

          <Link href="/add_journal"><img src="/add.png" className="w-6" /></Link>


          <Link href="/dashboard"><img src="/home.png" alt="home" className="w-6 h-6" /></Link>
          <div className="bg-white/70 p-4 rounded-full shadow">
            <img src="/edit.png" alt="edit" className="w-6 h-6 opacity-70" />
          </div>
        </div>

      </div>
    </main>
  );
}