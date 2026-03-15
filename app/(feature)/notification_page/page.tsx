"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import Link from "next/link";
import UserProfile from "@/app/components/UserProfile";
import { useUser } from "@/app/contexts/UserContext";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

type Notification = {
  id: string;
  message: string;
  status: string;
  created_at: string;
};

export default function CheckingMePage() {

  const { username } = useUser();
  const supabase = createClient();
  const router = useRouter();

  const [messages,setMessages] = useState<Notification[]>([]);
  const [search,setSearch] = useState("");

  useEffect(()=>{
    checkDailyNotification();
    loadNotifications();
  },[]);

  // CREATE DAILY MESSAGE
  const checkDailyNotification = async () => {

    const { data:{user} } = await supabase.auth.getUser();
    if(!user) return;

    const today = new Date();
    today.setHours(0,0,0,0);

    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id",user.id)
      .gte("created_at",today.toISOString());

    if(!data || data.length === 0){

      const message =
        `Hi ${username}! How was your to-do list today? Did you complete everything you planned?`;

      await supabase
        .from("notifications")
        .insert({
          user_id:user.id,
          message:message,
          status:"Unread"
        });

      alert("💙 Daily check-in created!");
    }
  };

  // LOAD MESSAGES
  const loadNotifications = async () => {

    const { data:{user} } = await supabase.auth.getUser();
    if(!user) return;

    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id",user.id)
      .order("created_at",{ascending:false});

    setMessages(data || []);
  };

  // MARK READ
  const markRead = async(id:string) => {

    await supabase
      .from("notifications")
      .update({status:"Read"})
      .eq("id",id);

    setMessages(messages.map(m =>
      m.id === id ? {...m,status:"Read"} : m
    ));
  };

  // DELETE
  const deleteMessage = async(id:string) => {

    await supabase
      .from("notifications")
      .delete()
      .eq("id",id);

    setMessages(messages.filter(m=>m.id!==id));
  };

  const filteredMessages = messages.filter(m =>
    m.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main
      className="absolute inset-0 bg-cover bg-center brightness-110 saturate-75"
      style={{ backgroundImage: `url('/${['bg2.jpg','bg3.jpg','bg4.jpg','bg6.jpg','bg5.jpg','bg7.jpg','bg8.PNG'][new Date().getDay()]}')` }}
    >

      <div className="max-w-6xl mx-auto px-6 py-6">

        {/* HEADER */}
        <div className="relative mb-8">

          <div className="flex flex-col items-center">
            <img src="/heart.png" className="w-12 mb-1" />
            <h1 className="font-semibold text-white">
              Checking me
            </h1>
          </div>

          <div className="absolute right-0 top-0">
            <UserProfile variant="compact"/>
          </div>

        </div>

        {/* SEARCH */}
        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search"
          className="w-full bg-white/80 rounded-xl px-4 py-3 shadow mb-10 outline-none"
        />

        {/* MESSAGE LIST */}
        <div className="space-y-10">

          {filteredMessages.map((msg)=>(

            <div
              key={msg.id}
              onClick={()=>router.push("/to_do_list")}
              className="bg-blue-400/40 backdrop-blur-md rounded-2xl p-8 shadow-lg cursor-pointer hover:scale-[1.02] transition"
            >

              <div className="flex justify-between items-start">

                <div>

                  <p className="font-semibold text-white">
                    {new Date(msg.created_at).toLocaleDateString()} : Hi {username}!!
                  </p>

                  <p className="text-sm mt-2 text-white">
                    {msg.message}
                  </p>

                </div>

                <div
                  className="flex gap-2"
                  onClick={(e)=>e.stopPropagation()}
                >

                  <button
                    onClick={()=>markRead(msg.id)}
                    className="bg-blue-200/70 px-3 py-1 rounded-md text-sm shadow"
                  >
                    {msg.status}
                  </button>

                  <button
                    onClick={()=>deleteMessage(msg.id)}
                    className="bg-blue-200/70 px-3 py-1 rounded-md text-sm shadow"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* NAV */}
        <div className="flex justify-center gap-20 mt-7">

          <Link href="/add_journal">
            <img src="/add.png" className="w-7 opacity-70"/>
          </Link>

          <Link href="/dashboard">
            <img src="/home.png" className="w-7 opacity-70"/>
          </Link>

          <Link href="/to_do_list">
            <img src="/edit.png" className="w-6 opacity-70"/>
          </Link>

        </div>

      </div>

    </main>
  );
}