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
  stepInteraction?: boolean;
};

export default function OnboardingTour({ open, isMobile, onClose }: Props) {
  const tour = useTour();
  const { pathname } = useLocation();

  const setSteps = tour?.setSteps;
  const setCurrentStep = tour?.setCurrentStep;
  const setIsOpen = tour?.setIsOpen;

  const lastPathRef = useRef<string>("");

  // =========================================================
  // HOME steps
  // =========================================================
  const homeSteps: StepDef[] = useMemo(() => {
    const desktop: StepDef[] = [
      {
        selector: "body",
        title: "Bienvenue sur DigiPro 👋",
        text:
          "DigiPro95 vous aide à apprendre les bases du numérique avec des modules simples.\n\n" +
          "Nous allons vous montrer rapidement où sont les éléments importants 🙂\n\n" +
          "Vous pouvez passer ce tuto à tout moment en cliquant sur la croix en haut à droite.",
      },
      {
        selector: '[data-tour="nav-sidebar"]',
        title: "Navigation",
        text: "Cette barre vous permet de naviguer entre les sections du site.",
        stepInteraction: false,
      },
      {
        selector: '[data-tour="bottom-about"]',
        title: "À propos",
        text: "Retrouvez ici les informations générales sur le site.",
        stepInteraction: false,
      },
      {
        selector: '[data-tour="bottom-profile"]',
        title: "Profil",
        text: "Accédez à votre profil et votre progression.",
        stepInteraction: false,
      },
      {
        selector: '[data-tour="bottom-settings"]',
        title: "Paramètres",
        text: "Ici vous pouvez régler les paramètres du site (thème, taille de la police, contraste).",
        stepInteraction: false,
      },
      {
        selector: '[data-tour="intro-modules"]',
        title: "Choisir un module",
        text: "Cliquez maintenant sur une carte module. Le tuto continuera automatiquement dans le module.",
        stepInteraction: true, // ✅ autorise clic sur module
      },
    ];

    const mobile: StepDef[] = [
      {
        selector: "body",
        title: "Bienvenue sur DigiPro 👋",
        text:
          "DigiPro95 vous aide à apprendre les bases du numérique avec des modules simples.\n\n" +
          "Nous allons vous montrer rapidement où sont les éléments importants 🙂",
      },
      {
        selector: '[data-tour="burger"]',
        title: "Menu",
        text: "Sur mobile, le menu est ici.",
        stepInteraction: false,
      },
      {
        selector: '[data-tour="bottom-about"]',
        title: "À propos",
        text: "Retrouvez ici les informations générales sur le site.",
        stepInteraction: false,
      },
      {
        selector: '[data-tour="bottom-profile"]',
        title: "Profil",
        text: "Accédez à votre profil et votre progression.",
        stepInteraction: false,
      },
      {
        selector: '[data-tour="bottom-settings"]',
        title: "Paramètres",
        text: "Ici vous pouvez régler les paramètres du site (thème, taille de la police, contraste).",
        stepInteraction: false,
      },
      {
        selector: '[data-tour="intro-modules"]',
        title: "Choisis un module 🙂",
        text: "Cliquez maintenant sur une carte module. Le tuto continuera automatiquement dans le module.",
        stepInteraction: true, // ✅ autorise clic module
      },
    ];

    return isMobile ? mobile : desktop;
  }, [isMobile]);

  // =========================================================
  // MODULE steps
  // =========================================================
  const moduleSteps: StepDef[] = useMemo(() => {
    return [
      {
        selector: "body",
        title: "Bienvenue dans le module 🎉",
        text:
          "Chaque thème comprend une leçon divisée en parties, un quiz portant sur la leçon et un mini-jeu pour mettre en pratique ce que vous avez appris.",
      },
      {
        selector: '[data-tour="lesson-card"]',
        title: "Les thèmes",
        text: "Voici un thème. Il suffit de cliquer sur la carte pour démarrer la leçon.",
        stepInteraction: true, // ✅ autorise clic theme
      },
      {
        selector: "body",
        title: "Fin du Tuto 🎊",
        text:
          "Vous savez maintenant où se trouvent les éléments importants de DigiPro95.\n\n" +
          "Il ne vous reste plus qu’à cliquer sur un thème pour commencer votre apprentissage !",
      },
    ];
  }, []);

  // =========================================================
  // Route -> steps
  // =========================================================
  const currentSteps = useMemo(() => {
    return pathname.startsWith("/modules/") ? moduleSteps : homeSteps;
  }, [pathname, moduleSteps, homeSteps]);


  useEffect(() => {
    if (!open) {
      lastPathRef.current = "";
      return;
    }

    if (!setSteps || !setCurrentStep || !setIsOpen) {
      console.warn("TourProvider manquant ou API Reactour indisponible");
      return;
    }

    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;

    const reactourSteps = currentSteps.map((s) => ({
      selector: s.selector,
      stepInteraction: s.stepInteraction ?? false,
      content: () => (
        <div>
          {s.title && <h4 style={{ margin: 0, fontWeight: 700 }}>{s.title}</h4>}
          <p style={{ marginTop: 10, whiteSpace: "pre-line", lineHeight: 1.4 }}>
            {s.text}
          </p>
        </div>
      ),
    }));

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setSteps(reactourSteps as any);
        setCurrentStep(0);
        setIsOpen(true);
      });
    });
  }, [open, pathname, currentSteps, setSteps, setCurrentStep, setIsOpen]);

  const completedRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    if (completedRef.current) return;

    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isCloseBtn =
        target.classList.contains("reactour__close-button") ||
        !!target.closest(".reactour__close-button");

      if (!isCloseBtn) return;

      completedRef.current = true;
      onClose();
    };

    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, [open, onClose]);

  return null;
}