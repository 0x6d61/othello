<template>
  <div id="app">
    <p>hello</p>
    <div class="content">
      <div
        class="board"
        v-for="arrang in board.arrangement"
        v-bind:key="arrang"
      >
        <div class="piece" v-for="piece in arrang" v-bind:key="piece">
          <div v-bind:class="pieceCalc(piece)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.content {
  height: 528px;
  width: 528px;
  border: thick solid black;
}

.board {
  display: flex;
}
.piece {
  background: #009966;
  width: 64px;
  height: 64px;
  border: 1px solid white;
}

.whitepiece {
  width: 64px;
  height: 64px;
  background: white;
  border-radius: 50%;
}

.blackpiece {
    width: 64px;
  height: 64px;
  background: black;
  border-radius: 50%;
}
</style>

<script>
export default {
  name: "app",
  data() {
    return {
      board: this.$store.state.othello
    };
  },
  methods: {
    pieceCalc: function(pieceNum) {
      if (pieceNum === 0) {
        return "";
      }

      if (pieceNum === 1) {
        return "whitepiece"
      }

      if (pieceNum === -1) {
        return "blackpiece";
      }
    }
  }
};
</script>
