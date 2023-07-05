<template>
  <div class="cart">
    <h2 class="text-center">Your Cart</h2>
    <table v-if="role !== 'unauthorized' && cartItems.length > 0" class="cart-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartItems" :key="index">
          <td><img :src="item.img" :alt="item.name" class="item-image" /></td>
          <td>{{ item.name }}</td>
          <td>
            <input type="number" class="form-control w-50" :value="item.quantity" min="1" @change="updateQuantity(index, $event.target.value)">
          </td>
          <td>${{ item.price }}</td>
          <td>${{ item.quantity * item.price }}</td>
        </tr>
      </tbody>
      <tfoot class="text-center">
        <tr>
          <td colspan="10"> Total Sum: ${{ calculateTotalSum() }}</td>
        </tr>
      </tfoot>
    </table>
    <div v-if="role !== 'unauthorized' && cartItems.length === 0">
      <p class="text-center my-5">Your cart is empty.</p>
    </div>
    <div class="text-center my-5" v-if="role === 'unauthorized'">
      <p>Please <router-link to="/login">log in</router-link> to see your cart.</p>
    </div>
    <div v-if="cartItems.length" class="my-5 text-center"><router-link class="alert alert-warning" to="/checkout">Checkout</router-link></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CartComponent',
  data() {
    return {
      cartItems: [],
    };
  },
  mounted() {
    this.getCartItems();
  },
  methods: {
    getCartItems() {
      const cartItems = localStorage.getItem('cartItems');
      if (cartItems) {
        this.cartItems = JSON.parse(cartItems);
      }
    },
    calculateTotalSum() {
      let totalSum = 0;
      for (const item of this.cartItems) {
        totalSum += item.quantity * item.price;
      }
      return totalSum.toFixed(2);
    },
    updateQuantity(index, quantity) {
      if (quantity >= 1) {
        this.cartItems[index].quantity = quantity;
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      }
    },
  },
  computed: {
    ...mapGetters(['role']),
  },
};
</script>
  
  <style scoped>
  .cart {
    margin-top: 20px;
  }
  
  .cart-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .cart-table th,
  .cart-table td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .cart-table td:nth-child(2) {
    width: 30%;
  }
  
  .cart-table td:nth-child(3),
  .cart-table td:nth-child(4),
  .cart-table td:nth-child(5) {
    text-align: center;
  }
  
  .cart-table tfoot td {
    font-weight: bold;
  }
  
  .text-right {
    text-align: right;
  }
  </style>
  