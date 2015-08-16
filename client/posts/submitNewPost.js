Template.submitNewPost.onCreated(function() {
  // Redirect if not logged in
  this.autorun(function() {
    if (!Meteor.userId()) {
      FlowRouter.go('/');
    }
  });
});

Template.submitNewPost.events({
  'submit form': function (e) {
    e.preventDefault();
    var post = {
      'url': $(e.target).find('#url').val(),
      'title': $(e.target).find('#title').val()
    };
    Meteor.call('insertPost', post, function(error, result) {
      if (error) {
        Materialize.toast(error, 2000);
      }
      if (result.duplicate) {
        Materialize.toast('Link has already been posted', 2000);
      }
      FlowRouter.go('postPage', { id: result._id });
    })
  }
});
