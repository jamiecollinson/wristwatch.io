Template.postItem.helpers({
  ownPost: function() {
    return this.userId == Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  imageUrl: function() {
    if (this.embedlyData.images)
      return this.embedlyData.images[0].url;
    return null;
  }
});
