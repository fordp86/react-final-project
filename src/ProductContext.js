import React, { createContext, useState, useEffect} from "react";
import axios from "axios";

export const ProductContext = createContext()

export const ProductProvider = (props) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function getProducts(){
            await refreshProducts()
        }
        getProducts()
    }, [])

    function refreshProducts(){
        return axios.get("http://localhost:3001/products")
        .then(response => {
            setProducts(response.data)
        })
    }

    function getProduct(id) {
        return axios.get(`http://localhost:3001/products/${id}`)
          .then(response =>
            new Promise((resolve) => resolve(response.data))
          )
          .catch((error) =>
            new Promise((_, reject) => reject(error.response.statusText))
          )
    }

    function deleteProduct(id){
        axios.delete(`http://localhost:3001/products/${id}`)
        .then(refreshProducts)
    }

    function addProduct(product) {
        return axios.post("http://localhost:3001/products", product)
        .then(response => {
          refreshProducts()
          return new Promise((resolve) => resolve(response.data))
        })
    }
  
    function updateProduct(product) {
        return axios.put(`http://localhost:3001/products/${product.id}`, product)
        .then(response => {
          refreshProducts()
          return new Promise((resolve) => resolve(response.data))
        })
      }
      
    function filterByPriceLow(){
      return axios.get(`http://localhost:3001/products/?price_gte=0&price_lte=200`)
      .then(response => {
        setProducts(response.data)
     })
    }

    function filterByPriceMed(){
      return axios.get(`http://localhost:3001/products/?price_gte=200&price_lte=400`)
      .then(response => {
        setProducts(response.data)
     })
    }

    function filterByPriceHigh(){
      return axios.get(`http://localhost:3001/products/?price_gte=400&price_lte=999`)
      .then(response => {
        setProducts(response.data)
     })
    }

    function searchyByContent(){
      return axios.get(`http://localhost:3001/products?q=`)
      .then(response => {
        setProducts(response.data)
      })
    }

    function orderHighToLow(){
      return axios.get(`http://localhost:3001/products/?_sort=price&_order=desc`)
      .then(response => {
        setProducts(response.data)
      })
    }

    function orderLowToHigh(){
      return axios.get(`http://localhost:3001/products/?_sort=price&_order=asc`)
      .then(response => {
        setProducts(response.data)
     })
    }

    return (
        <ProductContext.Provider value={{ products, getProduct, deleteProduct, addProduct, updateProduct, filterByPriceLow, filterByPriceMed, filterByPriceHigh, searchyByContent, orderHighToLow, orderLowToHigh }}>
            {props.children}
        </ProductContext.Provider>
    )
}