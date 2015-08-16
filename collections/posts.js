Posts = new Mongo.Collection('posts');

Meteor.methods({
  'insertPost': function(doc) {
    check(Meteor.userId(), String);
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
      summary: 'Summary not fetched yet...'
    });
    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  }
});
