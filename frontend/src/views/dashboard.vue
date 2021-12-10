<template>
  <section v-if="board" class="dashboard">
    <button @click="closeDashboard()">✖</button>
    <main class="data-container">
      <div class="data-topic">
        <div class="stats tasks">
          <div class="title">
            <i class="fas fa-tasks"></i>
            <h1>All tasks</h1>
          </div>
          <div>
            <span>{{ tasks }}</span>
          </div>
        </div>
        <div class="stats lists">
          <div class="title">
            <i class="fas fa-clipboard-list"></i>
            <h1>All lists</h1>
          </div>
          <div>
            <span>{{ lists }}</span>
          </div>
        </div>
        <div class="stats members">
          <div class="title">
            <i class="fas fa-user"></i>
            <h1>Members</h1>
          </div>
          <div>
            <span>{{ members }}</span>
          </div>
        </div>
      </div>
      <section class="info-container"></section>
      <section class="charts-container">
        <div class="chart-container">
          <chart />
        </div>
        <div class="pie-chart-container">
          <pie-chart :data="[member1, member2, member3]" />
        </div>
      </section>
    </main>
  </section>
</template>

<script>
import { boardService } from "../services/board.service.js";
import chart from "@/cmps/board/charts/chart.vue";
import pieChart from "@/cmps/board/charts/pie-chart.vue";
export default {
  data() {
    return {
      board: null,
    };
  },
  async created() {
    const { boardId } = this.$route.params;
    const board = await boardService.getById(boardId);
    this.board = board;
    console.log(this.board);
  },
  methods: {
    closeDashboard() {
      this.$router.back();
    },
  },
  computed: {
    lists() {
      return this.board.groups.length;
    },
    tasks() {
      return this.board.groups.reduce(
        (acc, group) => acc + group.cards.length,
        0
      );
    },
    members() {
      return this.board.members.length;
    },
    member1() {
      let countMember = 0;
      this.board.groups.forEach((group) => {
        group.cards.forEach((card) => {
          card.members.filter((member) => {
            if (member.fullname.includes("Ortal")) countMember++;
          });
        });
      });
      return countMember;
    },
    member2() {
         let countMember = 0;
      this.board.groups.forEach((group) => {
        group.cards.forEach((card) => {
          card.members.filter((member) => {
            if (member.fullname.includes("Lihi")) countMember++;
          });
        });
      });
      return countMember;
    },
    member3() {
      let countMember = 0;
      this.board.groups.forEach((group) => {
   
        group.cards.forEach((card) => {
    
          card.members.filter((member) => {
      
            if (member.fullname.includes("Michal")) countMember++;
         
          });
        });
      });
    
      return countMember;
    },
  },
  components: {
    chart,
    pieChart,
  },
};
</script>

<style>
</style>