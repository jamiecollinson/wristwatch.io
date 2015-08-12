var router = FlowRouter,
    layout = BlazeLayout;

router.route('/', {
  action: function() {
    layout.render('mainLayout', { main: 'postsList' });
  }
});

router.route('/login', {
  action: function() {
    layout.render('mainLayout', { main: 'login' });
  }
});

router.route('/logout', {
  action: function() {
    Meteor.logout(function() {
      router.go('/login');
    });
  }
});

router.route('/posts/:id', {
  action: function(params) {
    layout.render('mainLayout', { main: 'postPage' });
  }
});

router.notFound = {
  action: function() {
    router.go('/');
  }
};
