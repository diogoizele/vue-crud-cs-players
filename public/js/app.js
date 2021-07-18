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
      stars: 0,
      status: false,
      password: "",
      patent: null,
    },
    errors: [],
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

      editPlayer(index) {
        console.log(index);
      },

      removePlayer(index) {
        console.log(index);
      },

      
    },
  });
});
