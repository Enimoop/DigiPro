import { lazy, type ComponentType, type LazyExoticComponent } from "react";

export interface GameComponentProps {
  themeId?: string;
  onGameComplete?: () => void | Promise<void>;
}

export interface GameRegistry {
  [moduleId: string]: LazyExoticComponent<ComponentType<GameComponentProps>>;
}

export const gameRegistry: GameRegistry = {
  bureautique: lazy(() => import("../components/BureautiqueGameComponent")),
  passwords: lazy(() => import("../components/PasswordGameComponent")),
  email: lazy(() => import("../components/PhishingGameComponent")),
};

export const getGameComponent = (moduleId: string): LazyExoticComponent<ComponentType<GameComponentProps>> | null => {
  return gameRegistry[moduleId] || null;
};

export const hasGame = (moduleId: string): boolean => {
  return moduleId in gameRegistry;
};
