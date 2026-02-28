import Link from "next/link";
export default function DashboardPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-6"
      style={{ backgroundImage: `url('/${['bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg6.jpg', 'bg5.jpg', 'bg7.jpg', 'bg8.PNG'][new Date().getDay()]}')` }}
    >
      <div className="w-full max-w-4xl">

        {/* USER SECTION */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-20 h-20 rounded-2xl bg-yellow-200 flex items-center justify-center mb-3 shadow">
            <span className="text-3xl">👤</span>
          </div>

          <div className="flex items-center gap-2 bg-white/70 px-5 py-2 rounded-full text-sm shadow">
            User Name
            <img src="/edit.png" alt="edit" className="w-4 h-4" />
          </div>
        </div>

        {/* GRID CARDS */}
        <div className="grid grid-cols-2 gap-8 mb-14">

          {/* TIME */}
          <div className="bg-pink-200/60 rounded-3xl h-40 flex items-center justify-center text-4xl font-semibold shadow">
            14 : 07
          </div>

          {/* YOUR JOURNAL */}
          <Link href="/journal_page_saved"><div className="bg-pink-200/60 rounded-3xl h-40 flex flex-col items-center justify-center gap-2 shadow">
            <img src="/book.png" alt="journal" className="w-30 h-30" />
            <p className="text-sm font-medium">Your Journal</p>
          </div></Link>

          {/* CHECKING ME */}
          <Link href="/notification_page"><div className="bg-pink-200/60 rounded-3xl h-40 flex flex-col items-center justify-center gap-2 shadow">
            <img src="/heart.png" alt="checking" className="w-28 h-28" />
            <p className="text-sm">Checking me</p>
          </div></Link>

          {/* GRAPH */}
          <div className="bg-pink-200/60 rounded-3xl h-40 flex items-center justify-center shadow">
            <img src="/line.png" alt="chart" className="w-90" />
          </div>
        </div>

        {/* BOTTOM NAV */}
        <div className="flex justify-center items-center gap-16">
          <Link href="/add_journal"><img src="/add.png" alt="add" className="w-6 h-6 opacity-70" /></Link>

          <div className="bg-white/70 p-4 rounded-full shadow">
            <img src="/home.png" alt="home" className="w-6 h-6" />
          </div>

          <Link href="/to_do_list"><img src="/edit.png" alt="edit" className="w-6 h-6 opacity-70" /></Link>
        </div>

      </div>
    </main>
  );
}