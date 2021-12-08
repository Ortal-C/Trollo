<template>
  <section class="login">
    <div class="login-header">
      <div class="header-icon">
        <i class="fab fa-trello"></i>
      </div>
      <h1>Trollo</h1>
    </div>
    <main class="login-container">
      <h3>Log in to Trello</h3>
      <form action="">
        <input type="text" placeholder="Enter user name" />
        <input type="text" placeholder="Enter password" />
        <button>Log in</button>
      </form>
      <p>OR</p>
      <button class="google-btn">
        <i class="fab fa-google"></i><span>Continue with Google</span>
      </button>
      <router-link to="/signup">
        <a href="">Sign up for an account</a></router-link
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
export default {};
</script>

<style>
</style>