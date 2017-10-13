$(document).ready(function() {

  function renderBlogPost(item, element) {
    var $mediaDiv = $('<div></div>', {
      'class': 'media'
    });
    var $mediaLeftDiv = $('<div></div>', {
      'class': 'media-left'
    });
    var $profileImg = $('<img></img>', {
      //temporary placeholder TODO:get user profile img
      'src': '/img/MeLogo.png',
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
      'src': '/img/' + item['Imagename'],
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

  function getAllBlogPosts() {
    console.log('before get');
    // get all blogposts in descending order
    dpd.blog.get({
      $sort: {
        Timestamp: -1
      }
    }).then(function(results) {
      results.forEach(function(item) {
        renderBlogPost(item, '#all-blogposts')

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
      username: user,
      $sort: {
        Timestamp: -1
      }
    }).then(function(results) {
      results.forEach(function(item) {
        renderBlogPost(item, '#user-blogposts')
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
    getAllUserBlogPost('user');
  });
});
