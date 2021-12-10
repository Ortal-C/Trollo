<template>
  <section class="board-imgs">
      <section class="search-container">
        <form @submit.prevent="searchImgs">
          <input type="text" v-model="searchBy" placeholder="Search" class="imgs-input">
          <!-- <button>Search</button> -->
        </form>
      </section>
      <section v-if="imgs" class="imgs-container">
          <div class="img-container" v-for="img in imgs" :key="img.id" @click="setImg(img)">
              <img :src="img.smallImg" alt="">
          </div>
      </section>
  </section>
</template>

<script>
import { imgService } from '@/services/img.service.js'
import { utilService } from '@/services/util.service.js'
export default {
    name: 'board-imgs',
    data() {
        return {
            searchBy: 'wallpaper',
            imgs: null
        }
    },
    created() {
        this.searchImgs()
    },
    methods: {
        async searchImgs() {
            if (!this.searchBy) return
            const imgs = await imgService.getImgs(this.searchBy)
            this.imgs = imgs
            console.log(imgs);
        },
        setImg(img) {
            this.$emit('updateStyle', img.fullImg)
        }
    }
}
</script>