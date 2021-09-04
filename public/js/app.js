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
        index: 0,
        nickname: "JimmyZ647",
        birthDate: "2002-03-23",
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

    playerAdded: false,
    playerEdited: false,
  };

  Vue.use(window.vuelidate.default);

  const { required, minLength, between } = window.validators;

  const myApp = new Vue({
    el: "#app",
    data: data,
    validations: {
      newPlayerObject: {
        nickname: {
          required,
          minLength: minLength(5),
        },
        birthDate: {
          required,
          minValue: (value) => value < new Date().toISOString(),
        },
        stars: {
          required,
          between: between(1, 100),
        },
        patent: {
          required,
        },
        password: {
          required,
          minLength: minLength(4),
        },
      },
    },
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

      addOrEditPlayer(v) {
        let { index, nickname, birthDate, stars, status, password, patent } =
          this.newPlayerObject;

        let player = {
          nickname: nickname.trim(),
          birthDate,
          stars,
          status,
          password: password.trim(),
          patent,
        };

        if (!v.$invalid) {
          if (isNaN(parseInt(index))) {
            // cria novo jogador
            this.players.push(player);
            this.playerAdded = true;
            setTimeout(() => {
              this.playerAdded = false;
            }, 3500);
          } else {
            // edita jogador
            this.players[index] = player;
            this.playerEdited = true;
            setTimeout(() => {
              this.playerEdited = false;
            }, 3500);
          }

          this.clearForm();
        }
      },

      editPlayer(index) {
        let { nickname, birthDate, stars, status, password, patent } =
          this.players[index];

        this.newPlayerObject.index = index;
        this.newPlayerObject.nickname = nickname;
        this.newPlayerObject.birthDate = birthDate;
        this.newPlayerObject.stars = stars;
        this.newPlayerObject.status = status;
        this.newPlayerObject.password = password;
        this.newPlayerObject.patent = patent;
      },

      removePlayer(index) {
        if (
          confirm(
            `Deseja mesmo excluir o jogador ${this.players[index].nickname}?`
          )
        ) {
          this.players.splice(index, 1);
        }
      },

      clearForm() {
        this.newPlayerObject.index = "";
        this.newPlayerObject.nickname = "";
        this.newPlayerObject.birthDate = "";
        this.newPlayerObject.stars = "";
        this.newPlayerObject.status = false;
        this.newPlayerObject.password = "";
        this.newPlayerObject.patent = "";
      },
    },
  });
});
