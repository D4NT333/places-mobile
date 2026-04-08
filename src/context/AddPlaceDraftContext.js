import React, { createContext, useContext, useMemo, useState } from "react";

const AddPlaceDraftContext = createContext(null);

const initialDraft = {
  name: "",
  description: "",
  photos: [],
  selectedLocation: null,
  filters: null,
};

export function AddPlaceDraftProvider({ children }) {
  const [draft, setDraft] = useState(initialDraft);

  const updateDraft = (patch) => {
    setDraft((prev) => ({
      ...prev,
      ...patch,
    }));
  };

  const resetDraft = () => {
    setDraft(initialDraft);
  };

  const value = useMemo(() => {
    return {
      draft,
      updateDraft,
      resetDraft,
    };
  }, [draft]);

  return (
    <AddPlaceDraftContext.Provider value={value}>
      {children}
    </AddPlaceDraftContext.Provider>
  );
}

export function useAddPlaceDraft() {
  const context = useContext(AddPlaceDraftContext);

  if (!context) {
    throw new Error("useAddPlaceDraft debe usarse dentro de AddPlaceDraftProvider");
  }

  return context;
}