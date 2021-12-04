// Board nav

<template>
  <div class="board-menu">
    <header>
      <h3 class="title">Menu</h3>
      <a @click="closeMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          style="fill: #2d2d2d"
        >
          <path
            d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"
          ></path>
        </svg>
      </a>
    </header>

    <ul>
      <li @click="changeBg = !changeBg">
        <div class="icon bgc"></div>
        <h4>Change background</h4>
      </li>
      <li>
        <div class="icon">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM6 7a.5.5 0 000 1h4a.5.5 0 000-1H6zM.8 1a.8.8 0 00-.8.8V3a.8.8 0 00.8.8h14.4A.8.8 0 0016 3V1.8a.8.8 0 00-.8-.8H.8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <h4>Archive</h4>
      </li>
      <li>
        <div class="icon">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-width="2"
              d="M9,6 L21,6 M9,12 L21,12 M9,18 L17,18 M4,7 C4.55228475,7 5,6.55228475 5,6 C5,5.44771525 4.55228475,5 4,5 C3.44771525,5 3,5.44771525 3,6 C3,6.55228475 3.44771525,7 4,7 Z M4,13 C4.55228475,13 5,12.5522847 5,12 C5,11.4477153 4.55228475,11 4,11 C3.44771525,11 3,11.4477153 3,12 C3,12.5522847 3.44771525,13 4,13 Z M4,19 C4.55228475,19 5,18.5522847 5,18 C5,17.4477153 4.55228475,17 4,17 C3.44771525,17 3,17.4477153 3,18 C3,18.5522847 3.44771525,19 4,19 Z"
            ></path>
          </svg>
        </div>
        <h4>Activity</h4>
      </li>
    </ul>
    <main class="color-palette" v-if="changeBg">
      <div
        class="color" v-for="color in colors" :key="color"
        :value="color" :style="`background-color:${color}`" @click="updateStyle(color)">
        {{ color }}
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'board-menu',
  data() {
    return {
      currAction: 'menu',
      actions: ['menu', 'bgc', 'archive'],
      changeBg: false,
      colors: [
        '#cc0033',
        '#ff8000',
        '#ffbf00',
        '#00cc00',
        '#66d9ff',
        '#0099cc',
        '#bf80ff',
        '#ff66ff',
        '#ff4da6',
      ]
    }
  },
  methods: {
    closeMenu() {
      this.$emit('close')
    },
    updateStyle(style) {
      this.$emit('updateStyle', style )
    },
  },
}
</script>