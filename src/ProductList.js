import React from "react";
import { Col, Container, Row, Card, Button, Dropdown} from "react-bootstrap";
import { Link, useNavigate, useParams} from "react-router-dom";
import { ProductContext } from "./ProductContext";
import { useContext, useState, useEffect } from "react";

function ProductList(){

    let { productId } = useParams()

    let navigate = useNavigate()

    let { getProduct, deleteProduct, orderLowToHigh, orderHighToLow, filterByPriceLow, filterByPriceMed, filterByPriceHigh } = useContext(ProductContext)

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

    // Filter Function

    function filterByLow(){
        filterByPriceLow()
    }

    function filterByMed(){
        filterByPriceMed()
    }

    function filterByHigh(){
        filterByPriceHigh()
    }

    //Sorting Functions

    function sortHigh(){
        orderHighToLow()
    }

    function sortLow(){
        orderLowToHigh()
    }

    function productList(products){
        if(products === null) return
        return products.map((product) => 
            <Col md={4} key={product.id} className="mt-3">
                <Card>
                    <Card.Img variant="top" src={product.itemImage} className="img-fluid h-75" height="150px" />
                    <Card.Body>
                    <Card.Title>{product.itemName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{product.description}</Card.Subtitle>
                    <Card.Text>
                        <strong>Material:</strong> <span>{product.itemMaterial}</span> <br />
                        <strong>Price:</strong> <span>${product.price}</span>
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
                        <Dropdown.Toggle variant="info" id="dropdown-basic" className="rounded-0">
                            Filter Price
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="/products">All</Dropdown.Item>
                            <Dropdown.Item onClick={filterByLow}>$0 - $200</Dropdown.Item>
                            <Dropdown.Item onClick={filterByMed}>$200 to $400</Dropdown.Item>
                            <Dropdown.Item onClick={filterByHigh}>$400 to $1000</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col md={6} className="text-end">
                        <Button onClick={sortHigh} variant="secondary" className="rounded-0 mx-3">Price High to Low</Button>
                        <Button onClick={sortLow} variant="primary" className="rounded-0">Price Low to High</Button>
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