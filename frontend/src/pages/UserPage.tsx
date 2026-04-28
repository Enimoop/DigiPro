import Header from "../components/Header";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Avatar from '../components/Avatar';

export default function UserPage() {
  return (
    <div className="main-content">
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={8}>
            <Header className="mt-md-5">
              <Header.Body>
                <Row className="align-items-center">
                  <Col>
                    <Header.Title>Mon profil</Header.Title>
                  </Col>
                </Row>
              </Header.Body>
            </Header>
            <form>
              <Row className="justify-content-between align-items-center">
                <Col>
                  <Row className="align-items-center">
                    <Col xs="auto">
                      <Avatar>
                        <Avatar.Image
                          src="/img/avatars/profiles/avatar-1.jpg"
                          alt="Dianna Smiley"
                          className="rounded-circle"
                        />
                      </Avatar>
                    </Col>
                    <Col className="ms-n2">
                      <h4 className="mb-1">Votre avatar</h4>
                      <small className="text-muted">PNG ou JPG, pas plus de 1000px de large et de haut.</small>
                    </Col>
                  </Row>
                </Col>
                <Col xs="auto">
                  <Button size="sm">Upload</Button>
                </Col>
              </Row>
              <hr className="my-5" />
              <Row>
                <Col xs={12} md={6}>
                  <div className="form-group">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control type="text" />
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <div className="form-group">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control type="text" />
                  </div>
                </Col>
                <Col xs={12}>
                  <div className="form-group">
                    <Form.Label className="mb-1">Adresse mail</Form.Label>
                    <Form.Control type="email" />
                  </div>
                </Col>
              </Row>
              <hr className="my-5" />
                <Header.Secondary>Changer de mot de passe</Header.Secondary>
                <Row>
                  <Col xs={12} md={6}>
                    <div className="form-group">
                      <Form.Label>Mot de passe actuel</Form.Label>
                      <Form.Control type="password" />
                    </div>
                  </Col>
                </Row>
              <Row>
                <Col xs={12} md={6}>
                  <div className="form-group">
                    <Form.Label>Nouveau mot de passe</Form.Label>
                    <Form.Control type="password" />
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <div className="form-group">
                    <Form.Label>Confirmer le mot de passe</Form.Label>
                    <Form.Control type="password" />
                  </div>
                </Col>
              </Row>

              <Button>Sauvegarder</Button>
              <hr className="my-5" />
              <Header.Secondary>Badges</Header.Secondary>

              {/* TODO: Intégration ici de la section des badges */}


              <hr className="mb-5" />
              {/* Partie sur la suppression du compte */}
              <Row className="justify-content-between">
                <Col xs={12} md={6} className="col-12 col-md-6">
                  <h4>Supprimer votre compte</h4>
                  <p className="small text-muted mb-md-0">
                    Supprimer votre compte est une action permanente et irréversible. Il ne sera pas possible de récupérer votre compte ou les données associées après la suppression. Assurez-vous de sauvegarder toutes les informations importantes avant de procéder à la suppression de votre compte.
                  </p>
                </Col>
                <Col xs="auto">
                  <Button variant="danger">Delete</Button>
                </Col>
              </Row>
            </form>
            <br />
            <br />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

