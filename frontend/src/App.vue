<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/board">Boards</router-link> |
      <router-link to="/board/boardId">Board</router-link>
    </div>
    <router-view/>
  </div>
</template>