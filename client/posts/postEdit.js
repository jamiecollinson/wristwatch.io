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

Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var postId = FlowRouter.getParam('id');
    var newProperties = {
      'url': $(e.target).find('#url').val(),
      'title': $(e.target).find('#title').val()
    };
    Posts.update(postId, {$set: newProperties}, function(error) {
      if (error) {
        Materialize.toast(error, 2000);
      } else {
        FlowRouter.go('postPage', { id: postId });
      }
    });
  },
  'click #delete': function(e) {
    e.preventDefault();

    var postId = FlowRouter.getParam('id');
    Posts.remove(postId, function(error) {
      if (!error) {
        FlowRouter.go('/');
      }
    });
  }
});
