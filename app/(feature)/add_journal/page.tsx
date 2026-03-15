"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import UserProfile from "@/app/components/UserProfile";
import { createClient } from "@/utils/supabase/client";

export default function AddJournalPage() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const journalId = searchParams.get("id");

  const supabase = createClient();
  const editorRef = useRef<HTMLDivElement | null>(null);

  const [date, setDate] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  // DATE
  useEffect(() => {

    const now = new Date();

    const formatted = now.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    setDate(formatted);

  }, []);

  // LOAD JOURNAL IF EDIT MODE
  useEffect(() => {

    const loadJournal = async () => {

      if (!journalId) return;

      const { data } = await supabase
        .from("journals")
        .select("*")
        .eq("id", journalId)
        .single();

      if (!data) return;

      if (editorRef.current) {
        editorRef.current.innerText = data.content;
      }

      setExistingImage(data.image_url);

    };

    loadJournal();

  }, [journalId]);

  const formatText = (command: string) => {
    document.execCommand(command);
  };

  const saveJournal = async (type: "saved" | "draft") => {

    if (!editorRef.current) return;

    const text = editorRef.current.innerText;
    if (!text.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    let imageUrl = existingImage;

    // UPLOAD IMAGE
    if (image) {

      const fileName = `${user.id}-${Date.now()}`;

      const { error } = await supabase.storage
        .from("journal-images")
        .upload(fileName, image);

      if (!error) {

        const { data } = supabase
          .storage
          .from("journal-images")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;

      }

    }

    if (journalId) {

      await supabase
        .from("journals")
        .update({
          content: text,
          status: type,
          image_url: imageUrl
        })
        .eq("id", journalId);

    } else {

      await supabase
        .from("journals")
        .insert({
          user_id: user.id,
          content: text,
          status: type,
          image_url: imageUrl
        });

    }

    router.push("/journal_page_saved");

  };

  return (
    <main
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url('/${
          ["bg2.jpg","bg3.jpg","bg4.jpg","bg6.jpg","bg5.jpg","bg7.jpg","bg8.PNG"][new Date().getDay()]
        }')`,
      }}
    >

      <div className="max-w-5xl mx-auto p-6">

        <div className="flex justify-center mb-6">
          <UserProfile variant="center" />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <p className="italic font-medium">Tell me about your day 🌷</p>

          <div className="bg-white/70 px-3 py-1 rounded-lg text-sm">
            {date}
          </div>
        </div>

        {/* TOOLBAR */}
        <div className="bg-white/70 rounded-xl px-4 py-2 flex gap-3 mb-3">
          <button onClick={() => formatText("bold")} className="font-bold">B</button>
          <button onClick={() => formatText("italic")} className="italic">I</button>
          <button onClick={() => formatText("underline")} className="underline">U</button>
        </div>

        {/* EDITOR */}
        <div className="bg-white/60 backdrop-blur rounded-3xl p-6 min-h-[280px] relative mb-6">

          <div
            ref={editorRef}
            contentEditable
            className="outline-none min-h-[200px]"
          />

          

          <div className="absolute bottom-4 right-4 flex gap-3">

            <button
              onClick={() => saveJournal("draft")}
              className="px-4 py-1 rounded-lg bg-white"
            >
              Draft
            </button>

            <button
              onClick={() => saveJournal("saved")}
              className="px-4 py-1 rounded-lg bg-black text-white"
            >
              Save
            </button>

          </div>

        </div>

        {/* NAV */}
        <div className="flex justify-center gap-16">

          <div className="bg-white/70 p-4 rounded-full shadow">
            <img src="/add.png" className="w-6"/>
          </div>

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