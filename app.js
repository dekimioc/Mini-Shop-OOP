class Product {  
    constructor(title, image, desc, price) {
      this.title = title;
      this.imageUrl = image;
      this.description = desc;
      this.price = price;
    }
  }

  class ShopCart {
    items = [];

    addProduct(product) {
      this.items.push(product);
      this.totalOutput.innerHTML = `<h2>Total: \$${1}</h2>`
    }

    render() {
      const cartEl = document.createElement("section");
      cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now</button>
      `;
      cartEl.className = "cart";
      this.totalOutput = cartEl.querySelector("h2");
      return cartEl;
    }
  }
  
  class ProductItem {
    constructor(product) {
      this.product = product;
    }
  
    addToCart(product) {
      App.addProductToCart(this.product)
    }
  
    render() {
      const prodEl = document.createElement('li');
      prodEl.className = 'product-item';
      prodEl.innerHTML = `
          <div>
            <img src="${this.product.imageUrl}" alt="${this.product.title}" >
            <div class="product-item__content">
              <h2>${this.product.title}</h2>
              <h3>\$${this.product.price}</h3>
              <p>${this.product.description}</p>
              <button>Add to Cart</button>
            </div>
          </div>
        `;
      const addCartButton = prodEl.querySelector('button');
      addCartButton.addEventListener('click', this.addToCart.bind(this));
      return prodEl;
    }
  }
  
  class ProductList {
    products = [
      new Product(
        'A Pillow',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Pillows_on_a_hotel_bed.jpg/800px-Pillows_on_a_hotel_bed.jpg',
        'A soft pillow!',
        19.99
      ),
      new Product(
        'A Carpet',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg',
        'A carpet which you might like - or not.',
        89.99
      )
    ];
  
    constructor() {}
  
    render() {
      const prodList = document.createElement('ul');
      prodList.className = 'product-list';
      for (const prod of this.products) {
        const productItem = new ProductItem(prod);
        const prodEl = productItem.render();
        prodList.append(prodEl);
      }
      return prodList;
    }
  }

  class Shop {
    render() {
      const renderHook = document.getElementById('app');

      this.cart = new ShopCart();
      const cartEl = this.cart.render();
      const productList = new ProductList();
      const productListEl = productList.render();
      renderHook.append(cartEl);
      renderHook.append(productListEl);
    }
  }

  class App {

    static cart;

    static init() {
      const shop = new Shop();
      shop.render();
      this.cart = shop.cart;
    }
    static addProductToCart (product) {
      this.cart.addProduct(product);
    }
  }

  App.init();

