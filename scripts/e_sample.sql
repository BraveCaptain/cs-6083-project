--customer
insert into customer (customerid, type, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (10000000, 'A', 'A', 'A', 'NY', 'NY', '5th Av', '88888', 'M', 'W');
insert into customer (customerid, type, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (10000001, 'A', 'A', 'B', 'NY', 'NY', '5th Av', '88888', 'M', 'W');
insert into customer (customerid, type, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (10000002, 'A', 'A', 'C', 'NY', 'NY', '5th Av', '88888', 'M', 'W');
insert into customer (customerid, type, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (10000003, 'A', 'A', 'D', 'NY', 'NY', '5th Av', '88888', 'M', 'W');
insert into customer (customerid, type, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (10000004, 'A', 'A', 'E', 'NY', 'NY', '5th Av', '88888', 'M', 'W');
insert into customer (customerid, type, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (10000005, 'A', 'A', 'F', 'NY', 'NY', '5th Av', '88888', 'M', 'W');
insert into customer (customerid, type, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (10000006, 'A', 'A', 'G', 'NY', 'NY', '5th Av', '88888', 'M', 'W');
insert into customer (customerid, type, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (10000007, 'A', 'A', 'H', 'NY', 'NY', '5th Av', '88888', 'M', 'W');
insert into customer (customerid, type, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (10000008, 'A', 'A', 'I', 'NY', 'NY', '5th Av', '88888', 'M', 'W');
insert into customer (customerid, type, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (10000009, 'A', 'A', 'J', 'NY', 'NY', '5th Av', '88888', 'M', 'W');

insert into acustomer (customerid, type) values (10000000, 'A');
insert into acustomer (customerid, type) values (10000001, 'A');
insert into acustomer (customerid, type) values (10000002, 'A');
insert into acustomer (customerid, type) values (10000003, 'A');
insert into acustomer (customerid, type) values (10000004, 'A');
insert into acustomer (customerid, type) values (10000005, 'A');
insert into acustomer (customerid, type) values (10000006, 'A');
insert into acustomer (customerid, type) values (10000007, 'A');
insert into acustomer (customerid, type) values (10000008, 'A');
insert into acustomer (customerid, type) values (10000009, 'A');


insert into customer (customerid, type, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (10000000, 'H', 'A', 'A', 'NY', 'NY', '5th Av', '88888', 'M', 'W');
insert into customer (customerid, type, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (10000001, 'H', 'A', 'B', 'NY', 'NY', '5th Av', '88888', 'M', 'W');
insert into customer (customerid, type, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (10000002, 'H', 'A', 'C', 'NY', 'NY', '5th Av', '88888', 'M', 'W');
insert into customer (customerid, type, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (10000003, 'H', 'A', 'D', 'NY', 'NY', '5th Av', '88888', 'M', 'W');
insert into customer (customerid, type, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (10000004, 'H', 'A', 'E', 'NY', 'NY', '5th Av', '88888', 'M', 'W');
insert into customer (customerid, type, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (10000005, 'H', 'A', 'F', 'NY', 'NY', '5th Av', '88888', 'M', 'W');
insert into customer (customerid, type, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (10000006, 'H', 'A', 'G', 'NY', 'NY', '5th Av', '88888', 'M', 'W');
insert into customer (customerid, type, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (10000007, 'H', 'A', 'H', 'NY', 'NY', '5th Av', '88888', 'M', 'W');
insert into customer (customerid, type, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (10000008, 'H', 'A', 'I', 'NY', 'NY', '5th Av', '88888', 'M', 'W');
insert into customer (customerid, type, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (10000009, 'H', 'A', 'J', 'NY', 'NY', '5th Av', '88888', 'M', 'W');


insert into hcustomer (customerid, type) values (10000000, 'H');
insert into hcustomer (customerid, type) values (10000001, 'H');
insert into hcustomer (customerid, type) values (10000002, 'H');
insert into hcustomer (customerid, type) values (10000003, 'H');
insert into hcustomer (customerid, type) values (10000004, 'H');
insert into hcustomer (customerid, type) values (10000005, 'H');
insert into hcustomer (customerid, type) values (10000006, 'H');
insert into hcustomer (customerid, type) values (10000007, 'H');
insert into hcustomer (customerid, type) values (10000008, 'H');
insert into hcustomer (customerid, type) values (10000009, 'H');


--home
insert into home (homeid, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, swimmingpool, basement, customerid) values (10000000, date'2020-01-01', 100, 5, 'S', '0', '0', 'U', '1', 10000000);
insert into home (homeid, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, swimmingpool, basement, customerid) values (10000001, date'2020-01-02', 100, 5, 'M', '0', '1', 'O', '0', 10000001);
insert into home (homeid, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, swimmingpool, basement, customerid) values (10000002, date'2020-01-03', 100, 5, 'C', '1', '0', 'I', '1', 10000002);
insert into home (homeid, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, swimmingpool, basement, customerid) values (10000003, date'2020-02-01', 100, 5, 'T', '1', '1', 'M', '0', 10000003);
insert into home (homeid, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, swimmingpool, basement, customerid) values (10000004, date'2020-03-01', 100, 5, 'S', '0', '0', 'U', '0', 10000004);
insert into home (homeid, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, swimmingpool, basement, customerid) values (10000005, date'2020-03-02', 100, 5, 'M', '1', '1', 'O', '0', 10000005);
insert into home (homeid, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, swimmingpool, basement, customerid) values (10000006, date'2020-01-01', 100, 5, 'C', '0', '0', 'I', '1', 10000006);
insert into home (homeid, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, swimmingpool, basement, customerid) values (10000007, date'2008-01-01', 100, 5, 'T', '1', '0', 'M', '1', 10000007);
insert into home (homeid, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, swimmingpool, basement, customerid) values (10000008, date'2014-01-01', 100, 5, 'S', '0', '0', 'U', '1', 10000008);
insert into home (homeid, purchasedate, purchasevalue, area, type, autofirenotification, securitysystem, swimmingpool, basement, customerid) values (10000009, date'2012-03-01', 100, 5, 'M', '1', '0', 'O', '1', 10000009);



--driver
insert into driver (licensenum, fname, lname, birthdate) values (10000000, 'd', 'a', date'1995-06-02');
insert into driver (licensenum, fname, lname, birthdate) values (10000001, 'd', 'b', date'1995-08-02');
insert into driver (licensenum, fname, lname, birthdate) values (10000002, 'd', 'c', date'1995-03-02');
insert into driver (licensenum, fname, lname, birthdate) values (10000003, 'd', 'd', date'1995-06-21');
insert into driver (licensenum, fname, lname, birthdate) values (10000004, 'd', 'e', date'1993-06-02');
insert into driver (licensenum, fname, lname, birthdate) values (10000005, 'd', 'f', date'1995-06-02');
insert into driver (licensenum, fname, lname, birthdate) values (10000006, 'd', 'g', date'1995-06-02');
insert into driver (licensenum, fname, lname, birthdate) values (10000007, 'd', 'h', date'1995-06-02');
insert into driver (licensenum, fname, lname, birthdate) values (10000008, 'd', 'i', date'1995-06-02');
insert into driver (licensenum, fname, lname, birthdate) values (10000009, 'd', 'j', date'1995-06-02');


--auto
insert into auto (vin, modelyear, status, customerid) values (10000000, date'1995-06-02', 'L', 10000000);
insert into auto (vin, modelyear, status, customerid) values (10000001, date'1995-06-02', 'F', 10000001);
insert into auto (vin, modelyear, status, customerid) values (10000002, date'1995-06-02', 'O', 10000002);
insert into auto (vin, modelyear, status, customerid) values (10000003, date'1995-06-02', 'L', 10000003);
insert into auto (vin, modelyear, status, customerid) values (10000004, date'1995-06-02', 'F', 10000004);
insert into auto (vin, modelyear, status, customerid) values (10000005, date'1995-06-02', 'O', 10000005);
insert into auto (vin, modelyear, status, customerid) values (10000006, date'1995-06-02', 'L', 10000006);
insert into auto (vin, modelyear, status, customerid) values (10000007, date'1995-06-02', 'F', 10000007);
insert into auto (vin, modelyear, status, customerid) values (10000008, date'1995-06-02', 'O', 10000008);
insert into auto (vin, modelyear, status, customerid) values (10000009, date'1995-06-02', 'L', 10000009);



--driver_auto
insert into driver_auto (vin, licensenum) values (10000000, 10000000);
insert into driver_auto (vin, licensenum) values (10000001, 10000001);
insert into driver_auto (vin, licensenum) values (10000002, 10000002);
insert into driver_auto (vin, licensenum) values (10000003, 10000003);
insert into driver_auto (vin, licensenum) values (10000004, 10000004);
insert into driver_auto (vin, licensenum) values (10000005, 10000005);
insert into driver_auto (vin, licensenum) values (10000006, 10000006);
insert into driver_auto (vin, licensenum) values (10000007, 10000007);
insert into driver_auto (vin, licensenum) values (10000008, 10000008);
insert into driver_auto (vin, licensenum) values (10000009, 10000009);

--policy
insert into policy (policyid, type) values (10000000, 'A');
insert into policy (policyid, type) values (10000001, 'A');
insert into policy (policyid, type) values (10000002, 'A');
insert into policy (policyid, type) values (10000003, 'A');
insert into policy (policyid, type) values (10000004, 'A');

insert into apolicy (policyid) values (10000000);
insert into apolicy (policyid) values (10000001);
insert into apolicy (policyid) values (10000002);
insert into apolicy (policyid) values (10000003);
insert into apolicy (policyid) values (10000004);

insert into policy (policyid, type) values (10000005, 'H');
insert into policy (policyid, type) values (10000006, 'H');
insert into policy (policyid, type) values (10000007, 'H');
insert into policy (policyid, type) values (10000008, 'H');
insert into policy (policyid, type) values (10000009, 'H');

insert into hpolicy (policyid) values (10000005);
insert into hpolicy (policyid) values (10000006);
insert into hpolicy (policyid) values (10000007);
insert into hpolicy (policyid) values (10000008);
insert into hpolicy (policyid) values (10000009);

--home_hpolicy
insert into home_hpolicy (hpid, startdate, enddate, premuimamount, status, homeid, policyid) values (10000000, date'2020-01-01', date'2021-01-01', 10000, 'C', 10000000, 10000005);
insert into home_hpolicy (hpid, startdate, enddate, premuimamount, status, homeid, policyid) values (10000001, date'2020-01-01', date'2021-01-01', 10000, 'C', 10000001, 10000005);
insert into home_hpolicy (hpid, startdate, enddate, premuimamount, status, homeid, policyid) values (10000002, date'2020-01-01', date'2021-01-01', 10000, 'C', 10000002, 10000005);
insert into home_hpolicy (hpid, startdate, enddate, premuimamount, status, homeid, policyid) values (10000003, date'2019-01-01', date'2020-01-01', 10000, 'P', 10000001, 10000006);
insert into home_hpolicy (hpid, startdate, enddate, premuimamount, status, homeid, policyid) values (10000004, date'2020-01-01', date'2021-01-01', 10000, 'C', 10000003, 10000005);
insert into home_hpolicy (hpid, startdate, enddate, premuimamount, status, homeid, policyid) values (10000005, date'2020-01-01', date'2021-01-01', 10000, 'C', 10000004, 10000007);
insert into home_hpolicy (hpid, startdate, enddate, premuimamount, status, homeid, policyid) values (10000006, date'2020-01-01', date'2021-01-01', 10000, 'C', 10000004, 10000008);
insert into home_hpolicy (hpid, startdate, enddate, premuimamount, status, homeid, policyid) values (10000007, date'2020-01-01', date'2021-01-01', 10000, 'C', 10000005, 10000009);
insert into home_hpolicy (hpid, startdate, enddate, premuimamount, status, homeid, policyid) values (10000008, date'2020-01-01', date'2021-01-01', 10000, 'C', 10000006, 10000009);
insert into home_hpolicy (hpid, startdate, enddate, premuimamount, status, homeid, policyid) values (10000009, date'2020-01-01', date'2021-01-01', 10000, 'C', 10000007, 10000006);

--invoice
insert into invoice (invoiceid, paymentduedate, amount) values (10000000, date'2020-5-5', 10000);
insert into invoice (invoiceid, paymentduedate, amount) values (10000001, date'2020-5-5', 10000);
insert into invoice (invoiceid, paymentduedate, amount) values (10000002, date'2020-5-5', 10000);
insert into invoice (invoiceid, paymentduedate, amount) values (10000003, date'2020-5-5', 10000);
insert into invoice (invoiceid, paymentduedate, amount) values (10000004, date'2020-5-5', 10000);
insert into invoice (invoiceid, paymentduedate, amount) values (10000005, date'2020-5-5', 10000);
insert into invoice (invoiceid, paymentduedate, amount) values (10000006, date'2020-5-5', 10000);
insert into invoice (invoiceid, paymentduedate, amount) values (10000007, date'2020-5-5', 10000);
insert into invoice (invoiceid, paymentduedate, amount) values (10000008, date'2020-5-5', 10000);
insert into invoice (invoiceid, paymentduedate, amount) values (10000009, date'2020-5-5', 10000);

--auto_apolicy
insert into auto_apolicy (apid, startdate, enddate, premuimamount, status, vin, policyid) values (10000000, date'2020-01-01', date'2021-01-01', 10000, 'C', 10000000, 10000000);
insert into auto_apolicy (apid, startdate, enddate, premuimamount, status, vin, policyid) values (10000001, date'2019-01-01', date'2020-01-01', 10000, 'P', 10000001, 10000000);
insert into auto_apolicy (apid, startdate, enddate, premuimamount, status, vin, policyid) values (10000002, date'2020-01-01', date'2021-01-01', 10000, 'C', 10000002, 10000001);
insert into auto_apolicy (apid, startdate, enddate, premuimamount, status, vin, policyid) values (10000003, date'2020-01-01', date'2021-01-01', 10000, 'C', 10000003, 10000001);
insert into auto_apolicy (apid, startdate, enddate, premuimamount, status, vin, policyid) values (10000004, date'2020-01-01', date'2021-01-01', 10000, 'C', 10000004, 10000002);
insert into auto_apolicy (apid, startdate, enddate, premuimamount, status, vin, policyid) values (10000005, date'2020-01-01', date'2021-01-01', 10000, 'C', 10000005, 10000002);
insert into auto_apolicy (apid, startdate, enddate, premuimamount, status, vin, policyid) values (10000006, date'2020-01-01', date'2021-01-01', 10000, 'C', 10000006, 10000003);
insert into auto_apolicy (apid, startdate, enddate, premuimamount, status, vin, policyid) values (10000007, date'2020-01-01', date'2021-01-01', 10000, 'C', 10000007, 10000003);
insert into auto_apolicy (apid, startdate, enddate, premuimamount, status, vin, policyid) values (10000008, date'2020-01-01', date'2021-01-01', 10000, 'C', 10000008, 10000004);
insert into auto_apolicy (apid, startdate, enddate, premuimamount, status, vin, policyid) values (10000009, date'2020-01-01', date'2021-01-01', 10000, 'C', 10000009, 10000004);

--payment
insert into payment (paymentid, paymentdate, method, hpid, invoiceID, amount) values (10000000, date'2020-01-01', 'PayPal', 10000000, 10000000, 5000);
insert into payment (paymentid, paymentdate, method, hpid, invoiceID, amount) values (10000001, date'2020-01-01', 'Credit', 10000000, 10000000, 5000);
insert into payment (paymentid, paymentdate, method, hpid, invoiceID, amount) values (10000002, date'2020-01-01', 'Debit', 10000001, 10000001, 5000);
insert into payment (paymentid, paymentdate, method, hpid, invoiceID, amount) values (10000003, date'2020-01-01', 'Check', 10000001, 10000001, 5000);
insert into payment (paymentid, paymentdate, method, hpid, invoiceID, amount) values (10000004, date'2020-01-01', 'PayPal', 10000002, 10000002, 10000);
insert into payment (paymentid, paymentdate, method, hpid, invoiceID, amount) values (10000005, date'2020-01-01', 'PayPal', 10000003, 10000003, 10000);
insert into payment (paymentid, paymentdate, method, apid, invoiceID, amount) values (10000006, date'2020-01-01', 'Credit', 10000000, 10000004, 10000);
insert into payment (paymentid, paymentdate, method, apid, invoiceID, amount) values (10000007, date'2020-01-01', 'Check', 10000001, 10000005, 10000);
insert into payment (paymentid, paymentdate, method, apid, invoiceID, amount) values (10000008, date'2020-01-01', 'PayPal', 10000002, 10000006, 10000);
insert into payment (paymentid, paymentdate, method, apid, invoiceID, amount) values (10000009, date'2020-01-01', 'PayPal', 10000003, 10000007, 10000);
