
<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props:['data'],
   created() {
    const members = Object.keys(this.data);
    this.members = members;
    const values = Object.values(this.data)
    this.values = values
  },
  data() {
    return {
      members: null,
      values: null,

    }
  },
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.members,
      datasets: [
        {
          backgroundColor: ["#45aaf2","#26de81",'#fc5c65'],
          data: this.values,
        },
      ],
    });
  },
};
</script>

<style>
</style>