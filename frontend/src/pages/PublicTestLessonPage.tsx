import { Col, Container, Row } from "react-bootstrap";
import Header from "../components/Header";
import LessonContent from "../components/LessonContent";

const lessonData = {
  lessons: [
    {
      id: "intro",
      title: "Identifier un email suspect",
      content:
        "### Les signaux d'alerte\n\n- Adresse expéditeur inhabituelle\n- Demande urgente\n- Lien raccourci ou domaine inconnu\n\n> Ne clique pas immédiatement. Vérifie d'abord l'expéditeur et l'URL.",
    },
    {
      id: "good-practice",
      title: "Réagir correctement",
      content:
        "### Bon réflexe\n\n1. Survole le lien sans cliquer\n2. Vérifie l'orthographe du domaine\n3. Signale le message au support\n\n**Règle simple:** en cas de doute, ne renseigne jamais ton mot de passe.",
    },
  ],
} as const;

export default function PublicTestLessonPage() {
  return (
    <div className="main-content">
      <Container fluid className="py-5">
        <Header className="mt-md-5">
          <Header.Body>
            <Row className="align-items-center">
              <Col>
                <Header.Pretitle>LEÇON</Header.Pretitle>
                <Header.Title>Leçon publique de test</Header.Title>
              </Col>
            </Row>
          </Header.Body>
        </Header>

        <LessonContent lessonData={lessonData} />
      </Container>
    </div>
  );
}
