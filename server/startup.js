Meteor.startup(function() {
  // Make embedly call for any posts not already done
  var postsToFetch = Posts.find({ metadataFetched: false });
  postsToFetch.forEach(function(post) {
    Embedly.extract(post.url, function(error, result) {
      if (!error)
        Posts.update({ _id: post._id }, { $set: {
          summary: result.description,
          metadataFetched: true
        }});
    });
  });
});
