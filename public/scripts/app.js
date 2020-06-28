$(() => {

  // $(function () {
  //   const $button = $('#add')
  //   $button.on("click", (event) => {
  //     event.preventDefault(event);
  //     console.log("uhoh")
  //     const data = new FormData(document.getElementById("newAccount"))
  //     $.ajax({
  //       method: "POST",
  //       url: "/websites",
  //       data: data,
  //       processData: false,
  //       conrtentType: false
  //     })
  //       .then(() => {
  //         loadAccounts()

  //       })
  //   })
  // })





  $(() => {
    const $genBtn = $("#generate");
    $genBtn.on("click", (event) => {
      event.preventDefault(event);

      const passwordLength = $("#charLimit").val();
      const passGenerator = (num) => {
        const numbers = "0123456789";
        const lowerChars = "abcdefghijklmopqrstuvwxyz"
        const upperChars = lowerChars.toUpperCase();
        const specialChars = "!@#$%^&*()_-+="
        let allChars = "";
        if ($("#uppercase").is(':checked')) {
          allChars += upperChars;
        }

        if ($("#lowercase").is(':checked')) {
          allChars += lowerChars;
        }
        if ($("#numbers").is(':checked')) {
          allChars += numbers;
        }
        if ($("#specialCharacter").is(':checked')) {
          allChars += specialChars;
        } if (allChars === "") {
          console.log("Please select at least one parameter");
        }

        function getRandomBetween(min, max) {
          return Math.floor(Math.random() * (max - min + 1) + min);
        }
        let randomNum = getRandomBetween(1, num)

        let password = ""
        let i = 0;
        const numOfChars = allChars.length;
         while (i < passwordLength) {
           password += allChars.charAt(Math.floor(Math.random() * numOfChars));
           i++;
         }
        return password;
      }

     $("#addPassword").val(passGenerator(passwordLength));
    })
  })





  const createAccountElement = (accountData) => {
    const $account = $(`
       <section class="account" style="margin: 5vh 0; border: 2px solid black">
       <div class="row-beside">

         <h4>image</h4>
         <div>
           <h3>${accountData.url}</h3>
           <h3>${accountData.username}</h3> <!-- stretch to change username-->
         </div>
      </div>
      <form class="row-beside">
        <h3 id='editPassword'>${accountData.password}</h3> <!-- toggle or on hover (or the eye thing)-->
        <button class='copy'>Copy</button>
      </form>
       <form>
         <button class='edit'>Edit</button>
         <button class='delete'>Delete</button>
       </form>
     </section>
          `)

    return $account;

  }

  const getAccounts = () => {
    const renderAccounts = (accounts) => {
      for (const account in accounts) {
        for (const acc in account) {
          const category = accounts[account][acc].category;
          const $account = createAccountElement(accounts[account][acc]);
          if (category === 'social') {
            $('#socialSection').append($account)
          } else if (category === 'work') {
            $('#workSection').append($account)
          } else if (category === 'entertainment') {
            $('#entertainmentSection').append($account)
          } else if (category === 'other') {
            $('#otherSection').append($account)
          } else {
            console.log('invalid category')
          }
        }

      }
    }

    const loadAccounts = () => {
      $.getJSON('/websites')
        .then(function (data) {
          $('#accountContainerSocial').empty();
          $('#accountContainerWork').empty();
          $('#accountContainerEntertainment').empty();
          $('#accountContainerOther').empty();
          renderAccounts(data);
        })
    }

    loadAccounts();
  }

  getAccounts();



});
