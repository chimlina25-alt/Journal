"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserProfile from "@/app/components/UserProfile";
import { createClient } from "@/utils/supabase/client";

type Todo = {
  id: string;
  task: string;
  completed: boolean;
};

export default function TodoPage() {
  const supabase = createClient();
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading todos:", error);
    } else {
      // Ensure completed defaults to false if null
      const formattedData = (data || []).map((t: any) => ({
        ...t,
        completed: t.completed ?? false
      }));
      setTodos(formattedData);
    }
    setLoading(false);
  };

  const toggleComplete = async (todo: Todo) => {
    // Optimistic Update (Update UI immediately)
    const newTodos = todos.map(t => 
      t.id === todo.id ? { ...t, completed: !t.completed } : t
    );
    setTodos(newTodos);

    // Update Database
    const { error } = await supabase
      .from("todos")
      .update({ completed: !todo.completed })
      .eq("id", todo.id);

    if (error) {
      console.error("Failed to update task", error);
      // Revert on error
      loadTodos();
    }
  };

  const deleteTask = async (id: string) => {
    if(!confirm("Are you sure you want to delete this task?")) return;

    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Failed to delete task", error);
      alert("Failed to delete task");
    } else {
      // Update UI immediately
      setTodos(todos.filter(t => t.id !== id));
    }
  };

  return (
    <main
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('/${['bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg6.jpg', 'bg5.jpg', 'bg7.jpg', 'bg8.PNG'][new Date().getDay()]}')` }}
    >
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center mb-6">
          <UserProfile variant="center" />
        </div>

        <div className="flex items-center justify-center gap-6 mb-6">
          <h2 className="text-xl italic font-medium text-black drop-shadow-md">To-do List</h2>
          <Link href="/add_to_do">
            <button className="bg-purple-300/70 hover:bg-purple-300 px-6 py-2 rounded-lg text-sm font-medium transition">
              + ADD
            </button>
          </Link>
          <button onClick={loadTodos} className="text-black text-xs underline">
            Refresh
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4 shadow-lg mb-12">
          <div className="grid grid-cols-4 text-sm font-medium mb-3 px-4 text-black drop-shadow-md">
            <span>Done</span>
            <span>Task</span>
            <span>Status</span>
            <span className="text-right">Delete</span>
          </div>

          {loading ? (
            <p className="text-center text-blackpy-4">Loading tasks...</p>
          ) : todos.length === 0 ? (
            <p className="text-center text-black/80 py-4 italic">No tasks found. Add some!</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="grid grid-cols-4 items-center px-4 py-3 text-sm border-t border-white/30 text-black"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo)}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className={todo.completed ? "line-through opacity-70" : ""}>
                  {todo.task}
                </span>
                <span className="text-xs">
                  {todo.completed ? (
                    <span className="text-green-300 font-bold">Completed</span>
                  ) : (
                    <span className="text-red-200">Pending</span>
                  )}
                </span>
                <button
                  onClick={() => deleteTask(todo.id)}
                  className="text-right hover:scale-110 transition"
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-center items-center gap-16">
          <Link href="/add_journal">
            <img src="/add.png" className="w-6 hover:scale-110 transition" />
          </Link>
          <Link href="/dashboard">
            <img src="/home.png" className="w-6 hover:scale-110 transition" />
          </Link>
          <div className="bg-white/70 p-4 rounded-full shadow hover:bg-white transition cursor-pointer">
            <img src="/edit.png" className="w-6" />
          </div>
        </div>
      </div>
    </main>
  );
}