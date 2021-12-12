<template>
  <section class="login">
    <!-- <div class="login-header">
      <div class="header-icon">
        <i class="fab fa-trello"></i>
      </div>
      <h1>Trollo</h1>
    </div> -->
    <main class="login-container">
      <h3>Sign up for your account</h3>
      <form @submit.prevent="doSignup" action="">
        <input type="text" placeholder="Enter full name" />
        <input type="text" placeholder="Enter username" />
        <input type="text" placeholder="Enter password" />
        <button>Signup</button>
      </form>
      <button class="google-btn">
        <i class="fab fa-google"></i><span>Continue with Google</span>
      </button>
      <router-link to="/login">
        <a href="">Already have an account? Log In</a></router-link
      >
    </main>
     <div class="left-img">
      <img src="@/assets/imgs/login-svg-left.svg" alt="" />
    </div>
    <div class="right-img">
      <img src="@/assets/imgs/login-svg.svg" alt="" />
    </div>
  </section>
</template>

<script>
export default {
 created() {
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.backgroundImage = "none";
  },
}
</script>