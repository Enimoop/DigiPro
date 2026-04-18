import type { ComponentType } from "react";
import BureautiqueGameComponent from "../components/BureautiqueGameComponent";
import PasswordGameComponent from "../components/PasswordGameComponent";
import PhishingGameComponent from "../components/PhishingGameComponent";

export interface GameComponentProps {
  themeId?: string;
  onGameComplete?: () => void | Promise<void>;
}

export interface GameRegistry {
  [moduleId: string]: ComponentType<GameComponentProps>;
}

export const gameRegistry: GameRegistry = {
  bureautique: BureautiqueGameComponent,
  passwords: PasswordGameComponent,
  email: PhishingGameComponent,
};

export const getGameComponent = (moduleId: string): ComponentType<GameComponentProps> | null => {
  return gameRegistry[moduleId] || null;
};

export const hasGame = (moduleId: string): boolean => {
  return moduleId in gameRegistry;
};
