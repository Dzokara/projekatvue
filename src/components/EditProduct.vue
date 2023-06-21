<template>
    <div>
       <div class="container my-5">
           <h1 class="text-center mb-4">Update a product</h1>
            <div class="col-6 mx-auto">
                <div class="form-group text-center">
                    <label for="">Image</label>
                    <input type="text" v-model="image" class="form-control mb-2" placeholder="Image URL" />
    
                    <img v-if="image" width="300" :src="image" class="img img-round" alt="">
               </div>
            </div>
            <div class="col-6 mx-auto">
                <div class="form-group">
                     <label for="">Name</label>
                     <input type="text" v-model="name" class="form-control" placeholder="Name" />
                </div>
            </div>
            <div class="col-6 mx-auto">
                <div class="form-group">
                     <label for="">Description</label>
                     <input type="text" v-model="desc" class="form-control" placeholder="Description" />
                </div>
            </div>
            <div class="col-6 mx-auto">
                <div class="form-group">
                    <label for="">Price</label>
                    <input type="text" v-model="price" class="form-control" placeholder="Price" />
               </div>
    
                <button @click="edit()" class="btn btn-primary" >Edit</button>
            </div>
       </div>
    </div>    
    </template>
    <script>
    import { mapGetters } from "vuex"
    export default {
        name: "EditProduct",
        data() {
            return {
                image: "",
                price: 0,
                name: "",
                id: 0,
                desc: ""
            }
        },
        mounted() {
            if(this.role != 'admin') {
                this.$router.push("/home")
            }
            this.id = this.$route.params.id
            if(this.$route.params.id) {
                let product = this.nonDeletedProducts.filter(x => x.id == this.id)[0]
                this.image = product.img
                this.price = product.price
                this.name = product.name
                this.desc=product.dsc
            }
            
        },
        computed: {
            ...mapGetters(["nonDeletedProducts",'role'])
        },
        methods:{
            edit: function() {
                this.$store.commit("updateProduct", { id: this.id, name: this.name, price: this.price, img: this.image, dsc: this.desc  })
                this.$router.push("/admin")
            }
        }
    }
    </script>