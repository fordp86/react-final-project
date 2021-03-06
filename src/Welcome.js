import React from "react";
import { Col, Container, Row, Card, Button} from "react-bootstrap";
import { Link, useNavigate, useParams} from "react-router-dom";
import { ProductContext } from "./ProductContext";
import { useContext, useState, useEffect } from "react";

function Welcome(){
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

    function homeProductList(products){
        if(products === null) return
        return products.slice(0, 3).map((product) => 
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
        <Container>
            <Row>
                <h1>New Products</h1>
                    <ProductContext.Consumer>
                    {({products}) => (
                        homeProductList(products)
                        )}
                    </ProductContext.Consumer>
            </Row>
        </Container>
    )
}

export default Welcome