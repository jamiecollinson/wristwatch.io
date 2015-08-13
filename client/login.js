Template.login.onCreated(function() {
  // Redirect to home on login
  this.autorun(function() {
    if (Meteor.userId()) {
      FlowRouter.go('/');
    }
  });
});
