Template.postsList.onCreated(function() {
  this.subscribe('posts');
});

Template.postsList.helpers({
  counter: function() {
    return Posts.find({}).count();
  },
  posts: function() {
    return Posts.find({}, { sort: { submitted: -1 }});
  }
});
