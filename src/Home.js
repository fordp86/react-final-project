import { Navbar, Nav, Container, Form, FormControl, Row, Col } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { ProductContext } from './ProductContext';
import { useContext } from "react";
import styles from './Home.module.css'

function Home(){
    let { searchyByContent } = useContext(ProductContext)

    function searchForm(){
        searchyByContent()
    }

    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                        alt="shopy guy logo"
                        src="/img/cart.png"
                        width="200"
                        height="auto"
                        className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto justify-content-end">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/about" className="nav-link">About</Link>
                            <Link to="/products" className="nav-link">Products</Link>
                            <Link to="/new" className="nav-link">Create</Link>
                        </Nav>
                        <Form onSubmit={searchForm} className="d-flex">
                            <FormControl
                            type="search"
                            placeholder="Add Search"
                            className="me-2"
                            aria-label="Search"
                            />
                        </Form>
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
            <Container fluid className="bg-dark p-5 h-100">
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