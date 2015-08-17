Embedly = {
  extract: function(url, callback) {
    // Only run on server
    if (Meteor.isClient)
      return callback(null, 'Not run on client');

    // Check env variable is set
    var embedlyApiKey = process.env.EMBEDLYAPIKEY;
    if (typeof(embedlyApiKey) == 'undefined')
      return callback('No API key set');

    check(embedlyApiKey, String);

    // Make API call
    var embedlyURL = "http://api.embed.ly/1/extract?key=" + embedlyApiKey + "&url=" + encodeURIComponent(url);
    HTTP.get(embedlyURL, function(error, result) {
      // If result found then strip headers
      if (!error)
        result = result.data;
      callback(error, result);
    });
  }
};
