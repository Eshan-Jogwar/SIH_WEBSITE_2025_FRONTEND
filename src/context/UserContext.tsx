import React, { createContext, useContext } from "react";
import type { User } from "../types";

interface UserContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

interface UserProviderProps {
  user: User | null;
  setUser: (user: User | null) => void;
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({
  user,
  setUser,
  children,
}) => {
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
}
