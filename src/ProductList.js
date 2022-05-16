import React from "react";
import { Col, Container, Row, Card, Button, Dropdown} from "react-bootstrap";
import { Link, useNavigate, useParams} from "react-router-dom";
import { ProductContext } from "./ProductContext";
import { useContext, useState, useEffect } from "react";

function ProductList(){

    let { productId } = useParams()

    let navigate = useNavigate()

    let { getProduct, deleteProduct } = useContext(ProductContext)
    let [ product, setProduct ] = useState()

    useEffect(() => {
    async function fetch() {
        await getProduct(productId)
        .then((product) => setProduct(product))
    }
    fetch()
    }, [productId, getProduct])

    function handleDeleteProduct(id){
        deleteProduct(id)
        navigate("/products")
    }

    function productList(products){
        if(products === null) return
        return products.map((product) => 
            <Col md={4} key={product.id} className="mt-3">
                <Card>
                    <Card.Img variant="top" src={product.itemImage} />
                    <Card.Body>
                    <Card.Title>{product.itemName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{product.description}</Card.Subtitle>
                    <Card.Text>
                        <strong>Material:</strong> <span>{product.itemMaterial}</span> <br />
                        <strong>Price:</strong> <span>{product.price}</span>
                    </Card.Text>
                    <Link to={`/products/${product.id}`} className="btn btn-secondary mx-3">View</Link>
                    <Link to={`/products/${product.id}/edit`} className="btn btn-primary mx-3">Edit</Link>
                    <Button variant="danger" onClick={handleDeleteProduct.bind(this, product.id)}>Delete</Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    }

    return(
        <>
            <Container>
                <Row className="col-md-12">
                    <h1>Products</h1>
                </Row>
                <Row className="col-md-12">
                    <Col md={6}>
                    <Dropdown>
                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                            Sort By
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Price</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">A to Z</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Z to A</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col md={6}>
                        <Button variant="secondary">Price High to Low *add</Button>
                        <Button variant="primary">Price Low to High *add</Button>
                    </Col>
                </Row>
                <Row className="col-md-12">
                    <ProductContext.Consumer>
                    {({products}) => (
                            productList(products)
                        )}
                    </ProductContext.Consumer>
                </Row>
            </Container>
        </>
    )
}

export default ProductList