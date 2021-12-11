// Details and edit, gets cardId from params

<template>
  <div class="card-details" v-if="card && group" @keydown.esc="closeDetails">
    <!-- <div class="card-details-cover" v-if="card.style.color" :style="`background-color:${card.style.color}`"></div> -->
    <div class="card-details-cover" v-if="card.style.color" :style="card.style.color.includes('cloudinary') ? `background: url(${card.style.color}); background-size: contain; background-repeat: no-repeat;` : `background-color:${card.style.color}`"></div>
    <div class="card-details-header">
      <div class="card-details-header-content">
        <header>
          <span v-html="getHeaderSvg"></span>
          <div class="title">
            <h2 v-if="!isEdit" @click="isEdit = !isEdit">{{ card.title }}</h2>
            <form v-else
              @submit.prevent="editTitle(group.id)"
              @change="editTitle(group.id)"
              action=""
            >
              <input type="text" v-model="title" :placeholder="card.title" />
            </form>
            <p>In list <span class="group-title">{{ group.title }}</span></p>
          </div>
        </header>
      </div>
      <button class="close-btn" @click="closeDetails">✖</button>
    </div>
    <div class="card-details-main-container">
      <div class="card-details-main">
        <div class="data-preview" v-if="card.members.length">
          <h5>Members</h5>
          <main class="members-container">
            <div v-for="member in card.members" :key="member._id">
              <span
                ><el-avatar :size="33" :src="member.imgUrl"></el-avatar
              ></span>
            </div>
            <span @click="openMemberModal" class="add-member"><i class="el-icon-plus"></i></span>
          </main>
        </div>
        <div class="data-preview" v-if="labels && card.labelsIds.length">
          <h5>Labels</h5>
          <main class="labels-container">
            <div
              class="card-label"
              v-for="label in labels"
              :key="label.id"
              :style="`background-color:${label.color}`"
            >
              <span :title="label.title">{{ label.title }}</span>
            </div>
          </main>
        </div>
        <div class="data-preview due-date-container" v-if="card.dueDate">
          <h5>Due date</h5>
          <input type="checkbox" :checked="card.isDone" @change="toggleDueDate" />
          <span>{{ new Date(card.dueDate).toLocaleString("HEB").substring(0, 10) }}</span>
          <el-tag v-if="card.isDone" type="success">Complete</el-tag>
        </div>
        <div class="card-details-desc">
          <span v-html="getDescriptionSvg"></span>
          <main>
            <h2>Description</h2>
            <section class="description-container">
              <!-- <div > -->
              <textarea
                @change="addDesc(group.id)"
                class="desc-txt-show"
                v-if="!isDesc"
                @click="isDesc = !isDesc"
                cols="30"
                rows="1"
                :placeholder="desc"
              ></textarea>
              <form v-else action="" @submit.prevent="addDesc(group.id)">
                <textarea
                  class="desc-txt-edit"
                  v-model="description"
                  cols="30"
                  rows="6"
                  :placeholder="desc"
                ></textarea>
                <div class="actions-desc">
                  <button class="add-desc-btn">Save</button>
                  <svg
                    class="close-desc-btn"
                    @click="isDesc = !isDesc"
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    style="
                      color: rgb(66, 82, 110);
                      font-size: 24px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <path
                      d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"
                    ></path>
                  </svg>
                </div>
              </form>
            </section>
          </main>
        </div>
        <div class="card-details-attachment" v-if="card.attachments.length">
          <span v-html="getAttachmentSvg"></span>
          <main>
            <h2>Attachments</h2>
            <div
              class="card-attachment"
              v-for="(attachment, idx) in card.attachments"
              :key="attachment.id"
            >
              <a :href="attachment.url" target="_blank">
                <img
                  v-if="attachment.url.includes('cloudinary')"
                  :src="attachment.url"
                />
                <img v-else src="@/assets/imgs/link-thumbnail.png" />
              </a>
              <div class="attachment-details">
                <span class="attachment-title">{{ attachment.title }}</span>
                <div class="attachment-actions">
                  <span v-if="attachment.createdAt">{{ new Date(attachment.createdAt).toLocaleString('HEB') }}</span>
                  <span class="attachment-action" @click="removeAttachment(idx)" >Delete</span>
                  <span class="attachment-action" @click="editAttachment(attachment)"> Edit</span>
                   <div v-if="attachment.isEdit" class="dynamic-popover">
                    <div class="popover-header">
                      <span class="popover-title"> Edit attachment </span>
                      <span
                        v-html="getCloseSvg"
                        @click="attachment.isEdit = false"
                      ></span>
                    </div>
                    <!-- edit still not working -->
                    Attachment name:
                    <input type="url" :value="attachment.title" />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <section class="checklist-container">
          <div class="checklist" v-for="(checklist, idx) in card.checklists" :key="idx">
            <div class="checklist-header">
              <div class="checklist-desc">
                <span
                  ><svg
 class="action-svg"
 stroke="currentColor"
 fill="currentColor"
 stroke-width="0"
 viewBox="0 0 16 16"
 height="1em"
 width="1em"
 xmlns="http://www.w3.org/2000/svg" >
                    <path
                      fill-rule="evenodd"
                      d="M14.5 3h-13a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-13-1A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z"
                      clip-rule="evenodd"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      d="M7 5.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-1.496-.854a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 11.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0zM7 9.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-1.496-.854a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 01.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0z"
                      clip-rule="evenodd"
                    ></path></svg
                ></span>
                <h2>{{ checklist }}</h2>
              </div>
              <button @click="removeCecklist(idx)">Delete</button>
            </div>
            <div class="checklist-main">
              <span>0%</span>
              <div class="checklist-progress"></div>
            </div>
            <button>Add an item</button>
          </div>
          <div >
            <!-- <form @submit.prevent="">
              <textarea
                class="add-item"
                v-model="card.title"
                placeholder="Add an item"
              ></textarea>
              <div>
                <button class="btn-add">Add card</button>
                <svg
                  class="btn-close icon"
                  @click.prevent="closeTextarea()"
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  style="
                    color: rgb(66, 82, 110);
                    font-size: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <path
                    d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"
                  ></path>
                </svg>
              </div>
            </form> -->
          </div>
        </section>
        <div class="card-details-activity">
          <span v-html="getActivitySvg"></span>
          <main>
            <h2>Activity</h2>
            <div v-if="!isActivity" @click="isActivity = !isActivity" class="activity-area">
              <textarea class="activity-txtarea" placeholder="Write a comment..." rows="1"></textarea>
            </div>
            <div v-else class="activity-area" @change="addComment(group.id)">
              <form action="" @submit.prevent="addComment(group.id)">
                <textarea
                  v-model="comment"
                  class="activity-txtarea"
                  placeholder="Write a comment..."
                  rows="1"
                ></textarea>
                <button>Save</button>
              </form>
            </div>
            <section class="activities" v-if="card.comments.length">
              <ul v-for="comment in card.comments" :key="comment.id">
                <li>
                  <div class="comments">{{ comment }}</div>
                </li>
              </ul>
            </section>
          </main>
        </div>
      </div>
      <div class="card-details-sidebar">
        <div class="add-to-card">
          <h3 class="add-to-card-title">Add to card</h3>
          <div v-for="action in actions" :key="action.type">
            <div class="action-div" @click="action.isOpen = !action.isOpen">
              <span v-html="action.svg"></span>
              {{ action.title }}
            </div>
            <div v-if="action.isOpen" class="dynamic-popover">
              <div class="popover-header">
                <span class="popover-title">{{ action.title }}</span>
                <span
                  v-html="getCloseSvg"
                  @click="action.isOpen = false"
                  @keydown.esc="action.isOpen = false"
                ></span>
              </div>
              <component
                :card="card"
                :is="`card-${action.type}`"
                @addChecklist="closeActionModal"
                @closeActionModal="closeActionModal"
                @updateCard="updateCard"
              ></component>
            </div>
          </div>
          <div class="action-div" @click="removeCard(groupId, cardId)">
            <span v-html="getArchiveSvg"></span>
            Archive
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { boardService } from '../services/board.service.js';
import {socketService} from '@/services/socket.service.js'
import cardMembers from '@/cmps/board/card/add/card-members.vue';
import cardLabels from '@/cmps/board/card/add/card-labels.vue';
import cardChecklist from '@/cmps/board/card/add/card-checklist.vue';
import cardDates from '@/cmps/board/card/add/card-dates.vue';
import cardAttachment from '@/cmps/board/card/add/card-attachment.vue';
import cardCover from '@/cmps/board/card/add/card-cover.vue';

