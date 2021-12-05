<template>
  <div class="block">
    <span class="demonstration">Picker with quick options</span>
    <el-date-picker
      v-model="value"
      type="date"
      placeholder="Pick a day"
      :picker-options="pickerOptions"
      @change="dueDateChange">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'card-dates',
  props: ['card'],
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
  methods:{
    cardCopy() {
      return JSON.parse(JSON.stringify(this.card));
    },
    async dueDateChange() {
      console.log(this.value);
      // let card = this.cardCopy()
      // card.dueDate = new Date(this.value)
      // console.log('card.dueDate', card.dueDate);
      // await this.$store.dispatch({ type: "saveCard", payload: { groupId: this.groupId, card } });
    },
  },
  computed: {
    board() {
      return this.$store.getters.board || null;
    },
  }
}
</script>
