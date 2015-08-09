var router = FlowRouter,
    layout = BlazeLayout;

router.route('/', {
  action: function() {
    layout.render('mainLayout', { main: 'postsList' });
  }
});

router.route('/posts/:id', {
  action: function(params) {
    layout.render('mainLayout', { main: 'postPage' });
  }
});
