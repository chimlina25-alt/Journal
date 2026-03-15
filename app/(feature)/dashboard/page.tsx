"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import UserProfile from "@/app/components/UserProfile";
import { logout } from "@/app/(auth)/actions";
import { createClient } from "@/utils/supabase/client";

export default function DashboardPage() {

  const [time, setTime] = useState("");
  const [journalImage, setJournalImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const supabase = createClient();

  // CLOCK
  useEffect(() => {

    const updateTime = () => {

      const now = new Date();

      const hours = now.getHours();
      const minutes = now.getMinutes();

      const formatted =
        `${hours.toString().padStart(2, "0")} : ${minutes
          .toString()
          .padStart(2, "0")}`;

      setTime(formatted);

    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);

  }, []);

  // LOAD TODAY IMAGE
  const loadTodayImage = async () => {

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const { data, error } = await supabase
    .from("journals")
    .select("image_url, created_at")
    .eq("user_id", user.id)
    .not("image_url", "is", null)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  if (!data || data.length === 0) {
    setJournalImage(null);
    return;
  }

  const todayImage = data.find((item) =>
    item.created_at.startsWith(today)
  );

  if (todayImage) {
    const imageUrl = todayImage.image_url + "?t=" + new Date().getTime();
    setJournalImage(imageUrl);
  } else {
    setJournalImage(null);
  }

};

  useEffect(() => {
    loadTodayImage();
  }, []);

  // UPLOAD IMAGE
  const uploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];
    if (!file) return;

    // preview
    const preview = URL.createObjectURL(file);
    setPreviewImage(preview);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const fileName = `${user.id}-${Date.now()}`;

    const { error } = await supabase.storage
      .from("journal-images")
      .upload(fileName, file);

    if (error) {
      console.log(error);
      return;
    }

    const { data } = supabase
      .storage
      .from("journal-images")
      .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    await supabase.from("journals").insert({
  user_id: user.id,
  content: "Daily Memory Photo",
  status: "saved",
  image_url: imageUrl
});

setPreviewImage(null);
loadTodayImage();

  };

  return (
    <main
      className="min-h-screen relative flex items-center justify-center bg-cover bg-center px-6"
      style={{
        backgroundImage: `url('/${
          ["bg2.jpg","bg3.jpg","bg4.jpg","bg6.jpg","bg5.jpg","bg7.jpg","bg8.PNG"][new Date().getDay()]
        }')`,
      }}
    >

      {/* LOGOUT */}
      <div className="absolute top-6 right-6 z-50">
        <form action={logout}>
          <button className="bg-white/70 hover:bg-white/90 text-gray-800 font-semibold px-5 py-2 rounded-full shadow transition">
            Log out
          </button>
        </form>
      </div>

      <div className="w-full max-w-4xl">

        {/* PROFILE */}
        <div className="flex flex-col items-center mb-12">
          <UserProfile variant="center" />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-8 mb-14">

          {/* TIME */}
          <div className="bg-pink-200/60 rounded-3xl h-40 flex items-center justify-center text-4xl font-semibold shadow">
            {time}
          </div>

          {/* JOURNAL */}
          <Link href="/journal_page_saved">
            <div className="bg-pink-200/60 rounded-3xl h-40 flex flex-col items-center justify-center gap-2 shadow">
              <img src="/book.png" className="w-20 h-20" />
              <p className="text-sm font-medium">Your Journal</p>
            </div>
          </Link>

          {/* CHECKING ME */}
          <Link href="/notification_page">
            <div className="bg-pink-200/60 rounded-3xl h-40 flex flex-col items-center justify-center gap-2 shadow">
              <img src="/heart.png" className="w-16 h-16" />
              <p className="text-sm">Checking me</p>
            </div>
          </Link>

          {/* DAILY MEMORY PHOTO */}
          <div className="bg-pink-200/60 rounded-3xl h-40 shadow overflow-hidden flex items-center justify-center relative">

            {previewImage ? (

              <img
                src={previewImage}
                className="w-full h-full object-cover rounded-3xl"
              />

            ) : journalImage ? (

              <img
                src={journalImage}
                className="w-full h-full object-cover rounded-3xl"
              />

            ) : (

              <p className="text-sm italic text-gray-600">
                Upload today's memory photo
              </p>

            )}

            {/* IMAGE INPUT */}
            <input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              className="absolute bottom-2 text-xs bg-white/70 rounded p-1"
            />

          </div>

        </div>

        {/* NAVIGATION */}
        <div className="flex justify-center items-center gap-16">

          <Link href="/add_journal">
            <img src="/add.png" className="w-6 h-6 opacity-70" />
          </Link>

          <div className="bg-white/70 p-4 rounded-full shadow">
            <img src="/home.png" className="w-6 h-6" />
          </div>

          <Link href="/to_do_list">
            <img src="/edit.png" className="w-6 h-6 opacity-70" />
          </Link>

        </div>

      </div>

    </main>
  );
}