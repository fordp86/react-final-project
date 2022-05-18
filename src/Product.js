import { Card, Button, Spinner, Alert } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ProductContext } from "./ProductContext";
import { useContext, useState, useEffect } from "react";

function Product(){

    let { productId } = useParams()

    let navigate = useNavigate()

    let { getProduct, deleteProduct } = useContext(ProductContext)
    let [ product, setProduct ] = useState()

    let [ error, setError ] = useState()

    useEffect(() => {
    setError(null)
    async function fetch() {
        await getProduct(productId)
        .then((product) => setProduct(product))
        .catch((message) => setError(message))
    }
    fetch()
    }, [productId, getProduct])

    function errorMessage() {
        return <Alert variant="danger">There was an error attempting to load this contact: {error}</Alert>
      }

    function handleDeleteProduct(id){
        deleteProduct(id)
        navigate("/products")
    }

    function loading(){
        return <div className="w-25 text-center"><Spinner animation="border" /></div>
    }

    function productCard() {
        let { id, itemName, itemImage, description, itemMaterial, price } = product
        return (
          <Card className="align-self-start">
            <Card.Img variant="top" src={itemImage} />
            <Card.Body>
              <Card.Title>{itemName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{description}</Card.Subtitle>
              <Card.Text>
                <strong>Material:</strong> <span>{itemMaterial}</span> <br />
                <strong>Price:</strong><span>{price}</span>
              </Card.Text>
              <Link to={`/products/${id}/edit`} className="btn btn-primary mx-3">Edit</Link>
              <Button variant="danger" onClick={handleDeleteProduct.bind(this, id)}>Delete</Button>
            </Card.Body>
          </Card>
        )
      }
      if (error) return errorMessage()
      if (product === undefined) return loading()
      return product.id !== parseInt(productId) ?  loading() : productCard()
}

export default Product