export default {
  name: "card-details",
  data() {
    return {
      actions: [
        {
          title: "Members",
          type: "members",
          isOpen: false,
          svg: `<svg class="action-svg" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <circle fill="none" cx="12" cy="7" r="3"></circle> <path   d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" ></path> </svg>`,
        },
        {
          title: "Labels",
          type: "labels",
          isOpen: false,
          svg: ` <svg class="action-svg" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <path   d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z" ></path> </svg>`,
        },
        {
          title: "CheckList",
          type: "checklist",
          isOpen: false,
          svg: `<svg class="action-svg" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <path   fill-rule="evenodd"   d="M14.5 3h-13a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-13-1A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z"   clip-rule="evenodd" ></path> <path   fill-rule="evenodd"   d="M7 5.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-1.496-.854a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 11.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0zM7 9.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-1.496-.854a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 01.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0z"   clip-rule="evenodd" ></path> </svg>`,
        },
        {
          title: "Dates",
          type: "dates",
          isOpen: false,
          svg: `<svg class="action-svg" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <path   fill-rule="evenodd"   d="M8 15A7 7 0 108 1a7 7 0 000 14zm8-7A8 8 0 110 8a8 8 0 0116 0z"   clip-rule="evenodd" ></path> <path   fill-rule="evenodd"   d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z"   clip-rule="evenodd" ></path> </svg>`,
        },
        {
          title: "Attachment",
          type: "attachment",
          isOpen: false,
          svg: `<svg class="action-svg" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"> <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>`,
        },
        {
          title: "Cover",
          type: "cover",
          isOpen: false,
          svg: `<svg class="action-svg" stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <path d="M4 9C4 8.44772 4.44772 8 5 8H9C9.55228 8 10 8.44772 10 9C10 9.55228 9.55228 10 9 10H5C4.44772 10 4 9.55228 4 9Z" fill="currentColor" ></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M4 3C1.79086 3 0 4.79086 0 7V17C0 19.2091 1.79086 21 4 21H20C22.2091 21 24 19.2091 24 17V7C24 4.79086 22.2091 3 20 3H4ZM20 5H4C2.89543 5 2 5.89543 2 7V14H22V7C22 5.89543 21.1046 5 20 5ZM22 16H2V17C2 18.1046 2.89543 19 4 19H20C21.1046 19 22 18.1046 22 17V16Z" fill="currentColor" ></path></svg>`,
        },
      ],
      board: null,
      labels: [],
      activities: [],
      //is item opens
      isDesc: false,
      isActivity: false,
      isEdit: false,
      title: "",
      description: "",
      comment: "",
    };
  },
  async created() {
    if (this.cardId) {
      const board = await boardService.getById(this.boardId);
      this.board = board;
			socketService.emit('board-watch', board)
      const group = board.groups.find((group) => group.id === this.groupId);
      this.$store.commit({ type: "setCurrGroup", group });
      const card = group.cards.find((card) => card.id === this.cardId);
      this.$store.commit({ type: 'setCurrCard', card });
      this.description = card.description;
      this.title = card.title;
      this.getLabels;
    }
  },
  methods: {
    // setBoard(board) {
    // 	this.$store.commit({type: 'setBoard', board})
    // },
    openMemberModal() {
      const idx = this.actions.findIndex((action) => action.type === "members");
      this.actions[idx].isOpen = true;
    },
    closeDetails() {
      this.$router.back(-1);
      // this.$router.push('/board/' + this.board._id)
      document.body.classList.remove("details-open");
    },
    closeActionModal(type) {
      let action = this.actions.find((action) => action.type === type);
      if (action) action.isOpen = false;
    },
    async updateCard(card) {
      await this.$store.dispatch({ type: "saveCard", payload: { groupId: this.groupId, card }});
      // socketService.emit('board-watch', this.board)
    },
    async removeCard(groupId, cardId) {
      await this.$store.dispatch({
        type: "removeCard",
        payload: { groupId, cardId },
      });
      // socketService.emit('board-watch', this.board)
      this.closeDetails();
    },
    cardCopy() {
      return JSON.parse(JSON.stringify(this.card));
    },
    async addDesc(groupId) {
      this.isDesc = !this.isDesc;
      let card = this.cardCopy();
      card.description = this.description;
      await this.$store.dispatch({
        type: "saveCard",
        payload: { groupId, card },
      });
      // socketService.emit('board-watch', this.board)
    },
    async editTitle(groupId) {
      this.isEdit = !this.isEdit;
      let card = this.cardCopy();
      if (!this.title) return;
      card.title = this.title;
      await this.$store.dispatch({
        type: "saveCard",
        payload: { groupId, card },
      });
      // socketService.emit('board-watch', this.board)
    },
    getLabel(labelId) {
      const label = this.board.labels.find((id) => id === labelId);
      return label || null;
    },
    async removeCecklist(idx) {
      let card = this.cardCopy();
      card.checklists.splice(idx, 1);
      await this.$store.dispatch({
        type: "saveCard",
        payload: { groupId: this.groupId, card },
      });
      // socketService.emit('board-watch', this.board)
    },
    async addComment(groupId) {
      this.isActivity = !this.isActivity;
      if (!this.comment) return;
      let card = this.cardCopy();
      card.comments.unshift(this.comment);
      console.log(
        "New comment was added!",
        this.comment,
        card.comments,
        card.comments.length,
        groupId
      );
      await this.$store.dispatch({
        type: "saveCard",
        payload: { groupId, card },
      });
      // socketService.emit('board-watch', this.board)
      this.comment = "";
    },
    async removeAttachment(idx) {
      let card = this.cardCopy();
      card.style = {size: '', color: ''}
      card.attachments.splice(idx, 1);
      await this.$store.dispatch({
        type: "saveCard",
        payload: { groupId: this.groupId, card },
      });
      // socketService.emit('board-watch', this.board)
    },
    editAttachment(attachment) {
      attachment.isEdit = !attachment.isEdit;
      console.log(attachment);
    },
    async toggleDueDate(ev) {
      let card = this.cardCopy();
      await this.$store.dispatch({
        type: "saveCard",
        payload: {
          groupId: this.groupId,
          card: { ...card, isDone: ev.target.checked },
        },
      });
      // socketService.emit('board-watch', this.board)
    },
  },
  computed: {
    card() {
      return this.$store.getters.currCard;
    },
    group() {
      return this.$store.getters.currGroup;
    },
    boardId() {
      return this.$route.params.boardId;
    },
    groupId() {
      return this.$route.params.groupId;
    },
    cardId() {
      return this.$route.params.cardId;
    },
    desc() {
      // return this.card.description ||  "Add a more detailed description..."
      return !this.card.description
        ? "Add a more detailed description..."
        : this.card.description;
    },
    getLabels() {
      if (this.$store.getters.currCard.labelsIds.length > 0) {
        const labels = this.$store.getters.board.labels;
        this.labels = labels.filter((label) =>
          this.card.labelsIds.includes(label.id)
        );
      }
    },
    getHeaderSvg() {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style="fill: #000000" > <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal" > <path d="M0,172v-172h172v172z" fill="none"></path> <g fill="#34495e"> <path d="M28.66667,28.66667c-7.91917,0 -14.33333,6.41417 -14.33333,14.33333v14.33333v21.5v50.16667c0,7.91917 6.41417,14.33333 14.33333,14.33333h114.66667c7.91917,0 14.33333,-6.41417 14.33333,-14.33333v-50.16667v-21.5v-14.33333c0,-7.91917 -6.41417,-14.33333 -14.33333,-14.33333zM28.66667,43h114.66667v14.33333h-114.66667zM28.66667,78.83333h114.66667v50.16667h-114.66667z" ></path> </g> </g> </svg>`;
    },
    getDescriptionSvg() {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style="fill: #000000" > <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal" > <path d="M0,172v-172h172v172z" fill="none"></path> <g fill="#34495e"> <path d="M26.875,32.25c-1.93842,-0.02741 -3.74144,0.99102 -4.71865,2.66532c-0.97721,1.6743 -0.97721,3.74507 0,5.41937c0.97721,1.6743 2.78023,2.69273 4.71865,2.66532h118.25c1.93842,0.02741 3.74144,-0.99102 4.71865,-2.66532c0.97721,-1.6743 0.97721,-3.74507 0,-5.41937c-0.97721,-1.6743 -2.78023,-2.69273 -4.71865,-2.66532zM26.875,57.33333c-1.93842,-0.02741 -3.74144,0.99102 -4.71865,2.66532c-0.97721,1.6743 -0.97721,3.74507 0,5.41937c0.97721,1.6743 2.78023,2.69273 4.71865,2.66532h118.25c1.93842,0.02741 3.74144,-0.99102 4.71865,-2.66532c0.97721,-1.6743 0.97721,-3.74507 0,-5.41937c-0.97721,-1.6743 -2.78023,-2.69273 -4.71865,-2.66532zM26.875,82.41667c-1.93842,-0.02741 -3.74144,0.99102 -4.71865,2.66532c-0.97721,1.6743 -0.97721,3.74507 0,5.41937c0.97721,1.6743 2.78023,2.69273 4.71865,2.66532h118.25c1.93842,0.02741 3.74144,-0.99102 4.71865,-2.66532c0.97721,-1.6743 0.97721,-3.74507 0,-5.41937c-0.97721,-1.6743 -2.78023,-2.69273 -4.71865,-2.66532zM26.875,107.5c-1.93842,-0.02741 -3.74144,0.99102 -4.71865,2.66532c-0.97721,1.6743 -0.97721,3.74507 0,5.41937c0.97721,1.6743 2.78023,2.69273 4.71865,2.66532h118.25c1.93842,0.02741 3.74144,-0.99102 4.71865,-2.66532c0.97721,-1.6743 0.97721,-3.74507 0,-5.41937c-0.97721,-1.6743 -2.78023,-2.69273 -4.71865,-2.66532zM26.875,132.58333c-1.93842,-0.02741 -3.74144,0.99102 -4.71865,2.66532c-0.97721,1.6743 -0.97721,3.74507 0,5.41937c0.97721,1.6743 2.78023,2.69273 4.71865,2.66532h78.83333c1.93842,0.02741 3.74144,-0.99102 4.71865,-2.66532c0.97721,-1.6743 0.97721,-3.74507 0,-5.41937c-0.97721,-1.6743 -2.78023,-2.69273 -4.71865,-2.66532z" ></path> </g> </g> </svg>`;
    },
    getActivitySvg() {
      return `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" > <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" ></path> </svg>`;
    },
    getAttachmentSvg() {
      return `<svg stroke="currentColor" fill="none" stroke-width="" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" class="action-svg"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>`;
    },
    getCloseSvg() {
      return `<svg class="close-popover" @click="action.isOpen = false" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style="fill: #000000" > <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal" > <path d="M0,172v-172h172v172z" fill="none"></path> <g fill="#666666"> <path d="M33.73372,23.59961l-10.13411,10.13411l52.26628,52.26628l-52.26628,52.26628l10.13411,10.13411l52.26628,-52.26628l52.26628,52.26628l10.13411,-10.13411l-52.26628,-52.26628l52.26628,-52.26628l-10.13411,-10.13411l-52.26628,52.26628z" ></path> </g> </g> </svg>`;
    },
    getArchiveSvg() {
      return `<svg class="action-svg" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 14 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <path fill-rule="evenodd" d="M13 2H1v2h12V2zM0 4a1 1 0 0 0 1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v2zm2 1h10v9H2V5zm2 3h6V7H4v1z" ></path> </svg>`;
    },
  },
  watch: {
    "card.labelsIds"() {
      this.getLabels;
    },
  },
  components: {
    cardMembers,
    cardLabels,
    cardChecklist,
    cardDates,
    cardAttachment,
    cardCover,
  },
};
</script>
