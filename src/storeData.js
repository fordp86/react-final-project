const { faker } = require('@faker-js/faker')

module.exports = () => {
  faker.seed(1234567890)
  let data = { products: [] }
  for (let i=0; i < 10; i++) {
    let productImg = faker.image.food(1234, 1234, true)
    data.products.push({
      id: i,
      itemName: faker.commerce.product(),
      itemImage: `${productImg}`,
      description: faker.commerce.productDescription(),
      itemMaterial: faker.commerce.productMaterial(),
      price: '$' + faker.commerce.price()
    })
  }
  return data
}