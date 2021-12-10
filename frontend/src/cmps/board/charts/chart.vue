
<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  props: ["data"],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(
      {
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
              "#2bcbba",
              "#26de81",
              "#fed330",
              "#fd9644",
              "#fc5c65",
              "#a55eea",
              "#4b7bec",
              "#45aaf2",
            ],

            data: this.data,
          },
        ],
        options: {
          responsive: true,
          scales: {
            yAxes: [
              {
                display: true,
                ticks: {
                  beginAtZero: true,
                  stepSize: 1,
                },
              },
            ],
          },
        },
      },
      {
        legend: { display: false },
      }
    );
  },
};
</script>

<style>
</style>
