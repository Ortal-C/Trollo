<template>
  <section class="login">
    <main class="login-container">
      <h3>Login to Trollo</h3>
      <form @submit.prevent="doLogin">
        <input type="text" placeholder="Enter user name" />
        <input type="text" placeholder="Enter password" />
        <button title="Login">Login</button>
      </form>
      <p>OR</p>
      <button class="google-btn">
        <i class="fab fa-google"></i><span>Continue with Google</span>
      </button>
      <router-link to="/signup"><a href="">Sign up for an account</a></router-link>
    </main>
    <div class="left-img">
      <img src="@/assets/imgs/login-svg-left.svg" alt="login" />
    </div>
    <div class="right-img">
      <img src="@/assets/imgs/login-svg.svg" alt="login" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      msg: '',
      loginCred: {username: 'user1', password: '123'},
      signupCred: {username: '', password: '', fullname: ''},
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  created() {
    this.loadUsers()
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.backgroundImage = 'none';
  },
  methods: {
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = 'Please enter username/password'
        return;
      }
      try {
        await this.$store.dispatch({ type: 'login', userCred: this.loginCred });
        this.$router.push('/')
      } catch(err) {
          console.log(err)
          this.msg = 'Failed to login'
      }
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' });
    },
    async doSignup() {
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
        this.msg = 'Please fill up the form'
        return
      }
      await this.$store.dispatch({ type: 'signup', userCred: this.signupCred });
      this.$router.push('/')
    },
    loadUsers() {
      this.$store.dispatch({ type: 'loadUsers' });
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: 'removeUser', userId })
        this.msg = 'User removed'
      } catch(err) {
        this.msg = 'Failed to remove user'
      }
    }
  }
};
</script>