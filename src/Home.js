import { Navbar, Nav, Container, Stack } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

function Home(){
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                        alt="shopy guy logo"
                        src="/img/cart.png"
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        />{' '}
                    ShopyGuy
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/about" className="nav-link">About</Link>
                        <Link to="/products" className="nav-link">Products</Link>
                        <Link to="/new" className="nav-link">Create</Link>
                    </Nav>
                </Container>
            </Navbar>
            <Stack gap={3} className="col-md-10 mx-auto mt3">
                <Outlet />
            </Stack>
        </>
    )
}

export default Home