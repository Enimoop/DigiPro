import { useParams } from "react-router-dom";
import { getGameComponent } from "../config/gameRegistry";
import { completeTheme } from "../api";
import { useModules } from "../contexts/ModulesProvider";

export default function GamePage() {
  const { moduleId, themeId } = useParams();
  const { getTheme } = useModules();

  if (!moduleId || !themeId) {
    return <div>Page invalide</div>;
  }

  const GameComponent = getGameComponent(moduleId);

  if (!GameComponent) {
    return <div>Aucun jeu disponible pour ce module.</div>;
  }

  const handleGameComplete = async () => {
    const theme = getTheme(moduleId, themeId);
    if (theme && theme.id) {
      try {
        await completeTheme(theme.id);
      } catch (err) {
        console.error("Failed to mark theme as complete:", err);
      }
    }
  };

  return <GameComponent themeId={themeId} onGameComplete={handleGameComplete} />;
}
