<template>
  <div id="app">
    <HeadComponent/>
    <body>
    <NavComponent :navigation='links' />
    <div id="main">
    <router-view></router-view>
    </div>
    <FooterComponent/>
  </body>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
  
  },
  data(){
    return {
      links : [{
        path: "/home",
        text: "Home",
        role: ["admin","user","unauthorized"]
      },
      {
        path: "/menu",
        text: "Menu",
        role: ["admin","user","unauthorized"]
      },
      {
        path: "/about",
        text: "About",
        role: ["admin","user","unauthorized"]
      },
      {
        path: "/book",
        text: "Book",
        role: ["admin","user","unauthorized"]
      },
      {
        path: "/admin",
        text: "Admin",
        role: ["admin"]
      },
      {
        path: "/register",
        text: "Register",
        role: ["unauthorized"]
      },
      {
        path: "/login",
        text: "Login",
        role: ["unauthorized"]
      }]
    }
  }
}
</script>


