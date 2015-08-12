Template.postPage.onCreated(function() {
  this.subscribe('posts');
  // redirect if no post found
  this.autorun(function(){
    if (Template.instance().subscriptionsReady()) {
      var id = FlowRouter.getParam('id'),
          post = Posts.findOne({ _id: id });
      if (!post) {
        FlowRouter.go('/');
      }
    }
  });
});

Template.postPage.helpers({
  post: function() {
    var id = FlowRouter.getParam('id');
    return Posts.findOne({ _id: id });
  }
})
