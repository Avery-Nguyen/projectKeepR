
$(() => {

  const $genBtn = $("#generate");
  $genBtn.on("click", (event) => {
    event.preventDefault(event);

    const passwordLength = $("#charLimit").val();
    const passGenerator = () => {
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
  });

  const createAccountElement = (accountData) => {
    const $account = $(`
      <article class="arrange-website" id="accountContainer">
        <section class="account">
          <img class ='website-img' src="https://logo.clearbit.com/${accountData.url}" data-default-src="https://http.cat/404">
            <div class="row-beside website-info">
            <div class='url-username-display'>
                <h3>${accountData.url}</h3>
                <h3 >${accountData.username}</h3> <!-- stretch to change username-->
              </div>
              <div class="hover-website left-flex">
                <div id="copiedAlert" style="border: 2px black solid; height: 50px; margin-top: 16px">
                  <p>Copied to clipboard!</p>
                </div>
                <div class='row-beside'>
                <form class='row-beside editPass' method="post" action="/websites/${accountData.id}">
                <input class='text editPassword' type='text' name='editPass' value='${accountData.password}'>

                <button class="material-icons-two-tone btn-design edit">build</button>
                </form>
                <div>
                  <button class="material-icons-two-tone copy btn-design">content_copy</button>
                </div>
                <form action="/websites/${accountData.id}/delete" method="POST">
                  <button  class="material-icons-two-tone btn-design delete">delete</button>
                </form>
                </div>
              </div>
              </div>
            </div>

        </section>
      </article>
          `)

    return $account;

  }

  const renderAccounts = (accounts) => {
    for (const account of accounts.websites) {
      const category = account.category; //selects category value
      const $account = createAccountElement(account); //takes in the object and feeds it to the function to render templates
      if (category === 'social') {
        $('#socialSection').prepend($account)
      } else if (category === 'work') {
        $('#workSection').append($account)
      } else if (category === 'entertainment') {
        $('#entertainmentSection').append($account)
      } else if (category === 'other') {
        $('#otherSection').append($account)
      } else {
        console.log('invalid category')
      }

      $('img[data-default-src]').each(function(){
        var defaultSrc = $(this).data('default-src');
        $(this).on('error', function(){
          $(this).attr({src: defaultSrc});
        });
     });

      $(".arrange-website").hover(function () {
        $(this).find("#copiedAlert").hide();
        $(this).find(".hover-website").show();
        $(this).find(".copy").click(function (event) {
          event.preventDefault(event);
          const passwordField = $(this).parent().parent().parents().find(".editPassword");
          passwordField.select();

          document.execCommand("copy");
          $(this).parent().parent().parent().find("#copiedAlert").show();

        })

      },
        function () {
          $(this).find(".hover-website").hide();
        });
    };
  }



  const loadAccounts = function () {
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

  $("#newAccount").validate({
    rules: {
      newWebsite: "required",
      newUsername: "required",
      newCategory: "required",
      newPass: "required"
    },
    messages: {
      newWebsite: "Please enter a URL",
      newUsername: "Please enter your username",
      newCategory: "Please select a category",
      newPass: "Please provide your password"
    },
    submitHandler: function(form) {
      form.ajaxSubmit();
    }
  });

})








