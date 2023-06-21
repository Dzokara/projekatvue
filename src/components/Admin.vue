<template>
    
    <div class="sub_page">

        <div class="hero_area">
          <div class="bg-box">
            <img src="images/hero-bg.jpg" alt="">
          </div>
        </div>

        <div class="text-center my-3">
            <a class="btn btn-warning mr-2" :class="{ active: activeTab === 'products' }" @click="activeTab = 'products'">Products</a>
            <a class="btn btn-warning mr-2" :class="{ active: activeTab === 'users' }" @click="activeTab = 'users'">Users</a>
          </div>
      
        

        
        <table v-if="activeTab === 'products'" class="table table-striped table-bordered my-5 mx-auto col-10">
            <thead class="thead-dark">
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filteredProducts" :key="item.id">
                  <td class="col-1">
                      <img class="img-fluid" :src="item.img" alt="">
                  </td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.dsc }}</td>
                  <td>{{ item.price }}$</td>
                  <td class="text-center">
                    <router-link :to="{ name: 'edit-product', params: { id: item.id } }" class="btn btn-info">Update</router-link>
                  </td>
                  <td><button @click="deleteProduct(item.id)" class="btn btn-danger">Delete</button></td>
                </tr>
              </tbody>
          </table>
      
          
          <table v-if="activeTab === 'users'" class="table table-striped table-bordered my-5 mx-auto col-10 text-center">
            <thead class="thead-dark">
                <tr>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.email }}</td>
                  <td>{{ user.role }}</td>
                </tr>
              </tbody>
          </table>
      
       
        
      
    </div>

</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'AdminComponent',
  data() {
    return {
      data: [],
      activeTab: 'products'
    };
  },
  mounted() {
    if(this.role != 'admin') {
        this.$router.push("/home")
    }
    if (this.data.length === 0) {
      this.$store.dispatch('fetchData')
        .then(() => {
          this.data = this.$store.getters.getProducts;
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  computed: {
    filteredProducts() {
        return this.$store.getters.nonDeletedProducts;
        },
    users() {
      return this.$store.getters.users;
    },
        ...mapGetters(['role'])
    },
    methods:{
        deleteProduct(id) {
            this.$store.commit("deleteProduct", id);
        }
    }
}

</script>