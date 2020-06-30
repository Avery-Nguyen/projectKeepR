$( document ).ready(function() {

  $('#addBtn').click(function() {
    $('.new-website-form').toggle('slow');
    $('#addWebsite').focus();
  });

  $('#cancel').click(function(event) {
    event.preventDefault(event);
    $('.new-website-form').toggle('slow');
  });

  $('#filter-symbol').click(function() {
    $('aside').toggle('slow');
  });


  $('#show-password').click(function(){
    const x = document.getElementById("addPassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
  });

  const $social = $('#socialSection');
  const $stitle = $('#socialTitle');
  const $work = $('#workSection');
  const $wTitle = $('#workTitle');
  const $entertainment = $('#entertainmentSection');
  const $eTitle = $('#entertainmentTitle');
  const $others = $('#otherSection');
  const $oTitle = $('#otherTitle');

  $('#allFilter').click(function() {
    $social.show();
    $work.show();
    $entertainment.show();
    $others.show();
    $stitle.show();
    $wTitle.show();
    $eTitle.show();
    $oTitle.show();
  });

  $('#socialFilter').click(function() {
    $social.show();
    $stitle.show();

    $work.hide();
    $wTitle.hide();

    $entertainment.hide();
    $eTitle.hide();

    $others.hide();
    $oTitle.hide();
  });

  $('#entertainmentFilter').click(function() {
   $social.hide();
    $stitle.hide();

    $work.hide();
    $wTitle.hide();

    $entertainment.show();
    $eTitle.show();

    $others.hide();
    $oTitle.hide();
  });

  $('#workFilter').click(function() {
    $social.hide();
    $stitle.hide();

    $work.show();
    $wTitle.show();

    $entertainment.hide();
    $eTitle.hide();

    $others.hide();
    $oTitle.hide();
  });

  $('#othersFilter').click(function() {
    $social.hide();
    $stitle.hide();

    $work.hide();
    $wTitle.hide();

    $entertainment.hide();
    $eTitle.hide();

    $others.show();
    $oTitle.show();
  });

  function toggleHandle() {
    $('body').toggleClass('dark-theme');
    $('header').toggleClass('dark-theme');
    $('.account').toggleClass('dark-theme');
    $('.website-info').toggleClass('dark-theme');
    $('.new-website').toggleClass('dark-theme');
    $('aside').toggleClass('dark-theme');
  }


  $('.slider').click(function() {
    $(this).toggleClass('checked')
    $(this).toggleClass('focus')
    toggleHandle();
    // localStorage.setItem('theme', 'true');
  });

  $('#long-name').mouseenter(function(){
    $(this).text('S.H.I.E.L.D')
  });
  $('#long-name').mouseleave(function(){
    $(this).text('Super Helpful Implementation of Enigmas Layout Device')
  });

});


