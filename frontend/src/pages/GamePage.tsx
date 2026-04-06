import { useParams } from "react-router-dom";
import { getGameComponent } from "../config/gameRegistry";

export default function GamePage() {
  const { moduleId, themeId } = useParams();

  if (!moduleId || !themeId) {
    return <div>Page invalide</div>;
  }

  const GameComponent = getGameComponent(moduleId);

  if (!GameComponent) {
    return <div>Aucun jeu disponible pour ce module.</div>;
  }

  return <GameComponent themeId={themeId} />;
}
