import { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "./ProductContext";

function ProductForm(){
    let { productId } = useParams()
    
    let [ product, setProduct ] = useState({
        id: productId,
        itemName: "",
        itemImage: "",
        description: "",
        itemMaterial: "",
        price: ""
    })

    let { getProduct, addProduct, updateProduct } = useContext(ProductContext)
    let navigate = useNavigate()
    let { id, itemName, itemImage, description, itemMaterial, price } = product

    useEffect(() => {
        if(id === undefined) return
        async function fetch(){
            await getProduct(id)
                .then((product) => setProduct(product))
        }
        fetch()
    }, [id, getProduct])

    function handleChange(event) {
        setProduct((preValue) => {
          return { ...preValue, 
            [event.target.name]: event.target.type === 'number' ? parseInt(event.target.value) : event.target.value 
        }
        })
    }

    //check if form should update or add a new product
    function addOrUpdate(){
        if(productId === undefined){
            return addProduct(product)
        } else{
            return updateProduct(product)
            
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        addOrUpdate().then(() =>
            navigate(-1)
        )
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>ID</Form.Label>
                <Form.Control type="number" name="id" value={id ?? null} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" name="itemName" value={itemName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Product Image</Form.Label>
                <Form.Control type="text" name="itemImage" value={itemImage} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" value={description} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Product Material</Form.Label>
                <Form.Control type="text" name="itemMaterial" value={itemMaterial} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price" value={price} onChange={handleChange} />
            </Form.Group>
            <Button type="submit">Save</Button>
        </Form>
    )
}

export default ProductForm