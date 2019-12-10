<template>
  <div id="app">
    <div class="content">
      <div
        class="board"
        v-for="(arrang, height) in board.arrangement[
          board.arrangement.length - 1
        ]"
        v-bind:key="height"
      >
        <div class="piece" v-for="(piece, width) in arrang" v-bind:key="width">
          <div
            v-bind:class="pieceCalc(piece)"
            v-on:click="putPiece(height, width)"
          >
            {{ height }},{{ width }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.content {
  height: 400px;
  width: 400px;
  border: thick solid black;
}

.board {
  display: flex;
}
.piece {
  display: block;
  background: #009966;
  width: 48px;
  height: 48px;
  border: 1px solid white;
}

.whitepiece {
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 50%;
  margin: 2px auto;
}

.blackpiece {
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 50%;
  margin: 2px auto;
}
</style>

<script>
export default {
  name: "app",
  computed: {
    board() {
      return this.$store.state.othello;
    }
  },
  methods: {
    putPiece: function(height, width) {
      this.$store.dispatch("putPiece", {
        height: height,
        width: width
      });
    },
    pieceCalc: function(pieceNum) {
      if (pieceNum === 0) {
        return "";
      }

      if (pieceNum === 1) {
        return "whitepiece";
      }

      if (pieceNum === -1) {
        return "blackpiece";
      }
    }
  }
};
</script>
