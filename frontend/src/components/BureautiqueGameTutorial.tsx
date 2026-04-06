import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

type Props = {
  show: boolean;
  onClose: () => void;
};

export default function BureautiqueGameTutorial({ show, onClose }: Props) {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (!show) return;
    setAnimationPhase(0);

    // Animation en phases
    const timings = [500, 2000, 3500];
    const timers = timings.map((delay, index) =>
      setTimeout(() => {
        setAnimationPhase(index + 1);
      }, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [show]);

  return (
    <Modal show={show} onHide={onClose} centered size="lg" className="bureautique-tutorial-modal">
      <Modal.Header closeButton>
        <Modal.Title>Comment jouer ? 🎮</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bureautique-tutorial-body">
        {/* Animation de démonstration */}
        <div className="bureautique-tutorial-demo mb-4">
          {/* Fichier */}
          <div
            className={`tutorial-file ${animationPhase >= 1 ? "dragging-animation" : ""}`}
          >
            <FeatherIcon icon="file" size={40} />
            <div className="mt-2">
              <strong>Rapport</strong>
              <div className="small text-muted">.docx</div>
            </div>
          </div>

          {/* Flèche/indication */}
          {animationPhase >= 1 && (
            <div className="tutorial-arrow">
              <FeatherIcon icon="arrow-right" size={32} />
            </div>
          )}

          {/* Boîtes de destination */}
          <div className="tutorial-boxes">
            <div className={`tutorial-box ${animationPhase >= 2 ? "highlight" : ""}`}>
              <FeatherIcon icon="file-text" size={28} style={{ color: "#4B7EFF" }} />
              <div className="small fw-semibold">Word</div>
            </div>
            <div className="tutorial-box">
              <FeatherIcon icon="grid" size={28} style={{ color: "#10B981" }} />
              <div className="small fw-semibold">Excel</div>
            </div>
            <div className="tutorial-box">
              <FeatherIcon icon="image" size={28} style={{ color: "#F59E0B" }} />
              <div className="small fw-semibold">Images</div>
            </div>
          </div>

          {/* Checkmark de confirmation */}
          {animationPhase >= 3 && (
            <div className="tutorial-checkmark">
              <FeatherIcon icon="check-circle" size={48} />
            </div>
          )}
        </div>

        <div className="tutorial-instructions">
          <h5 className="mb-3">Les étapes :</h5>

          <div className="instruction-step mb-3">
            <div className="step-number">1</div>
            <div>
              <strong>Cliquez et glissez</strong> le fichier vers la bonne boîte
            </div>
          </div>

          <div className="instruction-step mb-3">
            <div className="step-number">2</div>
            <div>
              <strong>Relâchez</strong> pour déposer le fichier
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">3</div>
            <div>
              Si c'est correct ✅ : animation et fichier suivant
              <br />
              Si c'est faux ❌ : le fichier revient au centre pour réessayer
            </div>
          </div>
        </div>

        <div className="tutorial-note mt-4 p-3" style={{
          background: "#EFE6FF",
          border: "1px solid #D9C7FF",
          borderRadius: 8,
        }}>
          <strong>💡 Conseil :</strong> Pensez à quel outil ouvre normalement ce type de fichier !
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={onClose} className="px-4">
          Comprendre et jouer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
