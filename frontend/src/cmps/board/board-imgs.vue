<template>
  <section class="board-imgs">
      <section class="search-container">
        <form @submit.prevent="searchImgs">
          <input class="imgs-input" type="text" v-model="searchBy" placeholder="Search" />
        </form>
      </section>
      <section v-if="imgs" class="imgs-container">
          <div class="img-container" v-for="img in imgs" :key="img.id" @click="setImg(img)">
              <img :src="img.smallImg" title="Click for set image">
          </div>
      </section>
  </section>
</template>

<script>
import { imgService } from '@/services/img.service.js'
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
        },
        setImg(img) {
            this.$emit('updateStyle', img.fullImg)
        }
    }
}
</script>