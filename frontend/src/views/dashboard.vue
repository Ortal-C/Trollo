<template>
  <section class="dashboard">
    <div class="charts-container">
      <button @click="closeDashboard()">✖</button>
      <chart class="chart" />
      <pie-chart class="pie-chart" />
    </div>
  </section>
</template>

<script>
import chart from "@/cmps/board/charts/chart.vue";
import pieChart from "@/cmps/board/charts/pie-chart.vue";
export default {
    methods:{
closeDashboard(){
    this.$router.back()
}
    },
  components: {
    chart,
    pieChart,
  },
};
</script>

<style>
</style>