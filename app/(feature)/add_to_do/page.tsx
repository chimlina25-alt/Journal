"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/app/contexts/UserContext";

export default function DailyCheckPage() {
  const { username } = useUser();
  const supabase = createClient();
  const router = useRouter();

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const saveTasks = async () => {
    if (tasks.length === 0) {
      alert("Please add at least one task!");
      return;
    }

    setIsSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      alert("You must be logged in to save tasks.");
      setIsSaving(false);
      return;
    }

    // FIX: Added 'completed: false' to match your to_do_list schema
  const insertData = tasks.map(t => ({
  user_id: user.id,
  task: t,
  completed: false
}));
    const { error } = await supabase
      .from("todos")
      .insert(insertData);

    setIsSaving(false);

    if (error) {
      console.error("Supabase Error:", error);
      alert("Failed to save tasks: " + error.message);
      return;
    }

    alert("Tasks saved successfully!");
    router.push("/to_do_list");
    router.refresh(); // Forces Next.js to refresh server data
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-6"
      style={{
        backgroundImage: `url('/${
          ['bg2.jpg','bg3.jpg','bg4.jpg','bg6.jpg','bg5.jpg','bg7.jpg','bg8.PNG'][new Date().getDay()]
        }')`
      }}
    >
      <div className="w-full max-w-5xl relative">
        <Link href="/to_do_list">
          <span className="absolute -top-10 left-0 text-lg italic hover:text-purple-600 transition">
            Back
          </span>
        </Link>

        <div className="bg-white/30 backdrop-blur-md rounded-3xl px-12 py-10 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6">
            Hii {username}! Did you complete your day?
          </h2>

          {/* INPUT */}
          <div className="flex mb-6">
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder="Enter your task"
              className="flex-1 bg-white/40 rounded-xl px-6 py-3 outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button
              onClick={addTask}
              className="ml-3 bg-purple-300 hover:bg-purple-400 px-5 rounded-lg transition"
            >
              Add
            </button>
          </div>

          {/* TASK PREVIEW */}
          <ul className="space-y-3 mb-8">
            {tasks.length === 0 && (
              <p className="text-center text-black/70 italic">No tasks added yet.</p>
            )}
            {tasks.map((t, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white/40 px-4 py-2 rounded-lg"
              >
                {t}
                <button onClick={() => deleteTask(index)} className="hover:scale-110 transition">
                  🗑️
                </button>
              </li>
            ))}
          </ul>

          {/* DONE */}
          <button
            onClick={saveTasks}
            disabled={isSaving}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-600 text-white"
            }`}
          >
            {isSaving ? "Saving..." : "Done"}
          </button>
        </div>
      </div>
    </main>
  );
}