<template>
    <div class="container mt-5 mb-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title text-center">Register</h5>
              <ValidationObserver ref="form">
                <div class="mb-3">
                  <ValidationProvider rules="email|required" v-slot="{ errors }">
                    <TextField v-model="email" id="email" label="Email" iclass="form-control" lclass="form-label" placeholder="Email"/>
                    <span v-if="errors" class="alert-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="mb-3">
                  <ValidationProvider rules="required|min:6" v-slot="{ errors }">
                    <TextField v-model="password" id="password" type="password" label="Password" iclass="form-control" lclass="form-label" placeholder="Password"/>
                    <span v-if="errors" class="alert-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="text-center">
                  <button class="btn btn-primary" @click="validateForm">Register</button>
                </div>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from "vuex"
  import { ValidationObserver, ValidationProvider, extend } from 'vee-validate' 
  import { required, email } from 'vee-validate/dist/rules';
  import TextField from './TextField.vue';
  extend('required', {
    ...required,
    message: 'This field needs to be filled', 
  });
  
  extend('email', {
    ...email,
    message: 'Please enter a valid email address', 
  });

  extend('min', {
  validate(value, { length }) {
    return value.length >= length;
  },
  params: ['length'],
  message:"Password must contain at least 6 characters"
  });
  
  export default {
    name: 'RegisterComponent',
    components: {
      ValidationObserver,
      ValidationProvider,
      TextField
    },
    data() {
      return {
        oops: "",
        email: '',
        password: ''
      };
    },
    computed: {
      ...mapGetters(['role'])
    },
    mounted() {
      if (this.role !== 'unauthorized') {
        this.$router.push("/home");
      }
    },
    methods: {
      validateForm() {
        this.$refs.form.validate().then(success => {
          if (success) {
            this.handleRegister();
          } else {
            return;
          }
        });
      },
      handleRegister() {
        let localStorageItem = {
          email: this.email,
          role: 'user'
        };
        localStorage.setItem("user", JSON.stringify(localStorageItem));
  
        this.$store.commit("changeUser", localStorageItem);
        this.$router.push("/home");
        location.reload();
      }
    }
  }
  </script>
  