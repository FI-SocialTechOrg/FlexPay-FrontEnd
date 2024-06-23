class ProductStockRequest{
    constructor(price,mountStock, product, store, stateStock){
        this.price = price;
        this.mountStock = mountStock;
        this.product = product;
        this.store = store;
        this.stateStock = stateStock;
    }
}

export default ProductStockRequest;