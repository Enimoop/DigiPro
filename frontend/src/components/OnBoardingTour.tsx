import { useEffect, useMemo, useRef } from "react";
import { useTour } from "@reactour/tour";
import { useLocation } from "react-router-dom";

type Props = {
  open: boolean;
  isMobile: boolean;
  onClose: () => void;
};

type StepDef = {
  selector: string;
  title?: string;
  text: string;
};

export default function OnboardingTour({ open, isMobile, onClose }: Props) {
  const tour = useTour();
  const { pathname } = useLocation();


  const setSteps = tour?.setSteps;
  const setCurrentStep = tour?.setCurrentStep;
  const setIsOpen = tour?.setIsOpen;
  const isOpen = tour?.isOpen;

  // ---------- Steps HOME ----------
  const homeSteps: StepDef[] = useMemo(() => {
    const desktop: StepDef[] = [
      {
        selector: "body",
        title: "Bienvenue sur DigiPro 👋",
        text:
          "DigiPro95 vous aideà apprendre les bases du numérique avec des modules simples.\n\n" +
          "Nous allons vous montrer rapidement où sont les éléments importants 🙂 \n\n" +
          "Vous pouvez passer ce tuto à tout moment en cliquant sur la croix en haut à droite.",
      },
      {
        selector: '[data-tour="nav-sidebar"]',
        title: "Navigation",
        text: "Cette barre vous permet de naviguer entre les sections du site.",
      },
      {
        selector: '[data-tour="bottom-about"]',
        title: "À propos",
        text: "Retrouvez ici les informations générales sur le site.",
      },
      {
        selector: '[data-tour="bottom-profile"]',
        title: "Profil",
        text: "Accèdez à votre profil et votre progression.",
      },
      {
        selector: '[data-tour="bottom-settings"]',
        title: "Paramètres",
        text: "Ici vous pouvez régler les paramètres du site (thème, taille de la police, contraste).",
      },
      {
        selector: '[data-tour="intro-modules"]',
        title: "Choisir un module",
        text: "Cliquez maintenant sur une carte module. Le tuto continuera automatiquement dans le module.",
      },
    ];

    const mobile: StepDef[] = [
      {
        selector: "body",
        title: "Bienvenue sur DigiPro 👋",
        text: "DigiPro95 vous aideà apprendre les bases du numérique avec des modules simples.\n\n" +
          "Nous allons vous montrer rapidement où sont les éléments importants 🙂",
      },
      {
        selector: '[data-tour="burger"]',
        title: "Menu",
        text: "Sur mobile, le menu est ici. Appuie pour l’ouvrir.",
      },
      {
        selector: '[data-tour="bottom-about"]',
        title: "À propos",
        text: "Retrouvez ici les informations générales sur le site.",
      },
      {
        selector: '[data-tour="bottom-profile"]',
        title: "Profil",
        text: "Accèdez à votre profil et votre progression.",
      },
      {
        selector: '[data-tour="bottom-settings"]',
        title: "Paramètres",
        text: "Ici vous pouvez régler les paramètres du site (thème, taille de la police, contraste).",

      },
      {
        selector: '[data-tour="intro-modules"]',
        title: "Choisis un module 🙂",
        text: "Cliquez maintenant sur une carte module. Le tuto continuera automatiquement dans le module.",
      },
    ];

    return isMobile ? mobile : desktop;
  }, [isMobile]);

  // ---------- Steps MODULE ----------
  const moduleSteps: StepDef[] = useMemo(() => {
    const desktop: StepDef[] = [
      {
        selector: "body",
        title: "Bienvenue dans le module 🎉",
        text: "Chaque thème comprend une leçon divisée en parties, un quiz portant sur la leçon et un mini-jeu pour mettre en pratique ce que vous avez appris.",
      },
      {
        selector: '[data-tour="lesson-card"]',
        title: "Les thèmes",
        text: "Voici un thème. Il suffit de cliquer sur la carte pour démarrer la leçon. ",
      },
      {
        selector: 'body',
        title: "Fin du Tuto 🎊",
        text: "Vous savez maintenant où se trouve les éléments importants de DigiPro95. Il ne vous reste plus qu’à cliquer sur un thème pour commencer votre apprentissage !",
      },
    ];

    const mobile: StepDef[] = [
      {
        selector: "body",
        title: "Bienvenue dans le module 🎉",
        text: "Chaque thème comprend une leçon, un quiz et un mini-jeu.",
      },
      {
        selector: '[data-tour="lesson-card"]',
        title: "Les thèmes",
        text: "Voici un thème. Appuie sur la carte pour démarrer.",
      },
    ];

    return isMobile ? mobile : desktop;
  }, [isMobile]);

  // ---------- Route -> steps ----------
  const currentSteps = useMemo(() => {
    if (pathname.startsWith("/modules/")) return moduleSteps;
    return homeSteps;
  }, [pathname, homeSteps, moduleSteps]);

  // ---------- Refs ----------
  const didCloseRef = useRef(false);
  const lastRouteRef = useRef<string>("");


  useEffect(() => {
    if (!open) {
      lastRouteRef.current = "";
      didCloseRef.current = false;
      return;
    }

    if (!setSteps || !setCurrentStep || !setIsOpen) {
      console.warn("TourProvider manquant ou API Reactour indisponible");
      return;
    }


    if (lastRouteRef.current === pathname) return;
    lastRouteRef.current = pathname;

    const reactourSteps = currentSteps.map((s) => ({
      selector: s.selector,
      content: () => (
        <div>
          {s.title && <h4 style={{ margin: 0, fontWeight: 700 }}>{s.title}</h4>}
          <p style={{ marginTop: 10, whiteSpace: "pre-line", lineHeight: 1.4 }}>
            {s.text}
          </p>
        </div>
      ),
    }));

    setSteps(reactourSteps as any);
    setCurrentStep(0);
    setIsOpen(true);
  }, [open, pathname, currentSteps, setSteps, setCurrentStep, setIsOpen]);


  useEffect(() => {
    if (!open) return;

    if (isOpen === false && !didCloseRef.current) {
      didCloseRef.current = true;
      onClose();
    }
  }, [open, isOpen, onClose]);

  return null;
}