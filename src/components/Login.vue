<template>
    
    <div class="container mt-5 mb-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-center">Login</h5>
                <form>
                  <div class="mb-3">
                    <TextField v-model="email" id="email" label="Email" iclass="form-control" lclass="form-label" placeholder="Email"/>
                  </div>
                  <div class="mb-3">
                    <TextField v-model="password" id="password" type="password" label="Password" iclass="form-control" lclass="form-label" placeholder="Password"/>
                  </div>
                  <div class="text-center">
                    <button @click="performLogin" class="btn btn-primary">Login</button>
                  </div>
                  <div class="col-6 mt-2" v-if="error">
                        <div class="alert alert-danger">
                            {{ error }}
                        </div>
                   </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

</template>

<script>
import TextField from './TextField.vue';
import { mapGetters } from "vuex"
export default {
  name: 'LoginComponent',
  components:{
    TextField
  },
  data() {
            return {
                error: "",
                email: "admin@gmail.com",
                password: "admin123"
            }
        },
        computed : {
            ...mapGetters(['users', 'role'])
        },
        mounted() {
            if(this.role != 'unauthorized') {
                this.$router.push("/home")
            }
        },
        methods: {
            performLogin() {
                this.error = ""

                if(!this.email) {
                    this.error = "Email is required.";
                    return;
                }

                if(!this.password) {
                    this.error = "Password is required.";
                    return;
                }
                
                let user = this.users.find(x => x.email == this.email &&
                                           x.password == this.password);
                
                if(!user) {
                    this.error = "Wrong credentials."
                    return;
                }

                let localStorageItem = {
                    email : user.email,
                    role : user.role
                }
                localStorage.setItem("user", JSON.stringify(localStorageItem));
                
                this.$store.commit("changeUser", localStorageItem)
                location.reload()
                this.$router.push("/home")
            }
        }
  
}
</script>