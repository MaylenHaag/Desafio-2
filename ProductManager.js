const fs = require('fs')

class ProductManager {
    #path

    constructor (path) {
        this.#path = path
        this.#init()
    }

    async #init() {
        if (!fs.existsSync(this.#path)) {
            await fs.promisses.writeFile(this.#path, JSON.stringify([],))
        }
    }

    addProduct(product) {

        const requiredFields = ["title", "description", "price", "thumbnail", "code", "stock"];

        const allFieldsPresent = requiredFields.every((field) => product[field]);

        if (!allFieldsPresent){
            return 'Todos los campos son obligatorios'
        }

        const found = this.#products.find(item => item.code === product.code)

        if (found) {
            return 'El código ya existe.'
        }

        const productToAdd = {id: this.#generateId(), ...product}
        this.#products.push(productToAdd)
        return productToAdd

    }

    #generateId() {
        if (this.#products.length === 0) {
            return 1 
        }
        return this.#products[this.#products.length-1].id + 1
    }

    getProducts() {
        return this.#products
    }

    getProductById(id) {
        const found = this.#products.find(item => item.id === id)

        if (!found) {
            return 'Id no encontrado.'
        }

        return found
    }
}

module.exports = ProductManager