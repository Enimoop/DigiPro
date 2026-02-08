import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import LessonContent from "../components/LessonContent";

import { modulesData } from "../nav/modulesData";
import { themesByModules } from "../nav/themesByModules";

import { lessonsByTheme } from "../nav/lessonByTheme";


export default function LessonPage() {
  const { moduleId, themeId } = useParams();
  if (!moduleId || !themeId) return <div>Page invalide</div>;

   const module = modulesData.find((m) => m.id === moduleId);
  const themes = themesByModules[moduleId as keyof typeof themesByModules] ?? [];
  const theme = themes.find((t) => t.id === themeId);

  console.log("Module:", module);
  console.log("Theme:", theme); 

    if (!module || !theme) {
    return <div>Module ou thème introuvable</div>;
  }

  const lessonData = lessonsByTheme[themeId as keyof typeof lessonsByTheme];
  return (
    <div>
      <Header className="mt-md-5">
        <Header.Body>
          <Row className="align-items-center">
            <Col>
              <Header.Pretitle>{module.title}</Header.Pretitle>
              <Header.Title>{theme.title}</Header.Title>
            </Col>
          </Row>
        </Header.Body>
      </Header>
      <LessonContent lessonData={lessonData} />
    </div>
  );
}