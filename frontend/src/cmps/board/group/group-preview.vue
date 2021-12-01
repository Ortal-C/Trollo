// Gets each group
// v-for card in cards to card-preview, send card prop

<template>
  <div class="group-preview">
    <h1>Group preview</h1>
    <pre>{{group}}</pre>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'group-preview',
  props: ['group'],
  components: {
  }
}
</script>