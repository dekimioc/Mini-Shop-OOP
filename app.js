class Product {  
    constructor(title, image, desc, price) {
      this.title = title;
      this.imageUrl = image;
      this.description = desc;
      this.price = price;
    }
  } 

  class ElementAttribute {
    constructor(atrName, atrValue) {
      this.name = atrName;
      this.value = atrValue;
    };
  }

  class Component {
    constructor(renderedHookId) {
      this.hookId = renderedHookId
    }

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
     console.log(this.cartItems)
    }

    get totalAmount() {
      const sum = this.items.reduce((prevVal, currentVal) => {
        return prevVal + currentVal.price
      }, 0);
      return sum;
    }

    set cartItems(value) {
      this.items = value;
      console.log(value);
      this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`
    }

    constructor(renderedHookId){
      super(renderedHookId);
    }
    

    render() {
      const cartEl = this.createRootElement("section", "cart");
      cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now</button>
      `;
      this.totalOutput = cartEl.querySelector("h2");
    }
  }
  
  class ProductItem extends Component {
    constructor(product, renderedHookId) {
      super(renderedHookId);
      this.product = product;
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
  
    constructor(renderedHookId) {
      super(renderedHookId)
    }
  
    render() {
        this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'product-id')]);
        for (const prod of this.products) {
        const productItem = new ProductItem(prod, 'product-id');
        productItem.render();
      }
    }
  }

  class Shop {
    render() {
      this.cart = new ShopCart('app');
      this.cart.render();
      const productList = new ProductList('app');
      productList.render();
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

