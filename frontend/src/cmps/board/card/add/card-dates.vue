<template>
  <div class="block" v-if="card">
    <el-date-picker
      v-model="value"
      type="date"
      placeholder="Pick a day"
      :picker-options="pickerOptions"
      @change="dueDateChange"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'card-dates',
  data() {
    return {
      value: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
        shortcuts: [
          {
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          },
          {
            text: 'Tomorrow',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          },
          {
            text: 'In one week',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          },
          {
            text: 'In a month',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', date);
            }
          }
        ]
      },
    }
  },
  created() {
    this.value = Date(this.card.dueDate) || ''
  },
  methods: {
    cardCopy() {
      return JSON.parse(JSON.stringify(this.card));
    },
    async dueDateChange() {
      let tmpCard = this.cardCopy()
      tmpCard.dueDate = this.value
      await this.$store.dispatch({ type: "saveCard", payload: { groupId: this.groupId, card: tmpCard } });
    },
  },
  computed: {
    board() {
      return this.$store.getters.board || null;
    },
    groupId() {
      return this.$route.params.groupId;
    },
    card() {
      return this.$store.getters.currCard
    },
  },
  watch: {
    value(newVal, oldVal) {
      console.log('value has changed!');

    },
  },
}
</script>
