Template.postPage.onCreated(function() {
  this.subscribe('posts');
});

Template.postPage.helpers({
  post: function() {
    var id = FlowRouter.getParam('id');
    return Posts.findOne({ _id: id });
  }
})
