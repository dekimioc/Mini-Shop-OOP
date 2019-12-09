class Product {  
    constructor(title, image, desc, price) {
      this.title = title;
      this.imageUrl = image;
      this.description = desc;
      this.price = price;
    }
  } 

  class ElementAttribute { //class for dynamic creating attributes for elements
    constructor(atrName, atrValue) {
      this.name = atrName;
      this.value = atrValue;
    };
  }

  class Component { //class for dynamic creating root elements
    constructor(renderedHookId, shouldRender = true) { // should render is added when we want manually to call render method
      this.hookId = renderedHookId;
      if(shouldRender) {
        this.render();
      }
      
    }

    render() {}
    //method for creating DOM element
    createRootElement(tag, cssClass, attributes) {
      const rootElement = document.createElement(tag);
      if(cssClass) {
        rootElement.className = cssClass;  
      }
      if(attributes && attributes.length > 0) {
        for(const attr of attributes) {
          rootElement.setAttribute(attr.name, attr.value)
        }
      }
      document.getElementById(this.hookId).append(rootElement);
      return rootElement;
    }
  }

  
  class ShopCart extends Component {
    items = [];

    addProduct(product) {
      const updatedItems = [...this.items];
      updatedItems.push(product);
      this.cartItems = updatedItems;
    }

    get totalAmount() {
      const sum = this.items.reduce((prevVal, currentVal) => {
        return prevVal + currentVal.price
      }, 0);
      return sum;
    }

    set cartItems(value) {
      this.items = value;
      this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`
    }

    constructor(renderedHookId){
      super(renderedHookId);
    }

    orderButtonHandler() {
      console.log("Ordering...");
      console.log(this.items);
    }

    render() {
      const cartEl = this.createRootElement("section", "cart");
      cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now</button>
      `;
      const orderButton = cartEl.querySelector('button');
      orderButton.addEventListener('click', () => this.orderButtonHandler());
      this.totalOutput = cartEl.querySelector("h2");
    }
  }
  
  class ProductItem extends Component {
    constructor(product, renderedHookId) {
      super(renderedHookId, false); 
      this.product = product;
      this.render()
    }
  
    addToCart(product) {
      App.addProductToCart(this.product)
    }
  
    render() {
      const prodEl = this.createRootElement('li', 'product-item');
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
    }
  }
  
  class ProductList extends Component {
    products = [];

    constructor(renderedHookId) {
      super(renderedHookId);
      this.fetchProducts()
    }

    fetchProducts() { 
      this.products = [
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
      this.renderProducts();
    }
    
    

    renderProducts() {
      for (const prod of this.products) {
        new ProductItem(prod, 'product-id');
      }
    }
  
    render() {
        this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'product-id')]);
        if(this.products && this.products.length > 0) {
        this.renderProducts();
        }
    }
  }

  class Shop {
    constructor() {
    }

    render() {
      this.cart = new ShopCart('app');
      new ProductList('app');
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

