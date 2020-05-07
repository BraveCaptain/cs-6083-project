const database = require('../config/databaseConfig');
const common = require('./util/common');
const xss = require('xss');

exports.adminGetUserInfo = adminGetUserInfo;
exports.adminGetPolicyInfo = adminGetPolicyInfo;
exports.adminCreatePolicy = adminCreatePolicy;
exports.adminGetHomeInfo = adminGetHomeInfo;
exports.adminGetAutoInfo = adminGetAutoInfo;
exports.adminGetHomeInvoiceInfo = adminGetHomeInvoiceInfo;
exports.adminGetAutoInvoiceInfo = adminGetAutoInvoiceInfo;
exports.adminGetHomePayInfo = adminGetHomePayInfo;
exports.adminGetAutoPayInfo = adminGetAutoPayInfo;
exports.adminGetDriverInfo = adminGetDriverInfo;
exports.adminDeleteUser = adminDeleteUser;
exports.adminDeletePolicy = adminDeletePolicy;
exports.adminDeleteHome = adminDeleteHome;
exports.adminDeleteAuto =adminDeleteAuto;
function adminDeleteAuto(req,res,next){
	const vin = xss(req.body.vin);
	console.log('auto is: ', vin);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = "select autoname from auto where vin = ?";
		connection.query(sql, [vin], function (err, result) {
			if (err) {
				console.log('[DELETE ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			} else{
				var autoname = result[0].autoname;
				console.log('auto is: ', autoname);
				sql = 'delete from auto where autoname = ?';
				connection.query(sql, autoname, function (err, result) {
					if (err) {
						console.log('[DELETE ERROR] - ', err.message);
						res.send('SQL query error');
						return;
					} else{
						sql = 'delete from apayment where apid = (select apid from auto_policy where autoname = ?)';
						connection.query(sql, autoname, function (err, result) {
							if (err) {
								console.log('[DELETE ERROR] - ', err.message);
								res.send('SQL query error');
								return;
							} else{
								sql = 'delete from auto_policy where autoname = ?';
								connection.query(sql, autoname, function (err, result) {
									if (err) {
										console.log('[DELETE ERROR] - ', err.message);
										res.send('SQL query error');
										return;
									} else{
										sql = 'delete from driver where autoname = ?';
										connection.query(sql, autoname, function (err, result) {
											if (err) {
												console.log('[DELETE ERROR] - ', err.message);
												res.send('SQL query error');
												return;
											} else{
												sql = 'select vin, autoname, modeldate, status, userid from auto';
												connection.query(sql, function (err, result) {
													if (err) {
														console.log('[SELECT ERROR] - ', err.message);
														res.send('SQL query error');
														return;
													}
													adminAutoInfo = result;
													common.correctAutoInfo(adminAutoInfo);
													//console.log(userInfo);
													res.render('admin/adminAutoDisplay', {
														adminAutoInfo: adminAutoInfo
													});
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
}


function adminDeleteHome(req,res,next){
	const homeid = xss(req.body.homeid);
	console.log('home is: ', homeid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = "select homename from home where homeid = ?";
		connection.query(sql, [homeid], function (err, result) {
			if (err) {
				console.log('[DELETE ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			} else{
				var homename = result[0].homename;
				console.log('home is: ', homename);
				sql = 'delete from home where homename = ?';
				connection.query(sql, homename, function (err, result) {
					if (err) {
						console.log('[DELETE ERROR] - ', err.message);
						res.send('SQL query error');
						return;
					} else {
						sql = 'delete from hpayment where hpid = (select hpid from home_policy where homename = ?)';
						connection.query(sql, homename, function (err, result) {
							if (err) {
								console.log('[DELETE ERROR] - ', err.message);
								res.send('SQL query error');
								return;
							} else{
								sql = 'delete from home_policy where homename = ?';
								connection.query(sql, homename, function (err, result) {
									if (err) {
										console.log('[DELETE ERROR] - ', err.message);
										res.send('SQL query error');
										return;
									} else{
										sql = 'select homeid, homename, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, swimmingpool, basement, userid from home';
										connection.query(sql, function (err, result) {
											if (err) {
												console.log('[SELECT ERROR] - ', err.message);
												res.send('SQL query error');
												return;
											}
											adminHomeInfo = result;
											common.correctHomeInfo(adminHomeInfo);
											//console.log(userInfo);
											res.render('admin/adminHomeDisplay', {
												adminHomeInfo: adminHomeInfo
											});
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
}

function adminDeletePolicy(req,res,next){
	const policyid = xss(req.body.policyid);
	console.log('policy is: ', policyid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = "select policyname from policy where policyid = ?";
		connection.query(sql, [policyid], function (err, result) {
			if (err) {
				console.log('[DELETE ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			} else{
				var policyname = result[0].policyname;
				console.log('policy is: ', policyname);
				sql = 'delete from policy where policyname = ?';
				connection.query(sql, policyname, function (err, result) {
					if (err) {
						console.log('[DELETE ERROR] - ', err.message);
						res.send('SQL query error');
						return;
					} else {
						sql = 'delete from hpayment where hpid = (select hpid from home_policy where policyname = ?)';
						connection.query(sql, policyname, function (err, result) {
							if (err) {
								console.log('[DELETE ERROR] - ', err.message);
								res.send('SQL query error');
								return;
							} else{
								sql = 'delete from home_policy where policyname = ?';
								connection.query(sql, policyname, function (err, result) {
									if (err) {
										console.log('[DELETE ERROR] - ', err.message);
										res.send('SQL query error');
										return;
									} else{
										sql = 'delete from apayment where apid = (select apid from auto_policy where policyname = ?)';
										connection.query(sql, policyname, function (err, result) {
											if (err) {
												console.log('[DELETE ERROR] - ', err.message);
												res.send('SQL query error');
												return;
											} else{
												sql = 'delete from auto_policy where policyname = ?';
												connection.query(sql, policyname, function (err, result) {
													if (err) {
														console.log('[DELETE ERROR] - ', err.message);
														res.send('SQL query error');
														return;
													} else{
														sql = 'select policyid, type, policyname, amount from policy';
														connection.query(sql, function(err, result) {
															if (err) {
																console.log('[SELECT ERROR] - ', err.message);
																res.send('SQL query error');
																return;
															}
															else{
																adminPolicyInfo = result;
																common.correctUserInfo(adminPolicyInfo);
																//console.log(userInfo);
																res.render('admin/adminPolicyDisplay', {
																	adminPolicyInfo: adminPolicyInfo
																});
															}
														});
													}
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});

	});
}

function adminDeleteUser(req, res, next) {
	const userid = xss(req.body.userid);
	console.log('userid is: ', userid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		//var sql = 'delete a,b,c,d,e,f,g,h from auto a, auto_policy b, apayment c, driver d, home e, home_policy f, hpayment g, user h where h.userid = a.userid and h.userid = b.userid and h.userid = c.userid and h.userid = d.userid and h.userid = e.userid and h.userid = f.userid and h.userid = g.userid and h.userid = ?';
		var sql = 'delete from auto where userid = ?';
		connection.query(sql, userid, function (err, result) {
			if (err) {
				console.log('[DELETE ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			} else {
				sql = 'delete from auto_policy where userid = ?';
				connection.query(sql, userid, function (err, result) {
					if (err) {
						console.log('[SELECT ERROR] - ', err.message);
						res.send('SQL query error');
						return;
					} else {
						sql = 'delete from apayment where userid = ?';
						connection.query(sql, userid, function(err, result) {
							if (err) {
								console.log('[SELECT ERROR] - ', err.message);
								res.send('SQL query error');
								return;
							}
							else {
								sql = 'delete from driver where userid = ?';
								connection.query(sql, userid, function(err, result) {
									if (err) {
										console.log('[SELECT ERROR] - ', err.message);
										res.send('SQL query error');
										return;
									}
									else {
										sql = 'delete from driver_auto where userid = ?';
										connection.query(sql, userid, function(err, result) {
											if (err) {
												console.log('[SELECT ERROR] - ', err.message);
												res.send('SQL query error');
												return;
											}
											else {
												sql = 'delete from home where userid = ?';
												connection.query(sql, userid, function(err, result) {
													if (err) {
														console.log('[SELECT ERROR] - ', err.message);
														res.send('SQL query error');
														return;
													}
													else {
														sql = 'delete from home_policy where userid = ?';
														connection.query(sql, userid, function(err, result) {
															if (err) {
																console.log('[SELECT ERROR] - ', err.message);
																res.send('SQL query error');
																return;
															}
															else {
																sql = 'delete from hpayment where userid = ?';
																connection.query(sql, userid, function(err, result) {
																	if (err) {
																		console.log('[SELECT ERROR] - ', err.message);
																		res.send('SQL query error');
																		return;
																	}
																	else {
																		sql = 'delete from user where userid = ?';
																		connection.query(sql, userid, function(err, result) {
																			if (err) {
																				console.log('[SELECT ERROR] - ', err.message);
																				res.send('SQL query error');
																				return;
																			}
																			else {
																				sql = 'select userid, fname, lname, state, city, street, zipcode, gender, maritalstatus from user';
																				connection.query(sql, function(err, result) {
																					if (err) {
																						console.log('[SELECT ERROR] - ', err.message);
																						res.send('SQL query error');
																						return;
																					}
																					else {
																						adminUserInfo = result;
																						//connection.end();
																						common.correctUserInfo(adminUserInfo);
																						//console.log(userInfo);
																						res.render('admin/adminUserDisplay', {
																						adminUserInfo: adminUserInfo
																						});
																					}
																				})
																			}
																		})
																	}
																})
															}
														})
													}
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});

};

function adminGetUserInfo(req, res, next) {
	const adminid = xss(req.session.adminid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select userid, fname, lname, state, city, street, zipcode, gender, maritalstatus from user';
		connection.query(sql, [adminid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			adminUserInfo = result;
			common.correctUserInfo(adminUserInfo);
			//console.log(userInfo);
			res.render('admin/adminUserDisplay', {
				adminUserInfo: adminUserInfo
			});
		});
	});
}

function adminGetPolicyInfo(req, res, next) {
	const adminid = xss(req.session.adminid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select policyid, type, policyname, amount from policy';
		connection.query(sql, [adminid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			adminPolicyInfo = result;
			common.correctUserInfo(adminPolicyInfo);
			//console.log(userInfo);
			res.render('admin/adminPolicyDisplay', {
				adminPolicyInfo: adminPolicyInfo
			});
		});
	});
}

function adminCreatePolicy(req, res, next) {
	console.log('enter function adminCreatePolicy');
	console.log(req.body);
	const type = xss(req.body.type);
	const policyname = xss(req.body.policyname);
	const amount = xss(req.body.amount);
	//verify
	database.setUpDatabase(function (connection) {
		connection.connect();
		//issue: home name
		var sql = 'select * from policy where policy.policyname = ?';
		connection.query(sql, policyname, function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send("SQL query error");
				return;
			}
			if (result.length > 0) {
				console.log('Already exists same policy name: ', autoname);
				res.send('Already exists same policy name');
				return;
			}
			var addSqlParams = [type, policyname, amount];
			console.log(addSqlParams);
			var addSql = 'insert into policy (type, policyname, amount) values (?, ?, ?)';
			connection.query(addSql, addSqlParams, function (err, result) {
				if (err) {
					console.log('[INSERT ERROR] - ', err.message)
					res.send("SQL insert error");
					return;
				}
				console.log('--------------------------INSERT----------------------------')
				console.log('INSERT ID:', result)
				console.log('------------------------------------------------------------')
				//issue 01: 注册成功alert
				connection.end();
				res.redirect(301, '/admin/dashboard');
			})
		})
	})
}

function adminGetHomeInfo(req, res, next) {
	const adminid = xss(req.session.adminid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select homeid, homename, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, swimmingpool, basement, userid from home';
		connection.query(sql, [adminid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			adminHomeInfo = result;
			common.correctHomeInfo(adminHomeInfo);
			//console.log(userInfo);
			res.render('admin/adminHomeDisplay', {
				adminHomeInfo: adminHomeInfo
			});
		});
	});
}

function adminGetAutoInfo(req, res, next) {
	const adminid = xss(req.session.adminid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select vin, autoname, modeldate, status, userid from auto';
		connection.query(sql, [adminid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			adminAutoInfo = result;
			common.correctAutoInfo(adminAutoInfo);
			//console.log(userInfo);
			res.render('admin/adminAutoDisplay', {
				adminAutoInfo: adminAutoInfo
			});
		});
	});
}

function adminGetHomeInvoiceInfo(req, res, next) {
	const adminid = xss(req.session.adminid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select userid, hpid, paymentduedate, amount, (amount-amountpaid)leftamount from home_policy';
		connection.query(sql, [adminid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			adminHomeInvoiceInfo = result;
			common.correctUserInfo(adminHomeInvoiceInfo);
			//console.log(userInfo);
			res.render('admin/adminHomeInvoiceDisplay', {
				adminHomeInvoiceInfo: adminHomeInvoiceInfo
			});
		});
	});
}

function adminGetAutoInvoiceInfo(req, res, next) {
	const adminid = xss(req.session.adminid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select userid, apid, paymentduedate, amount, (amount-amountpaid)leftamount from auto_policy';
		connection.query(sql, [adminid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			adminAutoInvoiceInfo = result;
			common.correctUserInfo(adminAutoInvoiceInfo);
			//console.log(userInfo);
			res.render('admin/adminAutoInvoiceDisplay', {
				adminAutoInvoiceInfo: adminAutoInvoiceInfo
			});
		});
	});
}

function adminGetHomePayInfo(req, res, next) {
	const adminid = xss(req.session.adminid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select paymentid, paymentdate, method, hpid, amount, userid from hpayment';
		connection.query(sql, [adminid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			adminHomePayInfo = result;
			common.correctUserInfo(adminHomePayInfo);
			//console.log(userInfo);
			res.render('admin/adminHomePayDisplay', {
				adminHomePayInfo: adminHomePayInfo
			});
		});
	});
}


function adminGetAutoPayInfo(req, res, next) {
	const adminid = xss(req.session.adminid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select paymentid, paymentdate, method, apid, amount, userid from apayment';
		connection.query(sql, [adminid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			adminAutoPayInfo = result;
			common.correctUserInfo(adminAutoPayInfo);
			//console.log(userInfo);
			res.render('admin/adminAutoPayDisplay', {
				adminAutoPayInfo: adminAutoPayInfo
			});
		});
	});
}

function adminGetDriverInfo(req, res, next) { 
    const adminid = xss(req.session.adminid);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select userid, licensenum, fname, lname, vin, autoname, birthdate from driver';
		connection.query(sql, [adminid], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			adminDriverInfo = result;
			console.log(adminDriverInfo);

			res.render('admin/adminDriverDisplay', {
				adminDriverInfo: adminDriverInfo
			});
		});
	});
}