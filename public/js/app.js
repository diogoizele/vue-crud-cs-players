/*
 * Elemento Jquery que só renderiza os elementos
 * do Vue quando os dados da página forem carregados
 * ou seja, estiverem ready (prontos) para uso.
 */

$(document).ready(function () {
  let data = {
    patents: [],
    players: [],

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

  Vue.prototype.$http = axios;
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
        this.newPlayerObject.patent = patent.name;
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
    created() {
      getPlayerFromWebService(
        "http://localhost:4040/listPlayers",
        this.players
      );
      getPatentFromWebService(
        "http://localhost:4040/listPatents",
        this.patents
      );
    },
  });
});

function getPlayerFromWebService(url, array) {
  axios
    .get(url)
    .then((response) => response.data)
    .then((data) => {
      data.forEach((player) => {
        array.push({
          nickname: player.nickname,
          birthDate: player.data_nascimento,
          stars: player.qtd_estrela,
          password: player.senha,
          patent: { code: player.codigo, name: player.nome },
          singInDate: player.data_cadastro,
        });
      });
    });
}

function getPatentFromWebService(url, array) {
  axios
    .get(url)
    .then((response) => response.data)
    .then((data) =>
      data.forEach((patent) => {
        array.push({
          code: patent.codigo,
          name: patent.nome,
          description: patent.descricao,
        });
      })
    );
}
