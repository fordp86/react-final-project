import { Navbar, Nav, Container,Row, Col } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import styles from './Home.module.css'

function Home(){
    return(
        <>
            <Navbar variant="dark" className={`${styles.navBg}`}>
                <Container>
                    <Navbar.Brand href="/" className={`${styles.logo}`}>
                        <img
                        alt="shopy guy logo"
                        src="/img/cart.png"
                        className={"d-inline-block align-top img-fluid"}
                        />
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className={`${styles.font}`}>
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/about" className="nav-link">About</Link>
                            <Link to="/products" className="nav-link">Products</Link>
                            <Link to="/new" className="nav-link">Create</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className={`p-5 h-100 ${styles.minheight}`}>
                     <Row className="h-100">
                        <Col md={12}>
                            <Outlet />
                        </Col>
                    </Row>
            </Container>
            <Container fluid className={`${styles.navBg} p-5 h-100`}>
                    <Row className="h-100">
                        <Col md={12} className="text-center text-white">
                            <p>Copyright ShopyGuy 2022</p>
                        </Col>
                    </Row>
            </Container>
        </>
    )
}

export default Home