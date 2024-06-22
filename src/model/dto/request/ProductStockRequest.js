class ProductStockRequest{
    constructor(price,mountStock, productId, storeId, stateStockId){
        this.price = price;
        this.mountStock = mountStock;
        this.productId = productId;
        this.storeId = storeId;
        this.stateStockId = stateStockId;
    }
}

export default ProductStockRequest;