import { useEffect } from "react";

export function usePageTitle(title) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} · Bookly` : "Bookly";

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}