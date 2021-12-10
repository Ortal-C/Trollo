
<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: [
        "Copy Request",
        "One more step",
        "priority",
        "Design team",
        "Product marketing",
        "Waiting for feedback",
        "Halp",
        "Important",
      ],
      datasets: [
        {
          label: "Label",
          backgroundColor: [
            "#f87979",
            "#ffb12a",
            "#16c440",
            "#5da9ff",
            "#f8ff5d",
            "#9100af",
            "#C85C5C",
            "#96C7C1",
          ],
          data: [40, 33, 24, 39, 45, 40, 39, 60],
        },
      ],
    },{
      legend:{display:false}
    });
  },
};
</script>

<style>
</style>
