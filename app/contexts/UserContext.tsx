"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";

interface UserContextType {
  user: User | null;
  username: string;
  avatarUrl: string | null;
  loading: boolean;
  updateUsername: (newName: string) => Promise<{ error: Error | null }>;
  updateAvatar: (newAvatarBase64: string) => Promise<{ error: Error | null }>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string>("User Name");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const pathname = usePathname();

  const updateUsername = async (newName: string) => {
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: newName,
        fullName: newName,
        name: newName,
      }
    });

    if (!error) {
      setUsername(newName);
    }
    return { error };
  };

  const updateAvatar = async (newAvatarBase64: string) => {
    const { error } = await supabase.auth.updateUser({
      data: {
        avatar_url: newAvatarBase64,
      }
    });

    if (!error) {
      setAvatarUrl(newAvatarBase64);
    }
    return { error };
  };

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const nameFallback = user.user_metadata?.full_name || user.user_metadata?.fullName || user.user_metadata?.name || user.email?.split("@")[0] || "User Name";
        setUsername(nameFallback);
        setAvatarUrl(user.user_metadata?.avatar_url || null);
      } else {
        setUser(null);
        setUsername("User Name");
        setAvatarUrl(null);
      }
      setLoading(false);
    }

    loadUser();
  }, [supabase.auth, pathname]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          const nameFallback = session.user.user_metadata?.full_name || session.user.user_metadata?.fullName || session.user.user_metadata?.name || session.user.email?.split("@")[0] || "User Name";
          setUsername(nameFallback);
          setAvatarUrl(session.user.user_metadata?.avatar_url || null);
        } else {
          setUser(null);
          setUsername("User Name");
          setAvatarUrl(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <UserContext.Provider value={{ user, username, avatarUrl, loading, updateUsername, updateAvatar }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
