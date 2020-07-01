
$(() => {

  const hideCategory = function() {
    if ($("#category").find("#socialSection").children().length === 0) {
    $("#category").find("#socialTitle").hide();
  } else {
    $("#category").find("#socialTitle").show();
  }
  if ($("#category").find("#workSection").children().length === 0) {
    $("#category").find("#workTitle").hide();
  } else {
    $("#category").find("#workTitle").show();
  }
  if ($("#category").find("#entertainmentSection").children().length === 0) {
    $("#category").find("#entertainmentTitle").hide();
  } else {
    $("#category").find("#entertainmentTitle").show();
  }
  if ($("#category").find("#otherSection").children().length === 0) {
    $("#category").find("#otherTitle").hide();
  } else {
    $("#category").find("#otherTitle").show();
  }
}

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
      <article class="arrange-website accounts" id="accountContainer">
        <section class="account">
          <img class ='website-img' src="https://logo.clearbit.com/${accountData.url}" data-default-src="https://media0.giphy.com/media/9J7tdYltWyXIY/giphy.gif?cid=ecf05e47e8e8d9054876692ac07204e6c150f72532cd528f&rid=giphy.gif">
            <div class="row-beside website-info">
            <div class='url-username-display'>
                <h3 class="url">${accountData.url}</h3>
                <h3 class='usename-text'>${accountData.username}</h3> <!-- stretch to change username-->
              </div>
              <div class="hover-website left-flex">
                <div>
                  <form class='row-beside editPass' method="post" action="/websites/${accountData.id}">
                    <input class='text editPassword' type='text' name='editPass' value='${accountData.password}'>
                    <button class="material-icons-two-tone btn-design edit">build</button>
                  </form>
                  <div class='row-beside'>
                    <button class="material-icons-two-tone copy btn-design">content_copy</button>
                    <form action="/websites/${accountData.id}/delete" method="POST">
                      <button  class="material-icons-two-tone btn-design delete">delete</button>
                    </form>
                    <div id="copiedAlert">
                      <span class="material-icons">
                      library_add_check
                      </span>
                  </div>
                  </div>
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

      $('img[data-default-src]').each(function () {
        var defaultSrc = $(this).data('default-src');
        $(this).on('error', function () {
          $(this).attr({ src: defaultSrc });
        });
      });

      $(".arrange-website").hover(function (event) {
        event.preventDefault(event);
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

      let search = $("#search-criteria");
      let items = $(".accounts");

      $("#search-criteria").on("keyup", function (e) {
        let v = search.val().toLowerCase();
        if (v == "") {
          items.show();
          return;
        }
        $.each(items, function () {

          let it = $(this);
          let lb = it.find(".url").text().toLowerCase();
          if (lb.indexOf(v) == -1) {
            it.hide();
          } else {
            it.show();
          }
        });
      });
  hideCategory();

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

  // function darkTheme() {
  //   if(localStorage.getItem('theme')){
  //     $(this).toggleClass('checked')
  //     $(this).toggleClass('focus')
  //     toggleHandle();
  //     localStorage.removeItem('theme')
  //   }
  // };

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
    submitHandler: function (form) {
      form.ajaxSubmit();
    }
  });
})








