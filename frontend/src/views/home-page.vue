<template>
  <div class="home-page">
    <!-- <h1>Trollo</h1> -->
    <div>
      <div>
        <h1>Trollo helps teams move work forward.</h1>
        <p>
          Collaborate, manage projects, and reach new productivity peaks. From
          high rises to the home office, the way your team works is
          unique—accomplish it all with Trollo.
        </p>
        <button>Try Demo version</button>
      </div>
      <img src="../src/assets/imgs/hero.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "home-page",
  components: {},
  created() {
    document.body.style.backgroundColor = "#ffffff";
  },
};
</script>
