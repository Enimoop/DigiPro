import FeatherIcon from "feather-icons-react";
import { Col, Modal, Row } from "react-bootstrap";
import esieeItLogo from "../assets/logo-esiee-it.webp";
import josselinPhoto from "../assets/josselin.webp";
import aminePhoto from "../assets/Amine.webp";
import marinePhoto from "../assets/Marine.webp";
import clementPhoto from "../assets/Clement.webp";
import noahPhoto from "../assets/noah.webp";

type AboutModalProps = {
  show: boolean;
  onHide: () => void;
};

const contributors = [
  { name: "Marine Forcioli", role: "Ingénierie Logicielle et Management des SI", icon: "user", photo: marinePhoto },
  { name: "Noah Sochandamandon", role: "Ingénierie Logicielle et Management des SI", icon: "user", photo: noahPhoto },
  { name: "Clément Philippe", role: "Ingénieur Cybersécurité", icon: "user", photo: clementPhoto },
  { name: "Josselin Mathieu", role: "Ingénieur Cybersécurité", icon: "user", photo: josselinPhoto },
  { name: "Willem Szwarc-leguillier", role: "IA & BigData", icon: "user" },
  { name: "Amine Kheddaoui", role: "IA & BigData", icon: "user", photo: aminePhoto },
];

export default function AboutModal({ show, onHide }: AboutModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>À propos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="g-4 mb-5">
          {contributors.map((person) => (
            <Col xs={12} md={6} key={person.name}>
              <div className="text-center">
                <div
                  style={{
                    width: 80,
                    height: 80,
                    backgroundColor: "#F0F1FB",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                    overflow: "hidden",
                  }}
                >
                  {"photo" in person && person.photo ? (
                    <img src={person.photo} alt={person.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <FeatherIcon icon={person.icon} size={40} className="text-purple" />
                  )}
                </div>
                <h6 className="mb-1 fw-bold" style={{ fontSize: "1.05rem" }}>{person.name}</h6>
                <p className="text-muted small">{person.role}</p>
              </div>
            </Col>
          ))}
        </Row>

        <div className="text-center mb-4">
          <img
            src={esieeItLogo}
            alt="ESIEE-IT"
            style={{ maxWidth: 180, width: "100%", height: "auto" }}
          />
        </div>

        <div className="border-top pt-4">
          <h5 className="fw-bold mb-3">À propos de DigiPro95</h5>
          <p className="text-muted mb-0" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
            DigiPro95 est une plateforme éducative conçue pour apprendre les fondamentaux de l'informatique et de la cybersécurité.
            <br />
            <br />
            Développée par un groupe d'étudiants en Master 2 de l'ESIEE-IT dans le cadre du ProjectLab, elle s'adresse spécifiquement à ceux qui éprouvent des difficultés avec les bases de l'informatique.
            <br />
            <br />
            Grâce à des modules interactifs, des quiz engageants et des jeux éducatifs, DigiPro95 rend l'apprentissage accessible, ludique et progressif.
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}