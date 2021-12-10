
<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props:['data'],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: [
        "Ortal Cohen",
        "Lihi Sered",
        "Michal Ozeri",
      ],
      datasets: [
        {
          backgroundColor: ["#45aaf2","#26de81",'#fc5c65'],
          data: this.data,
        },
      ],
    });
  },
};
</script>

<style>
</style>