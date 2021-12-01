// Gets each card

<template>
  <div class="card-preview">
    <h1>Card preview</h1>
    <pre>{{card}}</pre>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'card-preview',
  props: ['card'],
  components: {
  }
}
</script>