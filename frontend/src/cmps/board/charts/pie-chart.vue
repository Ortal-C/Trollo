
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
          backgroundColor: ["#f87979","#ffb12a",'#96C7C1'],
          data: this.data,
        },
      ],
    });
  },
};
</script>

<style>
</style>