$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;

  const createAccountElement = (accountData) => {
       const $account = $(`
       <article class="account">
          <h3>${accountData.websites}</h3> <!-- stretch to change username-->
          <h3 >Website</h3>

          <form method="POST" action="/websites/26/delete">
            <h3 id='editPassword'>Password</h3> <!-- toggle or on hover (or the eye thing)-->
            <button id='copy'>Copy</button>
            <button id='edit'>Edit</button>
            <button id='delete'>Delete</button>
          </form>
          `)

    return $account;
  }

  const renderAccounts = (accounts) => {
    for (const account in accounts) {
      const $account = createAccountElement(account)
      $('#accountContainer').prepend($account)
    }
  }

  const loadAccounts = () => {
    $.getJSON('/websites')
      .then(function (data) {
        console.log(data)
        $('#account').empty();
        renderAccounts(data);
      })
  }

  loadAccounts();


});
