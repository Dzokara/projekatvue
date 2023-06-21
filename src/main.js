import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.slim';
import HeadComponent from './components/Head.vue';
import FooterComponent from './components/Footer.vue';
import NavComponent from './components/Nav.vue';
import About from './components/About.vue';
import Book from './components/Book.vue';
import Home from './components/Home.vue';
import Menu from './components/Menu.vue';
import Login from './components/Login.vue';
import Admin from './components/Admin.vue';
import Register from './components/Register.vue';
import store from "./store/store"
import RoleDirective from "./directives/RoleDirective.js"
import EditProduct from './components/EditProduct.vue';
Vue.config.productionTip = false
Vue.directive("role", RoleDirective)
Vue.component('HeadComponent', HeadComponent);
Vue.component('FooterComponent', FooterComponent);
Vue.component('NavComponent', NavComponent);

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/menu',
    component: Menu
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/book',
    component: Book
  },
  {
    path: '/admin',
    component: Admin
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/edit/:id',
    name: 'edit-product',
    component: EditProduct,
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});


new Vue({
  router,
  store,
  created: function() {
    var user = localStorage.getItem("user")

    if(!user) {
      this.$store.commit("changeUser", undefined)
      return
    }
    
    this.$store.commit("changeUser", JSON.parse(user))
  },
  render: (h) => h(App),
}).$mount('#app');