$(function(){
  
  var search_list = $("#user-search-result");

  function appendUserToSearchList(user) {
    var html = 
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${ user.name }</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name=${ user.name }>追加</a>
      </div>`
    search_list.append(html);
    return html;
  }

  function appendNoUserToSearchList(user) {
    var html = 
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${ user }</p>
      </div>`
    search_list.append(html);
    return
  }

  function appendUserNameAdd(name, user_id) {
    var html = 
    `<div class='chat-group-user clearfix js-chat-member' id=${user_id}>
      <input name='group[user_ids][]' type='hidden' value=${ user_id }>
      <p class='chat-group-user__name'>${ name }</p>
      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
    </div>`
    $("#chat-group-users").append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    if (input.length === 0) {
      $("#user-search-result").empty();
    return
    }
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })

    .done(function(data) {
      $("#user-search-result").empty();
        if (data.length !== 0) {
          data.forEach(function(user){
          appendUserToSearchList(user);
          });
        }
        else {
          appendNoUserToSearchList("一致するユーザーはいません");
        }
      })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $(document).on("click", ".user-search-add", function () {
    var user_name = $(this).data("user-name");
    var user_id = $(this).data("user-id");
    appendUserNameAdd(user_name, user_id);
    $(this).parent().remove();
  });
  $(document).on("click", '.user-search-remove', function () {
    $(this).parent().remove();
  });

});