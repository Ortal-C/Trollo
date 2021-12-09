<template>
  <div class="home-page">
    <!-- <h1>Trollo</h1> -->
    <div class="main-container">
      <section class="first-section">
        <div class="desc">
          <h1>Trollo helps teams move work forward.</h1>
          <p>
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home office, the way your team works is
            unique—accomplish it all with Trollo.
          </p>
          <button @click="boards">Try Demo version</button>
        </div>
        <div>
          <img src="../assets/imgs/hero.png" alt="" />
        </div>
      </section>
      <section class="second-section">
        <div class="desc">
        <h1>It’s more than work. It’s a way of working together.</h1>
        <p>
          Start with a Trello board, lists, and cards. Customize and expand
          with more features as your teamwork grows. Manage projects, organize
          tasks, and build team spirit—all in one place.
        </p>
        </div>
        <div>
          <img src="../assets/imgs/Trollo.jpeg" alt="">
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "home-page",
  components: {},
  created() {
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.backgroundImage = "none";
  },
  methods: {
    boards() {
      this.$router.push("/board");
    },
  },
};
</script>
