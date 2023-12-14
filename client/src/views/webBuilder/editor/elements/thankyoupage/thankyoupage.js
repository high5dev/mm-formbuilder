let thankyoupage = {
	isComponent: el => el.tagName === 'DIV' && el.classList.contains('thankyoupage'),
	model: {
		defaults: {
			tagName: 'div',
			draggable: true,
			droppable: false,
			attributes: { class: 'thankyoupage', productId: "" },
			components: (props) => {
				return (
					<div class="thankyou-content">
						<div class="thankyou-title">Thank you, Customer Name</div>
						<div class="thankyou-mail">You'll receive a confirmation email soon</div>
						<div class="thankyou-order">Order number: 10000</div>
						<div class="thankyou-list">
							<div class="product-lit">
								<div class="product-item">
									<div class="product-img">
										<img src="product.jpg" width="100" height="100" />
									</div>
									<div class="product-detail">
										<div class="product-name">Product Name</div>
										<div class="product-price">$0.00</div>
									</div>
									<div class="product-qty">Qty: 1</div>
									<div class="product-total">$0.00</div>
								</div>
							</div>
							<div class="thankyou-detail">
								<div class="thankyou-note">
									<div class="note-title">Note</div>
									<div class="note-content">Your customer's note will show here.</div>
								</div>
								<div class="thankyou-price">
									<div class="thankyou-subtotal">
										<div class="subtotal-title">Subtotal</div>
										<div class="subtotal-price">$0.00</div>
									</div>
									<div class="thankyou-delivery">
										<div class="delivery-title">Delivery</div>
										<div class="delivery-price">Free</div>
									</div>
									<div class="thankyou-tax">
										<div class="tax-title">Sales Tax</div>
										<div class="tax-price">$0.00</div>
									</div>
									<div class="thankyou-total">
										<div class="total-title">Total</div>
										<div class="total-price">$0.00</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			},
			cartPorudcts: [],
			styles: `
				.thankyoupage {
					display: flex;
					justify-content: center;
				}

				.thankyou-content {
					width: 100%;
					max-width: 740px;
					padding-left: 10px;
					padding-right: 10px;
				}

				.thankyou-title {
					font: normal normal normal 28px/36px avenir-lt-w01_35-light1475496,avenir-lt-w05_35-light,sans-serif;
					text-align: center;
				}

				.thankyou-mail {
					margin-top: 16px;
					font: normal normal normal 16px/24px avenir-lt-w01_35-light1475496,avenir-lt-w05_35-light,sans-serif;
					text-align: center;
				}

				.thankyou-order {
					margin-top: 16px;
					font: normal normal normal 14px/20px avenir-lt-w01_35-light1475496,avenir-lt-w05_35-light,sans-serif;
					text-align: center;
				}

				.thankyou-list {
					border: 1px solid rgb(227, 227, 227);
					margin-top: 32px;
					padding-left: 32px;
					padding-right: 32px;
					padding-bottom: 32px;
				}

				.product-item {
					padding-top: 32px;
					padding-bottom: 32px;
					border-bottom: 1px solid rgba(44,44,43,.2);
					grid-template-columns: auto 1fr .5fr auto auto;
					grid-template-rows: auto;
					display: grid;
				}

				.product-name {
					font : normal normal normal 16px/24px avenir-lt-w01_35-light1475496,avenir-lt-w05_35-light,sans-serif;
				}

				.product-price {
					font: normal normal normal 14px/20px avenir-lt-w01_35-light1475496,avenir-lt-w05_35-light,sans-serif;
					margin-top: 12px;
				}

				.product-qty {
					font: normal normal normal 16px/24px avenir-lt-w01_35-light1475496,avenir-lt-w05_35-light,sans-serif;
				}

				.product-total {
					font: normal normal normal 16px/24px avenir-lt-w01_35-light1475496,avenir-lt-w05_35-light,sans-serif;
				}

				.thankyou-detail {
					width: 100%;
					display: flex;
    				justify-content: space-between;
					margin-top: 32px;
				}

				.thankyou-note {
					width: 50%;
				}

				.note-title {
					font: normal normal normal 14px/20px avenir-lt-w01_35-light1475496,avenir-lt-w05_35-light,sans-serif;
				}

				.note-content {
					font: normal normal normal 14px/20px avenir-lt-w01_35-light1475496,avenir-lt-w05_35-light,sans-serif;
				}

				.thankyou-price {
					width: 50%;
					font: normal normal normal 14px/20px avenir-lt-w01_35-light1475496,avenir-lt-w05_35-light,sans-serif;
				}

				.thankyou-subtotal {
					display: flex;
					justify-content: space-between;
				}

				.thankyou-delivery {
					margin-top: 12px;
					display: flex;
					justify-content: space-between;
				}

				.thankyou-tax {
					margin-top: 12px;
					display: flex;
					justify-content: space-between;
				}

				.thankyou-total {
					margin-top: 20px;
					padding-top: 10px;
					justify-content: space-between;
					border-width: 0 0 1px 0;
    				border-top-color: rgb(227, 227, 227);
					font: normal normal normal 20px/28px avenir-lt-w01_35-light1475496,avenir-lt-w05_35-light,sans-serif;
					display: flex;
    				justify-content: space-between;
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
				<div class="thankyou-content">
					<div class="thankyou-title">Thank you, Customer Name</div>
					<div class="thankyou-mail">You'll receive a confirmation email soon</div>
					<div class="thankyou-order">Order number: 10000</div>
					<div class="thankyou-list">
						<div class="product-lit">
							<div class="product-item">
								<div class="product-img">
									<img src="product.jpg" width="100" height="100" />
								</div>
								<div class="product-detail">
									<div class="product-name">Product Name</div>
									<div class="product-price">$0.00</div>
								</div>
								<div class="product-qty">Qty: 1</div>
								<div class="product-total">$0.00</div>
							</div>
						</div>
						<div class="thankyou-detail">
							<div class="thankyou-note">
								<div class="note-title">Note</div>
								<div class="note-content">Your customer's note will show here.</div>
							</div>
							<div class="thankyou-price">
								<div class="thankyou-subtotal">
									<div class="subtotal-title">Subtotal</div>
									<div class="subtotal-price">$0.00</div>
								</div>
								<div class="thankyou-delivery">
									<div class="delivery-title">Delivery</div>
									<div class="delivery-price">Free</div>
								</div>
								<div class="thankyou-tax">
									<div class="tax-title">Sales Tax</div>
									<div class="tax-price">$0.00</div>
								</div>
								<div class="thankyou-total">
									<div class="total-title">Total</div>
									<div class="total-price">$0.00</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
			comps.push(comp);
			this.render();
		}
	}
};

export default thankyoupage;
