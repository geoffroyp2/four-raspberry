/**
 * Generates a default name and description for the new Record
 */
export const getNewRecordAttributes = () => {
  const now = new Date();
  return {
    name: `Cuisson ${now.toLocaleDateString("fr-FR")} ${now.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })}`,
    description: `Cuisson démarrée le ${now.toLocaleDateString("fr-FR")} à ${now.toLocaleTimeString("fr-FR")}`,
  };
};
