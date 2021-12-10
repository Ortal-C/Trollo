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
          <chart
            :data="[
              label1,
              label2,
              label3,
              label4,
              label5,
              label6,
              label7,
              label8,
            ]"
          />
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
      let memberCount = 0;
      this.board.groups.forEach((group) => {
        group.cards.forEach((card) => {
          card.members.filter((member) => {
            if (member.fullname.includes("Ortal")) memberCount++;
          });
        });
      });
      return memberCount;
    },
    member2() {
      let memberCount = 0;
      this.board.groups.forEach((group) => {
        group.cards.forEach((card) => {
          card.members.filter((member) => {
            if (member.fullname.includes("Lihi")) memberCount++;
          });
        });
      });

      return memberCount;
    },
    member3() {
      let memberCount = 0;
      this.board.groups.forEach((group) => {
        group.cards.forEach((card) => {
          card.members.filter((member) => {
            if (member.fullname.includes("Michal")) memberCount++;
          });
        });
      });
      return memberCount;
    },
    label1() {
      let labelCount = 0;
      this.board.groups.forEach((group) => {
        group.cards.forEach((card) => {
          if (card.labelsIds.includes("l101")) labelCount++;
        });
      });

      console.log(labelCount);
      return labelCount;
    },
    label2() {
       let labelCount = 0;
      this.board.groups.forEach((group) => {
        group.cards.forEach((card) => {
          if (card.labelsIds.includes("l102")) labelCount++;
        });
      });

      console.log(labelCount);
      return labelCount;
    },
    label3() {
   let labelCount = 0;
      this.board.groups.forEach((group) => {
        group.cards.forEach((card) => {
          if (card.labelsIds.includes("l103")) labelCount++;
        });
      });

      console.log(labelCount);
      return labelCount;
    },
    label4() {
    let labelCount = 0;
      this.board.groups.forEach((group) => {
        group.cards.forEach((card) => {
          if (card.labelsIds.includes("l104")) labelCount++;
        });
      });

      console.log(labelCount);
      return labelCount;
    },

    label5() {
  let labelCount = 0;
      this.board.groups.forEach((group) => {
        group.cards.forEach((card) => {
          if (card.labelsIds.includes("l105")) labelCount++;
        });
      });

      console.log(labelCount);
      return labelCount;
    },
    label6() {
      let labelCount = 0;
      this.board.groups.forEach((group) => {
        group.cards.forEach((card) => {
          if (card.labelsIds.includes("l106")) labelCount++;
        });
      });

      console.log(labelCount);
      return labelCount;
    },
    label7() {
  let labelCount = 0;
      this.board.groups.forEach((group) => {
        group.cards.forEach((card) => {
          if (card.labelsIds.includes("l107")) labelCount++;
        });
      });

      console.log(labelCount);
      return labelCount;
    },
    label8() {
  let labelCount = 0;
      this.board.groups.forEach((group) => {
        console.log('group', group);
        group.cards.forEach((card) => {
          console.log('card', card);
          if (card.labelsIds.includes("l108")) labelCount++;
         console.log( card.labelsIds);
        });
      });

      console.log(labelCount);
      return labelCount;
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