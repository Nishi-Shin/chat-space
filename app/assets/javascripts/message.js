$(function(){
  function buildHTML(message){
    var image = (message.image) ? `<img class = "lower-message__image" src="${message.image}">`: "";
    var html = `<div class = "right-main-contents-upper" data-id="${message.id}">
                  <div class = "right-main-contents-upper__name">
                    ${message.user_name}
                  </div>
                  <div class = "right-main-contents-upper__data">
                    ${message.created_at}
                  </div>
                  <div class = "right-main-contents-upper__message">
                    <p class = "right-main-contents-upper__message__content">
                      ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.right-main-contents').append(html);
      $('.right-main-contents').animate({scrollTop:$('.right-main-contents')[0].scrollHeight});
      $('input').prop('disabled', false);
      $("#new_message")[0].reset();
    })
    .fail(function(){
      alert('error');
    })
  });
  var reloadMessages = function() {
    last_message_id = $('.right-main-contents-upper:last').data('id')
    if (window.location.href.match (/\/groups\/\d+\/messages/)) {
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message) {
      insertHTML = buildHTML(message);
      $('.right-main-contents').append(insertHTML);
      $('.right-main-contents').animate({scrollTop:$('.right-main-contents')[0].scrollHeight});
      })
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    })
   }
  };
  $(function() {
    setInterval(reloadMessages, 5000);
  });
});
