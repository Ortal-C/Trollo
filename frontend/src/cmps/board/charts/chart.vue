
<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  props: ["data"],
  created() {
    const labels = Object.keys(this.data);
    this.labels = labels;
    const values = Object.values(this.data);
    this.values = values;
  },
  data() {
    return {
      labels: null,
      values: null,
    };
  },
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(
      {
        labels: [...this.labels],
        datasets: [
          {
            label: "Label",
            backgroundColor: [
              "#fd9644",
              "#4b7bec",
              "#45aaf2",
              "#fc5c65",
              "#fed330",
              "#778ca3",
              "#a55eea",
              "#26de81",
            ],

            data: [...this.values],
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
