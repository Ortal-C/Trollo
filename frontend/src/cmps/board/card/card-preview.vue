// Gets each card

<template>
  <div class="card-preview">
    <p>{{card.title}}</p>
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