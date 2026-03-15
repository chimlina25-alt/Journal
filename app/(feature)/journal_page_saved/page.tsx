"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import Link from "next/link";
import UserProfile from "@/app/components/UserProfile";
import { createClient } from "@/utils/supabase/client";
import { Pacifico } from "next/font/google";
import { useRouter } from "next/navigation";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

type Journal = {
  id: string;
  content: string;
  created_at: string;
};

export default function JournalSavedPage() {

  const supabase = createClient();
  const router = useRouter();
  const [journals, setJournals] = useState<Journal[]>([]);

  useEffect(() => {
    loadJournals();
  }, []);

  const loadJournals = async () => {

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("journals")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "saved")
      .order("created_at", { ascending: false });

    setJournals(data || []);
  };

  const deleteJournal = async (id: string) => {

    const confirmDelete = confirm("Delete this journal?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("journals")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    setJournals(journals.filter(j => j.id !== id));
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center px-6 py-8"
      style={{
        backgroundImage: `url('/${
          ["bg2.jpg","bg3.jpg","bg4.jpg","bg6.jpg","bg5.jpg","bg7.jpg","bg8.PNG"][new Date().getDay()]
        }')`,
      }}
    >

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="relative flex items-center justify-center mb-8">

          <div className="flex items-center gap-4">
            <img src="/book.png" className="w-24 h-24" />
            <h1 className={`${pacifico.className} text-3xl text-black/80`}>
              Your Journal
            </h1>
          </div>

          <div className="absolute right-0">
            <UserProfile variant="compact" />
          </div>

        </div>

        {/* TABS */}
        <div className="flex justify-center gap-10 mb-10 text-white">
          <button className="font-semibold underline">Saved</button>
          <Link href="/journal_page_dr">Draft</Link>
        </div>

        {/* JOURNAL LIST */}
        <div className="space-y-6">

          {journals.map((journal) => (

            <div
              key={journal.id}
              onClick={() => router.push(`/add_journal?id=${journal.id}`)}
              className="bg-white/80 rounded-xl p-5 shadow relative cursor-pointer hover:scale-[1.02] transition"
            >

              {/* DELETE BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteJournal(journal.id);
                }}
                className="absolute top-3 right-3 opacity-70 hover:opacity-100"
              >
                
                 🗑
              </button>

              <p className="text-sm text-gray-500 mb-2">
                {new Date(journal.created_at).toLocaleDateString()}
              </p>

              <p>{journal.content}</p>

            </div>

          ))}

        </div>

        {/* NAV */}
        <div className="flex justify-center gap-16 mt-12">

          <Link href="/add_journal">
            <img src="/add.png" className="w-6"/>
          </Link>

          <Link href="/dashboard">
            <img src="/home.png" className="w-6"/>
          </Link>

          <Link href="/to_do_list">
            <img src="/edit.png" className="w-6"/>
          </Link>

        </div>

      </div>

    </main>
  );
}