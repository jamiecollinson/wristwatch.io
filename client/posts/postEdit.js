Template.postEdit.onCreated(function() {
  this.subscribe('posts');
  // Redirect if not logged in
  this.autorun(function() {
    if (!Meteor.userId()) {
      FlowRouter.go('/');
    }
  });
});

Template.postEdit.helpers({
  post: function() {
    var id = FlowRouter.getParam('id');
    return Posts.findOne({ _id: id });
  }
});
