
<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  props: ["data"],
  created() {
    const labels = Object.keys(this.data);
    this.labels = labels;
    const values = Object.values(this.data)
    this.values = values
  },
  data() {
    return {
      labels: null,
      values: null,

    }
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
              "#20bf6b",
              "#f7b731",
              "#eb3b5a",
              "#a55eea",
              "#45aaf2",
              "#4b7bec",
              "#778ca3",
              "#fa8231",
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
