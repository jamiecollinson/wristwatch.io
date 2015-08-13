var router = FlowRouter,
    layout = BlazeLayout;

function requireLogin(context, redirect) {
  if (!Meteor.userId()) {
    redirect('/');
  }
};

router.triggers.enter([requireLogin], { only: ['submitNewPost'] });

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

router.route('/submit', {
  name: 'submitNewPost',
  action: function() {
    layout.render('mainLayout', { main: 'submitNewPost' });
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
