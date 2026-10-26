import { useEffect } from "react";

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Anti` : "Anti — Furniture for the way you live";
  }, [title]);
}
