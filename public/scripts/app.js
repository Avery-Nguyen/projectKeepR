$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;

  // <section id="category" <!-- display website info -->
  //       <h2>Catagories</h2>
  //       <article class="row-beside" id="accountContainer">
  //         <div class="row-beside">
  //           <h4>image</h4>
  //           <div>
  //             <h3>Website</h3>
  //             <h3>Username</h3> <!-- stretch to change username-->
  //           </div>
  //        </div>
  //        <form class="row-beside">
  //          <h3 id='editPassword'>Password</h3> <!-- toggle or on hover (or the eye thing)-->
  //          <button id='copy'>Copy</button>
  //        </form>
  //         <form>
  //           <button id='edit'>Edit</button>
  //           <button id='delete'>Delete</button>
  //         </form>
  //       </article>
  //     </section>

  // const createAccountElement = (accountData) => {
  //      const $account = $(`
  //      <section class="account" style="margin: 5vh 0; border: 2px solid black">
  //      <div class="row-beside">

  //        <h4>image</h4>
  //        <div>
  //          <h3>${accountData.url}</h3>
  //          <h3>${accountData.username}</h3> <!-- stretch to change username-->
  //        </div>
  //     </div>
  //     <form class="row-beside">
  //       <h3 id='editPassword'>${accountData.password}</h3> <!-- toggle or on hover (or the eye thing)-->
  //       <button id='copy'>Copy</button>
  //     </form>
  //      <form>
  //        <button id='edit'>Edit</button>
  //        <button id='delete'>Delete</button>
  //      </form>
  //    </section>
  //         `)

  //   return $account;
  // }

  const renderAccounts = (accounts) => {
    for (const account in accounts) {
      console.log(accounts[account])
      for (const acc in  account) {
        const $account = createAccountElement(accounts[account][acc])
      $('#accountContainer').prepend($account)
      }

    }
  }

  const loadAccounts = () => {
    $.getJSON('/websites')
      .then(function (data) {
        $('#account').empty();
        renderAccounts(data);
      })
  }

  loadAccounts();


});
