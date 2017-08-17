var parseMediumJSON = function() {
  $.getJSON('https://8k431k2y7h.execute-api.us-west-2.amazonaws.com/Production/medium', function(data) {
    var author_list = data.body.payload.references.User;
    var all_posts = data.body.payload.posts;
    var posts_to_output = $.map(all_posts, function(post, index){
      var author = author_list[post.creatorId];
      var cleaned_post = {

        post_title:       post.title,

                          // get full URL, prepend Medium collection
        post_url:         "https://medium.com/civiqueso/" + post.uniqueSlug,

                          // get full Image URL, append Medium CDN
        post_image_url:   "https://cdn-images-1.medium.com/max/1000/" + post.virtuals.previewImage.imageId,

                          // get author name by ID, from user_list
        post_author_name: author.name,

                          // get author pic by ID
        post_author_pic:  "https://cdn-images-1.medium.com/fit/c/60/60/" + author.imageId,

                          // convert date to human-readable string
        post_date:        new Date(post.latestPublishedAt).format('F j, Y')

      };
      return cleaned_post;
    });
    console.log(posts_to_output);

  });
}

var initMobileMenus = function() {

  var html = $("html");

  var menuButton = $("#drawer-button--menu");
  menuButton.click(function () {
    html.toggleClass("drawer-open--menu");
  });

  var translateButton = $("#drawer-button--translate");
  translateButton.click(function () {
    html.toggleClass("drawer-open--translate");
    if (html.hasClass("drawer-open--translate")) {
      $(window).scrollTop(0);
    }
  });

  var searchButton = $("#drawer-button--search");
  searchButton.click(function () {
    html.toggleClass("drawer-open--search");
  });
  var cancelSearchButton = $("#cancel-button--search");
  cancelSearchButton.click(function () {
    html.toggleClass("drawer-open--search");
  });

}

var initLinkAttributes = function() {

  $("a").each(function() {
    var is_relative = new RegExp("//" + window.location.host + "/");
    var is_file = new RegExp(".pdf");
    var is_tel = new RegExp("tel:+")
    if (!is_relative.test(this.href)) {
      $(this).attr("target","_blank");
      $(this).addClass("link--external");
    }
    if (is_file.test(this.href)) {
      $(this).attr("target","_blank");
      $(this).addClass("link--file");
    }
    if (is_tel.test(this.href)) {
      $(this).attr("target","_blank");
      $(this).addClass("link--phone");
    }

  });
}


$(document).ready(function(){
  initMobileMenus();
  initLinkAttributes();
  parseMediumJSON();
});
