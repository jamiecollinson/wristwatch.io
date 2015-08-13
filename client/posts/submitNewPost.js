Template.submitNewPost.onCreated(function() {
  // Redirect if not logged in
  this.autorun(function() {
    if (!Meteor.userId()) {
      FlowRouter.go('/');
    }
  });
});
