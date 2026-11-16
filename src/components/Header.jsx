import Container from 'react-bootstrap/Container';
import {Navbar,Image} from 'react-bootstrap';
import logo_data_corsica from '/src/assets/logo_data_corsica.webp';
import {Link} from 'react-router-dom';

function ContainerOutsideExample() {
  return (
    <Container>
      <Navbar id="header" expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand>
              <Link to="/">
                <Image id="logo" src={logo_data_corsica} alt="Logo" />
              </Link>
            </Navbar.Brand>
        </Container>
      </Navbar>
    </Container>
  );
}

export default ContainerOutsideExample;