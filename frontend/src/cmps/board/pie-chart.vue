
<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
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
          label: '',
          backgroundColor: ["#f87979","#ffb12a",'#96C7C1'],
          data: [65, 60, 57],
        },
      ],
    });
  },
};
</script>

<style>
</style>