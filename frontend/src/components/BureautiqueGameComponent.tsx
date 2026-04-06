import { useState } from "react";
import { Container, Row, Col, Button, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

import Header from "./Header";
import LessonQuizGameStepper from "./LessonQuizGameStepper";
import BureautiqueGameTutorial from "./BureautiqueGameTutorial";

interface FileItem {
  id: string;
  name: string;
  extension: string;
  correctBoxId: string;
}

interface Box {
  id: string;
  label: string;
  icon: string;
  color: string;
}

const FILES_POOL: FileItem[] = [
  { id: "1", name: "Données financières", extension: ".xlsx", correctBoxId: "spreadsheet" },
  { id: "2", name: "Guide utilisateur", extension: ".pdf", correctBoxId: "pdf" },
  { id: "3", name: "Photo_2024", extension: ".jpg", correctBoxId: "image" },
  { id: "4", name: "Sous le vent", extension: ".mp3", correctBoxId: "audio" },
  { id: "5", name: "Mon Mémoire", extension: ".docx", correctBoxId: "documents" },
  { id: "6", name: "Rapport Financier", extension: ".pptx", correctBoxId: "powerpoint" },
];

// Fonction pour mélanger les fichiers
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const FILES: FileItem[] = shuffleArray(FILES_POOL);

const BOXES: Box[] = [
  { id: "documents", label: "Word", icon: "file-text", color: "#4B7EFF" },
  { id: "spreadsheet", label: "Excel", icon: "grid", color: "#10B981" },
  { id: "image", label: "Images", icon: "image", color: "#F59E0B" },
  { id: "pdf", label: "PDF", icon: "file", color: "#EF4444" },
  { id: "audio", label: "Audio", icon: "music", color: "#A855F7" },
  { id: "powerpoint", label: "PowerPoint", icon: "play", color: "#D24726" },
];

type Props = {
  themeId?: string;
};

export default function BureautiqueGameComponent({ }: Props) {
  const navigate = useNavigate();
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedFileId, setDraggedFileId] = useState<string | null>(null);
  const [feedbackBox, setFeedbackBox] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);

  const currentFile = FILES[currentFileIndex];
  const progress = ((currentFileIndex + 1) / FILES.length) * 100;

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDraggedFileId(currentFile.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedFileId(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDropOnBox = (boxId: string) => {
    if (!draggedFileId) return;

    setFeedbackBox(boxId);

    const isCorrect = boxId === currentFile.correctBoxId;

    if (isCorrect) {
      setFeedbackType("success");
      setTimeout(() => {
        if (currentFileIndex < FILES.length - 1) {
          setCurrentFileIndex(currentFileIndex + 1);
          setFeedbackType(null);
          setFeedbackBox(null);
        } else {
          setGameFinished(true);
        }
      }, 1000);
    } else {
      setFeedbackType("error");
      setTimeout(() => {
        setFeedbackType(null);
        setFeedbackBox(null);
      }, 600);
    }

    setIsDragging(false);
    setDraggedFileId(null);
  };

  if (gameFinished) {
    return (
      <>
        <Header className="mt-md-5">
          <Header.Body>
            <Row className="align-items-center">
              <Col>
                <Header.Pretitle>Jeu</Header.Pretitle>
                <Header.Title>Classification des fichiers</Header.Title>
              </Col>
              <Col xs="auto">
                <LessonQuizGameStepper current="game" />
              </Col>
            </Row>
          </Header.Body>
        </Header>

        <Container
          fluid
          className="d-flex align-items-center"
          style={{ minHeight: "calc(100vh - 300px)" }}
        >
          <Row className="justify-content-center w-100">
            <Col xs={12} md={8} lg={6} className="text-center">
              <div className="mb-4">
                <FeatherIcon icon="check-circle" size={64} className="text-success" />
              </div>
              <h2 className="mb-3">Félicitations !</h2>
              <p className="text-muted mb-4">
                Vous avez classé correctement tous les fichiers.
              </p>

              <div className="d-flex gap-2 justify-content-center">
                <Button
                  variant="primary"
                  onClick={() => navigate("/home")}
                >
                  Retour vers l'accueil
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  return (
    <>
      <BureautiqueGameTutorial show={showTutorial} onClose={() => setShowTutorial(false)} />

      <Header className="mt-md-5">
        <Header.Body>
          <Row className="align-items-center">
            <Col>
              <Header.Pretitle>Jeu</Header.Pretitle>
              <Header.Title>Classification des fichiers</Header.Title>
            </Col>
            <Col xs="auto">
              <LessonQuizGameStepper current="game" />
            </Col>
          </Row>
        </Header.Body>
      </Header>

      <Container
        fluid
        className="d-flex align-items-center"
        style={{ minHeight: "calc(100vh - 300px)" }}
      >
        <Row className="justify-content-center w-100">
          <Col xs={12} md={10} lg={8} xl={7}>
            <div className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">Progression</span>
                <span className="text-muted small">
                  {currentFileIndex + 1} / {FILES.length}
                </span>
              </div>
              <ProgressBar now={progress} className="bureautique-progress" />
            </div>

            <h2 className="text-center mb-4">Classez le fichier dans la bonne boîte</h2>

            {/* Fichier à glisser */}
            <Row className="justify-content-center mb-5">
              <Col xs={12} className="text-center">
                <div
                  draggable
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  className={`bureautique-file ${isDragging ? "dragging" : ""}`}
                >
                  <FeatherIcon icon="file" size={56} className="mb-2" />
                  <div className="fw-bold fs-4">{currentFile.name}</div>
                  <div className="text-muted" style={{ fontSize: "1.1rem" }}>{currentFile.extension}</div>
                </div>
              </Col>
            </Row>

            {/* Boîtes de destination */}
            <Row className="g-3">
              {BOXES.map((box) => (
                <Col xs={12} sm={6} lg={4} key={box.id}>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={() => handleDropOnBox(box.id)}
                    className={`bureautique-box ${feedbackBox === box.id ? `feedback-${feedbackType}` : ""
                      }`}
                    style={{
                      borderColor: box.color,
                      backgroundColor:
                        feedbackBox === box.id && feedbackType === "success"
                          ? `${box.color}20`
                          : "transparent",
                    }}
                  >
                    <div className="bureautique-box-content">
                      <FeatherIcon icon={box.icon} size={32} style={{ color: box.color }} />
                      <div className="mt-2 fw-semibold text-dark">{box.label}</div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>



          </Col>
        </Row>
      </Container>
    </>
  );
}
