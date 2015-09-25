function AccountModel() {
	this.register = function(input) {
		return new Promise(function(resolve, reject) {
			var conn = GLOBAL.getDBConnection();
			conn.query('CALL registerAccount(?,?,?,?,?,?,?,?,@code,@message); SELECT @code, @message;',
				[input.email, input.password, input.firstName, input.lastName, input.gender, input.birthdate, input.salt, input.verificationCode],
				function(err, rows, fields) {
					conn.end();
					if(err) {
						reject({code: 2, message: 'Internal error: ' + err });
					}
					else {
						rows = rows[1][0];
						var data = {
							code: rows['@code'],
							message: rows['@message']
						};

						if(data.code == 1) {
							resolve(data);
						}
						else {
							reject(data);
						}
					}
				}
			);
		});
	};
};

module.extends = AccountModel;