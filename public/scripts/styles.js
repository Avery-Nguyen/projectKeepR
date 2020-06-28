$( document ).ready(function() {

  $('#addBtn').click(function() {
    $('.new-website-form').toggle('slow');
    // $('#tweet-text').focus();
  });

  $('#filter-symbol').click(function() {
    $('aside').toggle('slow');
  });

  $(".arrange-website").hover(function() {
    $(this).find(".hover-website").show();
  },
  function() {
    $(this).find(".hover-website").hide();
  });

});
