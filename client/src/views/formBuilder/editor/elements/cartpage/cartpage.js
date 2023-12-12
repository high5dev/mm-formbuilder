let cartpage = {
	isComponent: el => el.tagName === 'DIV' && el.classList.contains('cartpage'),
	model: {
		defaults: {
			tagName: 'div',
			draggable: true,
			droppable: false,
			attributes: { class: 'cartpage', productId: "" },
			components: (props) => {
				return `
				<div class="cart-content">
					<div class="cart">
						<h2 class="cart-title">My cart</h2>
						<div class="cart-items">
							<!-- Iterate over cart items and generate HTML -->
							<!-- Example cart item -->
							<div class="cart-item">
									<img src="product-image.jpg" alt="Product" width="100" height="100">
									<div class="cart-item-details">
											<h3 class="product-name">Product Name</h3>
											<p class="product-price">$10.00</p>
									</div>
									<div class="cart-item-quantity">
											<button class="cart-decrement">-</button>
											<input type="text" class="quantity-input" value="1">
											<button class="cart-increment">+</button>
									</div>
									<div class="cart-item-total">
											<p class="total-price">$10.00</p>
											<button class="remove-item">Remove</button>
									</div>
							</div>
							<!-- Repeat the cart item structure for each item -->
						</div>
					</div>
					<div class="order-summary">
						<h2 class="order-summary-title">Order summary</h2>
						<div class="summary-items">
							<div class="summary-item">
										<span class="item-label">Subtotal</span>
										<span class="item-value">USD $100.00</span>
								</div>
								<div class="summary-item">
										<span class="item-label">Delivery</span>
										<span class="item-value">FREE</span>
								</div>
						</div>
						<div class="total">
								<span class="total-label">Total</span>
								<span class="total-value">USD $100.00</span>
						</div>
						<a class="checkout-button">Checkout</a>
					</div>
				</div>
        `;
			},
			cartPorudcts: [],
			styles: `
			.cartpage {
				margin-top: 2rem;
				background-color: #fff;
				border-radius: 4px;
				max-width: 1440px;
    		width: 100%;
			}

			.cart-content {
				display: flex;
				justify-content: space-between;
				width: 100%;
			}
			
			.cart {
					flex: 3;
					padding: 1rem;
			}
			
			.cart-title {
					font-size: 1.5rem;
					color: #333;
			}
			
			.cart-item {
					display: flex;
					align-items: center;
					margin-top: 1rem;
					border-bottom: 1px solid rgba(0, 0, 0, 0.2);
					padding-bottom: 1rem;
			}
			
			.cart-item img {
					max-width: 100px;
					height: auto;
					margin-right: 1rem;
			}
			
			.product-name {
					font-size: 1.2rem;
					color: #333;
			}
			
			.product-price {
					font-size: 1rem;
					color: #333;
			}
			
			.cart-item-quantity {
					display: flex;
					align-items: center;
					margin-left: auto;
			}
			
			.quantity-input {
					width: 40px;
					text-align: center;
					border: 1px solid #333;
					border-radius: 4px;
					margin: 0 0.5rem;
					padding: 0.2rem;
					font-size: 1rem;
			}
			
			.increment,
			.decrement {
					background-color: #333;
					color: #fff;
					border: none;
					cursor: pointer;
					padding: 0.2rem 0.5rem;
					font-size: 1rem;
					border-radius: 4px;
			}
			
			.cart-item-total {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-between;
					margin-left: 1rem;
			}
			
			.total-price {
					font-size: 1.2rem;
					color: #333;
					margin-top: 0.5rem;
			}
			
			.remove-item {
					color: red;
					font-size: 1rem;
					cursor: pointer;
					margin-top: 0.5rem;
			}
			
			/* Order summary styles */
			.order-summary {
					flex: 1;
					padding: 1rem;
					border-left: 1px solid rgba(0, 0, 0, 0.2);
			}
			
			.order-summary-title {
					font-size: 1.5rem;
					color: #333;
			}
			
			.summary-items {
					margin-top: 1rem;
			}
			
			.summary-item {
					display: flex;
					justify-content: space-between;
					font-size: 1.2rem;
					color: #333;
					margin-bottom: 0.5rem;
			}
			
			.total {
					display: flex;
					justify-content: space-between;
					font-size: 1.5rem;
					color: #333;
					margin-top: 1rem;
					border-top: 1px solid rgba(0, 0, 0, 0.2);
					padding-top: 1rem;
			}
			
			.checkout-button {
					margin-top: 1rem;
					text-align: center;
					background-color: #3850d3;
					color: #fff;
					border: none;
					padding: 0.5rem 1rem;
					font-size: 1.2rem;
					border-radius: 4px;
					cursor: pointer;
			}
      `,
			script: function () {

			}
		},
	},
	view: {
		init() {
			this.listenTo(this.model, 'change:cartProducts', this.handleChangeCartProducts);
		},

		handleChangeCartProducts(e) {
			let cartProducts = this.model.get('cartProducts');
			let comps = this.model.get('components');
			while (comps.length > 0) {
				comps.pop();
			}
			let sum = 0;
			cartProducts.forEach((item) => {
				sum += item.product.price * item.count;
			});
			const comp = (
				<div class="cart-content">
					<div class="cart">
						<h2 class="cart-title">My cart</h2>
						<div class="cart-items">
							{cartProducts.map((item) => {
								return (
									<div class="cart-item" productid={item.product.id}>
										<img src={item.product.url} alt="Product" width="100" height="100" />
										<div class="cart-item-details">
											<h3 class="product-name">{item.product.name}</h3>
											<p class="product-price">{item.product.currency}{item.product.price}</p>
										</div>
										<div class="cart-item-quantity">
											<button class="decrement">-</button>
											<input type="text" class="quantity-input" value={item.count} />
											<button class="increment">+</button>
										</div>
										<div class="cart-item-total">
											<p class="total-price">{item.product.currency}{(item.product.price * item.count).toString()}</p>
											<button class="remove-item">Remove</button>
										</div>
									</div>
								)
							})}
						</div>
					</div>
					<div class="order-summary">
						<h2 class="order-summary-title">Order summary</h2>
						<div class="summary-items">
							<div class="summary-item">
								<span class="item-label">Subtotal</span>
								<span class="item-value">USD {sum.toString()}</span>
							</div>
							<div class="summary-item">
								<span class="item-label">Delivery</span>
								<span class="item-value">FREE</span>
							</div>
						</div>
						<div class="total">
							<span class="total-label">Total</span>
							<span class="total-value">USD {sum.toString()}</span>
						</div>
						<div class="checkout-button">Checkout</div>
					</div>
				</div>
			)
			comps.push(comp);
			this.render();
		}
	}
};

export default cartpage;
