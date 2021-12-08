<template>
  <div class="card-attachment">
    <form @submit.prevent="onUpload($event)">
      <div class="upload">
        <label>
          Computer
          <input
            hidden
            class="file"
            type="file"
            id="upload"
            @change="attachment.type = 'upload'"
          />
        </label>
      </div>
      <label>
        Attach a link
        <input
          class="input"
          v-model="attachment.url"
          type="url"
          placeholder="Paste any link here..."
          @change="attachment.type = 'link'"
        />
      </label>
      <!-- <label>
				Upload image or video from computer
				<input class="file" type="file" id="upload" @change="attachment.type = 'upload'" />
			</label> -->
      <label>
        Attachment name (optional)
        <input class="input" type="text" v-model="attachment.title" />
      </label>
      <button class="btn-action-list" @click="onUpload($event)">Attach</button>
    </form>
  </div>
</template>

<script>
import { utilService } from "@/services/util.service.js";
export default {
  name: "card-attachment",

  data() {
    return {
      attachment: {
        type: "",
        url: "",
        title: "Attachment",
        createdAt: Date.now(),
        isEdit: false,
      },
      isLoading: false,
    };
  },
  methods: {
    cardCopy() {
      return JSON.parse(JSON.stringify(this.card));
    },
    async onUpload(ev) {
      let tmpCard = this.cardCopy();
      if (this.attachment.type === "link") {
        tmpCard.attachments.push(this.attachment);
      } else {
        const res = await utilService.upload(ev);
        tmpCard.attachments.push({
          ...this.attachment,
          type: res.type,
          url: res.url,
        });
        this.$notify({ title: "Finished!", type: "success" });
      }
      this.$emit("updateCard", tmpCard);
      // await this.$store.dispatch({type: 'saveCard', payload: {groupId: this.groupId, card: tmpCard}})
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
      return this.$store.getters.currCard;
    },
  },
};
</script>
