Posts = new Mongo.Collection('posts');

Posts.allow({
  update: ownsDoc,
  remove: ownsDoc
});

Meteor.methods({
  'insertPost': function(doc) {
    if (!Meteor.user()) {
      throw new Meteor.Error(401, "You must be logged in to post");
    }
    check(doc, {
      url: String,
      title: String
    });

    var duplicatePost = Posts.findOne({ url: doc.url });
    if (duplicatePost) {
      return {
        duplicate: true,
        _id: duplicatePost._id
      };
    }

    var user = Meteor.user();
    var post = _.extend(doc, {
      userId: user._id,
      submitted: new Date(),
      summary: 'Summary pending...',
      metadataFetched: false
    });
    var postId = Posts.insert(post);

    // Async data lookup via embedly
    Embedly.extract(post.url, function(error, result) {
      if (!error)
        Posts.update({ _id: postId }, { $set: {
          summary: result.description,
          embedlyData: result,
          metadataFetched: true
        }});
    });

    return {
      _id: postId
    };
  }
});
