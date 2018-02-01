//Registers with server new name, email, password
$('#registerbtn').on('click', function(event) {
  $.ajax({
    url:'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    method: 'POST',
    data: {
      fname: $('#inputFName').val(),
      lname: $('#inputLName').val(),
      email: $('#inputEmail').val(),
      password: $('#inputPassword').val(),
    },
    success: function() {
      $('#register_form').toggleClass('collapse')
      $('#login_form').toggleClass('collapse')
      $('#register_btn').toggleClass('collapse')
      $('#login_btn').toggleClass('collapse')
    },
    error: function(resp) {
      // console.log(resp)
      alert(resp.responseJSON.error);
    }
  })
  event.preventDefault();
})
//Collapses Registration form when clicked
$('#login').on('click', function() {
  $('#register_form').toggleClass('collapse')
  $('#register_btn').toggleClass('collapse')
  $('#login_btn').toggleClass('collapse')
  $('#login_form').toggleClass('collapse')
})

$('#register').on('click', function() {
  $('#register_form').toggleClass('collapse')
  $('#register_btn').toggleClass('collapse')
  $('#login_btn').toggleClass('collapse')
  $('#login_form').toggleClass('collapse')
})
$('#loginreg').on('click', function() {
  $.ajax({
    url:'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
    method: 'POST',
    data: {
      email: $('#loginEmail').val(),
      password: $('#loginPassword').val(),
    },
    success: function(data) {
      $('#login_form').toggleClass('collapse');
      $('#Entrypage').toggleClass('collapse');
      $('#Home').toggleClass('collapse');
      getPosts()
      update()
      localStorage.setItem('token', data.response.token);
      // getComments()
      // getPosts()
    },
    error: function(resp) {
      alert(resp.responseText.error);
    }
  })
  return false;
})

function update() {
  var intervalID = setInterval(getPosts, 30000);
}

$('.NewsFeed').on('click','#postContent',function() {
  $.ajax({
    url:'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: 'POST',
    data: {
      token: localStorage.getItem('token'),
      content: $('#postPost').val(),
    },
    success: function(data) {
      getPosts()
      // getPosts()
    },
    error: function(resp) {
      alert(resp.responseJSON.error);
    }
  })
  return false;
})

function getPosts() {
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/1',
    method: 'GET',
    data: {
      token: localStorage.getItem('token'),
    },
    success: function(data) {
      createPosts(data);
    }
  })
}
function createPosts(data) {
  // console.log(data)
  $('.post-container').empty();
  var numPosts = data.response;
  numPosts.forEach(function(post) {
    $('.post-container').append(`<div class="post" id = "${post._id}">
      <div class="post-header">
        <h5>${post.poster.name}</h5>
        <p><i>${post.createdAt}</i></p>
      </div>
      <div class="post-body">
        <h3>${post.content}</h3>
      </div>
      <div class="post-footer">
        <div class="otherComments">
        </div>
        <div class="numContainer">
          <div class="numlike">
            <p>${post.likes.length} likes</p>
          </div>
          <div class="numcomment">
            <p>${post.comments.length} comments</p>
          </div>
        </div>
        <div class="btnContainer">
          <div class="likeBtn">
            <button type="button" name="likeBtn">Like</button>
          </div>
          <div class="commentBtn">
            <button type="button" name="commentBtn">Comment</button>
          </div>
        </div>
        <div class="commentbox collapse">
          <div class="commentInput">
            <input class ='commentInputstyle' type="text" name="" value="" placeholder="Comment">
            <input class='submitPost' type="submit" name="commentPost" value="Post">
          </div>
        </div>
      </div>
    </div>`);
    $.ajax({
      url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${post._id}`,
      method: 'GET',
      data: {
        token: localStorage.getItem('token'),
      },
      success: function(data){
        var x = data.response
        // console.log(x)
        x.forEach(function(obj) {
          $(`#${post._id}`).find('.otherComments').append(`<div class="comment" id = "${obj.poster.id}">
            <div class="commentHeader">
              <h4>${obj.poster.name}</h4>
              <p>${obj.createdAt}</p>
            </div>
            <div class="commentBody">
              <h5>${obj.content}</h5>
            </div>
          </div>`)
        })
      }
    })
    //This will be where likes can be started. A modal can come up to display who liked what
    // $.ajax({
    //   url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/${post._id}`,
    //   method: 'GET',
    //   data: {
    //     token: localStorage.getItem('token'),
    //   },
    //   success: function(data) {
    //
    //   }
    // })
  })
}
$('.post-container').on('click','.commentBtn', function() {
    // console.log('here')
    // console.log($(this).parent().parent().find('.commentInputstyle'))
    $(this).parent().parent().find('.commentbox').toggleClass('collapse')
})
$('.post-container').on('click','.submitPost', function() {
    // console.log('here')
    // console.log($(this).parent().parent().find('.commentInputstyle'))
    var comment = $(this).parent().find('.commentInputstyle').val();
    if(comment.length > 1) {
      var postId = $(this).closest('.post').attr('id');
      $.ajax({
        url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${postId}`,
        method:'POST',
        data: {
          token: localStorage.getItem('token'),
          content:comment
        },
        success: function() {
          getPosts()
        },
        error: function(err) {
          alert(err)
        }
      })
    }
})
$('#logout').on('click',function(){
  $.ajax({
    url:'https://horizons-facebook.herokuapp.com/api/1.0/users/logout',
    data:{
      token: localStorage.getItem('token')
    },
    success: function() {
      $('#Home').toggleClass('collapse');
      $('#login_form').toggleClass('collapse');
      $('#Entrypage').toggleClass('collapse');
    }
  })
})
