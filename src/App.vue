<template>
  <div id="app">
    {{ player === 1 ? "白の番です。" : "黒の番です。" }}
    <p>黒:{{ blackPiece }} - 白:{{ whitePiece }}</p>
    <div class="content">
      <div class="board" v-for="(arrang, height) in board" v-bind:key="height">
        <div class="piece" v-for="(piece, width) in arrang" v-bind:key="width">
          <div
            v-bind:class="piecePrint(piece)"
            v-on:click="
              putPiece(height, width);
              pieceCalc();
            "
          >
            {{ height }},{{ width }}
          </div>
        </div>
      </div>
    </div>
    <button v-on:click="pass">Pass</button>
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
  data() {
    return {
      player: 1,
      blackPiece: 2,
      whitePiece: 2
    };
  },
  watch: {
    board: {
      handler: function() {
        this.player = -this.player;
      },
      deep: true
    }
  },
  computed: {
    board() {
      return this.$store.state.othello.arrangement[
        this.$store.state.othello.arrangement.length - 1
      ];
    }
  },
  methods: {
    putPiece: function(height, width) {
      if (this.board[height][width] !== 0) {
        alert("そこには置けません");
        return;
      }
      this.$store.dispatch("putPiece", {
        height: height,
        width: width,
        player: this.player
      });
    },
    putAiPiece: async function(player) {
      this.$store.dispatch("putAiPiece", player);
    },
    piecePrint: function(pieceNum) {
      if (pieceNum === 0) {
        return "";
      }

      if (pieceNum === 1) {
        return "whitepiece";
      }

      if (pieceNum === -1) {
        return "blackpiece";
      }
    },
    pass: function() {
      this.player = -this.player;
    },
    pieceCalc: function() {
      this.backPiece = this.board.flat().filter(i => i === -1).length;
      this.whitePiece = this.board.flat().filter(i => i === 1).length;
    }
  }
};
</script>
