<template>
    <div class="checkout px-3 mb-5">
      <h2 class="text-center">Checkout</h2>
      <div v-if="full">
        <form @submit.prevent="placeOrder">
          <TextField
            label="Name:"
            id="name"
            v-model="customerName"
            iclass="form-control"
            lclass="form-label"
            placeholder="John Doe"
          />
          <TextField
            label="Address:"
            id="address"
            v-model="customerAddress"
            iclass="form-control"
            lclass="form-label"
            :type="'textarea'"
            placeholder="Address 123"
          />
          <TextField
            v-model="customerPhone"
            id="phone"
            label="Phone Number:"
            iclass="form-control"
            lclass="form-label"
            type="tel"
            placeholder="0611234567"
          />
          <div class="payment-methods">
            <RadioGroup
                :options="radioData"
                label="Select Payment Method:"
                v-model="paymentMethod"
            />
          </div>
          <div class="text-center">
            <p>Total Sum: ${{ calculateTotalSum() }}</p>
            <button type="submit" class="btn btn-primary">Place Order</button>
          </div>
        </form>
        <div v-if="showWarning" class="alert alert-warning mt-3">
          Please fill in all the required fields.
        </div>
        <div v-if="showSuccess" class="alert alert-success mt-3">
          Order placed successfully! Redirecting to the homepage...
        </div>
      </div>
      <p class="text-center my-5" v-else>Your cart is empty.</p>
    </div>
  </template>
  
  <script>
  import TextField from './TextField.vue';
  import RadioGroup from './RadioGroup.vue';
  import { mapGetters } from 'vuex';
  export default {
    name: 'CheckoutComponent',
    components: {
      TextField,
      RadioGroup
    },
    data() {
      return {
        full: false,
        paymentMethod: 'cod',
        customerName: '',
        customerAddress: '',
        customerPhone: '',
        showWarning: false,
        showSuccess: false,
        radioData:[
        { value: 'cod', label: 'Cash on Delivery' },
        { value: 'card', label: 'Credit/Debit Card' },
      ]
      };
    },
    mounted() {
    if(this.role === 'unauthorized') {
        this.$router.push("/home")
    }
    this.getCartItems();
    },
    methods: {
      getCartItems() {
        const cartItems = localStorage.getItem('cartItems');
        if (cartItems) {
          this.cartItems = JSON.parse(cartItems);
          this.full = true;
        }
      },
      calculateTotalSum() {
        let totalSum = 0;
        for (const item of this.cartItems) {
          totalSum += item.quantity * item.price;
        }
        return totalSum.toFixed(2);
      },
      placeOrder() {
        if (this.validateInputs()) {
          localStorage.removeItem('cartItems');
          this.showWarning=false;
          this.showSuccess = true;
          setTimeout(() => {
            this.$router.push('/home');
          }, 3000);
        } else {
          this.showWarning = true;
        }
      },
      validateInputs() {
        return (
          this.customerName.trim() !== '' &&
          this.customerAddress.trim() !== '' &&
          this.customerPhone.trim() !== ''
        );
      }
    },
    computed:{
        ...mapGetters(['role'])
    }
  };
  </script>
  
  <style scoped>
  .checkout {
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
  
  .payment-methods {
    margin-bottom: 20px;
  }
  
  .form-check {
    margin-bottom: 10px;
  }
  </style>
  