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
      <article class="arrange-website" id="accountContainer">
        <section class="account">
          <img class ='website-img'src='https://www.clipartmax.com/png/middle/223-2237244_download-facebook-logo-free-png-transparent-image-and-find-us-on-facebook.png'>
            <div class="row-beside website-info">
            <div class='url-username-display'>
                <h3>${accountData.url}</h3>
                <h3 >${accountData.username}</h3> <!-- stretch to change username-->
              </div>
              <div class="hover-website">
                <form id="editPass" class='row-beside' method="post" action="/websites/${accountData.id}">
                  <input type='text' id='editPassword' name='editPass' value='${accountData.password}'>
                  <button id='copy' class="material-icons-two-tone copy">content_copy</button>
                  <button id='edit' class="material-icons-two-tone">build</button>
                </form>
                <form action="/websites/${accountData.id}/delete" method="POST">
                <button id='delete' class="material-icons-two-tone">delete</button>
                </form>
              </div>
              </div>
            </div>

        </section>
        <div id="copiedAlert" style="border: 2px black solid; height: 50px; margin-top: 16px">
        <p>Copied to clipboard!</p>
        </div>
      </article>
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

          $(".arrange-website").hover(function() {
            $(this).find(".hover-website").show();
            $(this).find("#copy").click( function(event) {
              event.preventDefault(event);
            const passwordField = $(this).parent().parent().find("#editPassword");
            passwordField.select();
              document.execCommand("copy");

            });
          },
          function() {
            $(this).find(".hover-website").hide();
          });
        }
      }

      $(this).find("#edit").click(function (event) {
        event.preventDefault(event);
        $.post( `/websites/${accounts[account][acc].id}`, $( "#editPassword" ).serialize());
      });
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
