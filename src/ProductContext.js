import React, { createContext, useState, useEffect} from "react";
import axios from "axios";

export const ProductContext = createContext()

export const ProductProvider = (props) => {
    const baseUrl = "http://localhost:3001/products"
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function getProducts(){
            await refreshProducts()
        }
        getProducts()
    }, [])

    function refreshProducts(){
        return axios.get(baseUrl)
        .then(response => {
            setProducts(response.data)
        })
    }

    function getProduct(id) {
        return axios.get(`${baseUrl}/${id}`)
          .then(response =>
            new Promise((resolve) => resolve(response.data))
          )
          .catch((error) =>
            new Promise((_, reject) => reject(error.response.statusText))
          )
    }

    function deleteProduct(id){
        axios.delete(`${baseUrl}/${id}`)
        .then(refreshProducts)
    }

    function addProduct(product) {
        return axios.post(baseUrl, product)
        .then(response => {
          refreshProducts()
          return new Promise((resolve) => resolve(response.data))
        })
    }
  
    function updateProduct(product) {
        return axios.put(`${baseUrl}/${product.id}`, product)
        .then(response => {
          refreshProducts()
          return new Promise((resolve) => resolve(response.data))
        })
      }
      
    function filterByPriceLow(){
      return axios.get(`${baseUrl}?price_gte=0&price_lte=200`)
      .then(response => {
        setProducts(response.data)
     })
    }

    function filterByPriceMed(){
      return axios.get(`${baseUrl}?price_gte=200&price_lte=400`)
      .then(response => {
        setProducts(response.data)
     })
    }

    function filterByPriceHigh(){
      return axios.get(`${baseUrl}?price_gte=400&price_lte=999`)
      .then(response => {
        setProducts(response.data)
     })
    }

    function orderHighToLow(){
      return axios.get(`${baseUrl}?_sort=price&_order=desc`)
      .then(response => {
        setProducts(response.data)
      })
    }

    function orderLowToHigh(){
      return axios.get(`${baseUrl}?_sort=price&_order=asc`)
      .then(response => {
        setProducts(response.data)
     })
    }

    return (
        <ProductContext.Provider value={{ products, getProduct, deleteProduct, addProduct, updateProduct, filterByPriceLow, filterByPriceMed, filterByPriceHigh, orderHighToLow, orderLowToHigh }}>
            {props.children}
        </ProductContext.Provider>
    )
}