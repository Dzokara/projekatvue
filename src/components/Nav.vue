<template>
    <header class="header_section dark-header">
        <div class="container">
          <nav class="navbar navbar-expand-lg custom_nav-container ">
            <a class="navbar-brand" href="index.html">
              <span>
                Feane
              </span>
            </a>
  
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class=""> </span>
            </button>
  
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav  mx-auto ">
                <li class="nav-item" v-for="(a, index) in navigation" :key="index" v-role="a.role">
                    <router-link class="nav-link" :to="a.path">{{ a.text }}</router-link>
                  </li>
                  <li class="nav-item">
                  <button class="nav-link" v-role="['admin', 'user']" @click="logout">Logout</button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
</template>

<script>
export default{
    name: "NavComponent",
    props:{
        navigation: {
            type: Array,
            required: true
        }
    },
    methods: {
      logout() {
        this.$store.commit("changeUser", undefined)
        this.$forceUpdate()
        this.$router.push("/login")
        location.reload()
      }
    }
    
}
</script>