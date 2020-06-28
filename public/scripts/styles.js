$( document ).ready(function() {

  $('#addBtn').click(function() {
    $('.new-website-form').toggle('slow');
    // $('#tweet-text').focus();
  });

  $('#filter-symbol').click(function() {
    $('aside').toggle('slow');
  });

  const hover = () => {
    $(".arrange-website").hover(function() {
      $(this).find(".hover-website").show();
    },
    function() {
      $(this).find(".hover-website").hide();
    });
  }

  hover();

  $('#show-password').click(function(){
    const x = document.getElementById("addPassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
  });

  $('#show-password2').click(function(){
    const x = document.getElementById("editPassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
  });


});
