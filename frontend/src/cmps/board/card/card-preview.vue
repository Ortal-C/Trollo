// Gets each card

<template>
  <div class="card-preview">
    <h3>{{card.title}}</h3>
    <!-- ADD NEW CARD -->
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