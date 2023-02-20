app.component('product-display', {
    template: 
      /*html*/ 
      `<div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <img :class="{ 'out-of-stock-img': !inStock }" v-bind:src="image">
        </div>
        <div class="product-info">

          <h1>{{ title }}</h1>
          <p>{{ sale }}</p>

          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>

          <div 
            v-for="(variant, index) in variants" 
            :key="variant.id" 
            @mouseover="updateVariant(index)"
            class="color-circle" 
            :style="{ backgroundColor: variant.color }">
          </div>
          <ul>
            <li v-for="(size, index) in sizes" :key="index">{{ size }}</li>
          </ul>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
          <p>Shipping: {{ shipping }}</p>
          <button 
            class="button" 
            :class="{ disabledButton: !inStock }" 
            :disabled="!inStock" 
            @click="addToCart">
            Add to Cart
          </button>
          <button class="button" @click="removeFromCart">Remove Item</button>
          <a :href="url">Made by Vue Mastery</a>
        </div>
       
      </div>
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview"></review-form>
    </div>`,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            description: 'A warm fuzzy pair of socks.',
            url: 'https://www.vuemastery.com/',
            onSale: true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
              ],
            selectedVariant: 0,
            sizes: ['S', 'M', 'L', 'XL'],
            cart: 0,
            onSale: true,
            reviews: []
            }
            },
            methods: {
                addToCart() {
                    this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
                },
                removeFromCart() {
                    this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
                },
                updateVariant(index) {
                    this.selectedVariant = index
                },
                addReview(review) {
                    this.reviews.push(review)
                }
            },
            computed: {
                title() {
                    return this.brand + ' ' + this.product
                },
                image() {
                    return this.variants[this.selectedVariant].image
                  },
                  inStock() {
                  return this.variants[this.selectedVariant].quantity
                },
                sale() {
                    if (this.onSale) {
                        return this.brand + ' ' + this.product + ' is on sale.'
                    }
                    return ''
                },
                shipping() {
                    if (this.premium) {
                      return 'Free'
                    }
                      return 2.99
                }
            }
  })
