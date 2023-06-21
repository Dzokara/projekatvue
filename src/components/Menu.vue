<template>
    
    <div class="sub_page">

        <div class="hero_area">
          <div class="bg-box">
            <img src="images/hero-bg.jpg" alt="">
          </div>
        </div>
      
        <!-- food section -->
      
        <section class="food_section layout_padding-bottom">
            <div class="container">
              <div class="heading_container heading_center">
                <h2>
                  Our Menu
                </h2>
              </div>
        
              <div class="form-outline col-md-5 mt-5">
                  <input type="search" v-model="keyword" id="form1" class="form-control" placeholder="Search..." aria-label="Search" />
                </div>
                <div class="filters-content">
                  <div class="row grid">
                    <div class="col-sm-6 col-lg-4" v-for="item in filteredProducts" :key="item.id">
                        <div class="box">
                            <div>
                              <div class="img-box">
                                <img class="img-fluid border rounded" :src="item.img" alt="">
                              </div>
                              <div class="detail-box">
                                <h5>{{ item.name }}</h5>
                                <p>{{ item.dsc }}</p>
                                <div class="options">
                                  <h6>{{ item.price }}$</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                    </div>
                  </div>
                </div>
            </div>
          </section>
        <!-- end food section -->
      
    </div>

</template>

<script>
export default {
  name: 'MenuComponent',
  data() {
    return {
      data: [],
      keyword:''
    };
  },
  mounted() {
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
    if(this.keyword!=''){
    const keyword = this.keyword.toLowerCase().trim();
    return this.$store.getters.nonDeletedProducts.filter(product => {
      return product.name.toLowerCase().includes(keyword);
    });
    }
    return this.$store.getters.nonDeletedProducts;
    }
  },
  watch: {
        keyword: function() {
            this.$store.dispatch("changeKeyword", this.keyword)
        }
    }
}

</script>