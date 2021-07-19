/*
 * Elemento Jquery que só renderiza os elementos
 * do Vue quando os dados da página forem carregados
 * ou seja, estiverem ready (prontos) para uso.
 */

$(document).ready(function () {
  let data = {
    patents: [
      { code: 1, description: "Bronze" },
      { code: 2, description: "Prata" },
      { code: 3, description: "Ouro" },
    ],

    players: [
      {
        index: 1,
        nickname: "JimmyZ647",
        birthDate: "23/03/2002",
        stars: 5,
        status: true,
        password: "123diogo456",
        patent: { code: 3, description: "Ouro" },
      },
    ],

    newPlayerObject: {
      index: "",
      nickname: "",
      birthDate: "",
      stars: "",
      status: false,
      password: "",
      patent: "",
    },
    errors: ["Este campo é obrigatório! *", "Escolha uma patente! *"],
    invalid: {
      nickname: false,
      birthDate: false,
      stars: false,
      status: false,
      password: false,
      patent: false,
    },
  };

  const myApp = new Vue({
    el: "#app",
    data: data,
    methods: {
      isLetter(e) {
        let char = String.fromCharCode(e.keyCode); // Get the character
        if (/^[A-Za-z]+$/.test(char)) return true;
        // Match with regex
        else e.preventDefault(); // If not match, don't add to input text
      },

      starValidation(e) {
        let star = +e.key;
        if (
          !isNaN(star) &&
          star >= 1 &&
          star <= 5 &&
          e.target.value.length < 1
        ) {
          return true;
        } else {
          e.preventDefault();
        }
      },

      setId(array) {
        let index = 0;

        array.forEach((player) => {
          if (player.index > index) {
            index = player.index;
          }
        });
        return index + 1;
      },

      addOrEditPlayer(e) {
        let { index, nickname, birthDate, stars, status, password, patent } =
          this.newPlayerObject;

        let player = {
          index: index || this.setId(this.players),
          nickname: nickname.trim(),
          birthDate,
          stars,
          status,
          password: password.trim(),
          patent,
        };

        if (this.inputValidation()) {
          if (isNaN(parseInt(index))) {
            this.players.push(player);
          }
        } else {
          e.preventDefault();
        }
      },

      editPlayer(index) {
        console.log(index);
      },

      removePlayer(index) {
        console.log(index);
      },

      inputValidation() {
        let elements = ["nickname", "birthDate", "stars", "password", "patent"];

        elements.forEach((element) => {
          if (!this.newPlayerObject[element]) {
            this.invalid[element] = true;
          } else {
            this.invalid[element] = false;
          }
        });

        if (
          this.newPlayerObject.nickname &&
          this.newPlayerObject.birthDate &&
          this.newPlayerObject.stars &&
          this.newPlayerObject.password &&
          this.newPlayerObject.patent
        ) {
          return true;
        } else {
          return false;
        }
      },
    },
  });
});
