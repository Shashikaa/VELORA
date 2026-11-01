"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
export interface ResponseEntry {
  id: string;
  templateId: string;
  name: string;
  attending: boolean;
  guests: number;
  note: string;
  createdAt: string;
}
interface Store {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  responses: ResponseEntry[];
  addResponse: (r: Omit<ResponseEntry, "id" | "createdAt">) => void;
  clearResponses: () => void;
}
const Context = createContext<Store | null>(null);
export function WeddingProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]),
    [responses, setResponses] = useState<ResponseEntry[]>([]),
    [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      setFavorites(
        JSON.parse(localStorage.getItem("velora-favorites") || "[]"),
      );
      setResponses(
        JSON.parse(localStorage.getItem("velora-responses") || "[]"),
      );
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem("velora-favorites", JSON.stringify(favorites));
        localStorage.setItem("velora-responses", JSON.stringify(responses));
      } catch {}
    }
  }, [favorites, responses, ready]);
  return (
    <Context.Provider
      value={{
        favorites,
        toggleFavorite: (id) =>
          setFavorites((p) =>
            p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
          ),
        responses,
        addResponse: (r) =>
          setResponses((p) => [
            {
              ...r,
              id:
                typeof crypto.randomUUID === "function"
                  ? crypto.randomUUID()
                  : `rsvp-${Date.now()}-${Math.random().toString(36).slice(2)}`,
              createdAt: new Date().toISOString(),
            },
            ...p,
          ]),
        clearResponses: () => setResponses([]),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useWedding = () => {
  const ctx = useContext(Context);
  if (!ctx) throw Error("WeddingProvider is required");
  return ctx;
};
