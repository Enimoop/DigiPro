import type { ComponentType } from "react";
import BureautiqueGameComponent from "../components/BureautiqueGameComponent";
import PasswordGameComponent from "../components/PasswordGameComponent";

export interface GameComponentProps {
  themeId?: string;
}

export interface GameRegistry {
  [moduleId: string]: ComponentType<GameComponentProps>;
}

export const gameRegistry: GameRegistry = {
  bureautique: BureautiqueGameComponent,
  passwords: PasswordGameComponent,
  // Ajoute d'autres jeux ici au fur et à mesure
  // cybersecurite: CyberGameComponent,
};

export const getGameComponent = (moduleId: string): ComponentType<GameComponentProps> | null => {
  return gameRegistry[moduleId] || null;
};

export const hasGame = (moduleId: string): boolean => {
  return moduleId in gameRegistry;
};
