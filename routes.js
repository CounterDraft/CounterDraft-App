module.exports = {
	setup: function(app) {
		// Register account
		app.post('/register', function(req, res) {
			getController('AccountController').register(req, res);
		});
		
		// Login account
		app.post('/login', function(req, res) {
			getController('AccountController').login(req, res);
		});
		
		// Verify account
		app.post('/verify', function(req, res) {
			getController('AccountController').verify(req, res);
		});
		
		// Reset password
		app.post('/reset', function(req, res) {
			getController('AccountController').reset(req, res);
		});
	}
};