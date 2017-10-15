$(document).ready(function() {


  function renderPhoto(photo, element, width){
    //<img id="profile-picture" src="/img/defaultprofilepic.png" class="img-responsive" style="width:500px">
    var $profileImg = $('<img></img>', {
      'src': 'http://localhost:2403//imagesupload/images/'+ photo,
      'class': 'img-responsive',
      'style': 'width:'+width
    });
    this.$element = $(element);
    this.$element.append($profileImg);
  }

  function renderBlogPost(item, element, userpic) {
    var $mediaDiv = $('<div></div>', {
      'class': 'media'
    });
    var $mediaLeftDiv = $('<div></div>', {
      'class': 'media-left'
    });
    var $profileImg = $('<img></img>', {
      'src': 'http://localhost:2403//imagesupload/images/' + userpic,
      'class': 'media-object',
      'style': 'width:45px'
    });
    var $mediaBodyDiv = $('<div></div>', {
      'class': 'media-body'
    });
    var $profileNameHeading = $('<h4></h4>', {
      'class': 'media-heading'
    });
    var profileName = item['username'] + ' ';
    var $timeStampSmallHeading = $('<small></small>');
    var $timeStampItalic = $('<i></i>');
    var timeStampText = (new Date(item['Timestamp'])).toLocaleString();
    var $blogPostTextP = $('<p></p>');
    var blogPostText = item['Blogpost'];
    var $blogPostImg = $('<img></img>', {
      'src': 'http://localhost:2403//imagesupload/' + item['blogimg'],
      'class':'img-responsive',
      'style': 'width:500px'
    });


    $timeStampItalic.append(timeStampText);
    $timeStampSmallHeading.append($timeStampItalic);
    $profileNameHeading.append(profileName);
    $profileNameHeading.append($timeStampSmallHeading);
    $mediaBodyDiv.append($profileNameHeading);
    $blogPostTextP.append(blogPostText);
    $mediaBodyDiv.append($blogPostTextP);
    $mediaBodyDiv.append($blogPostImg);
    $mediaLeftDiv.append($profileImg);
    $mediaDiv.append($mediaLeftDiv);
    $mediaDiv.append($mediaBodyDiv);

    this.$element = $(element);
    this.$element.append($mediaDiv);
  }

  function getUserPhotos(user){
    dpd.blog.get(
      {
        username:user.username,
        blogimg:{$ne: ''}
      }).then(function (results){
        results.forEach(function(post){
          renderPhoto(post.blogimg, '#user-photos', '400px');
        });
      });
  }

  function getProfilePic(user){
    console.log(user.profilepic);
    renderPhoto(user.profilepic, '#profile-image-column', '500px');
  }

  var write = function()  {
}

  function getAllBlogPosts() {
    // get all blogposts in descending order
    dpd.blog.get({
      $sort: {
        Timestamp: -1
      }
    }).then(function(results) {
      results.forEach(function(item) {
        dpd.users.get({ username:item.username}).then(function(user){
          renderBlogPost(item,  '#all-blogposts', user[0]['profilepic']);
        },function(err) {
          if (err) {
            alert(err.message || (err.errors && err.errors.title));
            return;
          }
        });
      });
    }, function(err) {
      if (err) {
        alert(err.message || (err.errors && err.errors.title));
        return;
      }
    });

  }

  function getAllUserBlogPost(user) {
    // get all blogposts in descending order
    dpd.blog.get({
      username: user.username,
      $sort: {
        Timestamp: -1
      }
    }).then(function(results) {
      results.forEach(function(item) {
        renderBlogPost(item, '#user-blogposts', user.profilepic)
      });
    }, function(err) {
      if (err) {
        alert(err.message || (err.errors && err.errors.title));
        return;
      }
    });
  }

  getAllBlogPosts();

  dpd.users.me(function(me) {
    getAllUserBlogPost(me);
    getProfilePic(me);
    getUserPhotos(me);
  });
});
