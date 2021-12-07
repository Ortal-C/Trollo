<template>
  <section class="sign-up">
    <div class="sign-up-header">
      <div class="header-icon">
        <i class="fab fa-trello"></i>
      </div>
      <h1>Trollo</h1>
    </div>
    <main class="sign-up-container">
      <h3>Sign up for your account</h3>
      <form action="">
        <input type="text" placeholder="Enter full name" />
        <input type="text" placeholder="Enter username" />
        <input type="text" placeholder="Enter password" />
        <button>Log in</button>
      </form>
      <button class="google-btn">
        <i class="fab fa-google"></i><span>Continue with Google</span>
      </button>
      <router-link to="/login">
        <a href="">Already have an account? Log In</a></router-link
      >
    </main>
  </section>
</template>

<script>
export default {


methods:{

}
}
</script>

<style>

</style>