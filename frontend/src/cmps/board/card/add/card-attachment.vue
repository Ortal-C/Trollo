<template>
  <div class="card-attachment">
    <label>
      Attach a link
      <input
        v-model="linkUrl"
        type="url"
        placeholder="Pase any link here..."
        @keydown.enter="onUpload('link', $event)"
      />
    </label>
    <label>
      Upload image or video from computer
      <input type="file" id="upload" @change="onUpload('upload', $event)" />
    </label>
    <div>
      My uploads:
      <div v-for="(attachment, idx) in card.attachments" :key="idx">
        <a :href="attachment.url" target="_blank">
          <img height='100px' width='100px' :src="attachment.url"/>
          <p>
            File link
          </p>
        </a>
        <!-- </iframe> -->
      </div>
    </div>
  </div>
</template>

<script>
import { utilService } from '@/services/util.service.js';
export default {
  name: 'card-attachment',

  data() {
    return {
      linkUrl: '',
      isLoading: false
    }
  },
  methods: {
    cardCopy() {
      return JSON.parse(JSON.stringify(this.card));
    },
    async onUpload(type, ev) {
      let tmpCard = this.cardCopy()
      if (type === 'link') {
        tmpCard.attachments.push({ type, url: this.linkUrl })
      }
      else {
        const res = await utilService.upload(ev);
        tmpCard.attachments.push({ type:res.type, url: res.url })
      }
      await this.$store.dispatch({ type: "saveCard", payload: { groupId: this.groupId, card: tmpCard } });
    }
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
  }
}
</script>