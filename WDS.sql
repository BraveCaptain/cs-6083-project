DROP DATABASE IF EXISTS WDS;
CREATE DATABASE WDS;
 USE WDS;

CREATE TABLE user (
    userid varchar(3) NOT NULL,
    password varchar(6) not null,
    customerid INT
);

alter table user add constraint user_pk PRIMARY KEY (userid);

CREATE TABLE acustomer (
    customerid  INT NOT NULL COMMENT 'the unique ID for customer',
    type        CHAR(1) NOT NULL COMMENT 'to show whether the customer is Automobile Insurance customer or Home Insurance customer or both, can only be "A" or "H"'
);

ALTER TABLE acustomer ADD CONSTRAINT acustomer_pk PRIMARY KEY ( customerid );

CREATE TABLE apolicy (
    policyid INT NOT NULL COMMENT 'the unique ID of policy'
);

ALTER TABLE apolicy ADD CONSTRAINT apolicy_pk PRIMARY KEY ( policyid );

CREATE TABLE auto (
    vin         INT NOT NULL COMMENT 'unqiue vehicle VIN (vehicle identification number)',
    modelyear   DATETIME NOT NULL COMMENT 'vehicle make-model year',
    status      CHAR(1) NOT NULL COMMENT 'show the status of the vehicle, can be one of “L”, “F”, or “O” representing "Leased", "Financed", and "Owned"
',
    customerid  INT NOT NULL COMMENT 'the unique ID for customer'
);


ALTER TABLE auto ADD CONSTRAINT auto_pk PRIMARY KEY ( vin );

CREATE TABLE auto_apolicy (
    apid           INT NOT NULL COMMENT 'the unique ID standing for the relationship between a specific auto and a specific auto policy',
    startdate      DATETIME NOT NULL COMMENT 'auto insurance policy start date',
    enddate        DATETIME COMMENT 'auto insurance policy end date',
    premuimamount  INT NOT NULL COMMENT 'auto insurance premium amount',
    status         CHAR(1) NOT NULL COMMENT 'show auto policy insurance status. If auto insurance policy term is current, status column should have value "C", and if it is expired, it should have value "P". ',
    vin            INT NOT NULL COMMENT 'unqiue vehicle VIN (vehicle identification number)',
    policyid       INT NOT NULL COMMENT 'the unique ID of policy'
);

ALTER TABLE auto_apolicy ADD CONSTRAINT auto_apolicy_pk PRIMARY KEY ( apid );

CREATE TABLE customer (
    customerid     INT NOT NULL COMMENT 'the unique ID for customer',
    type           CHAR(1) NOT NULL COMMENT 'to show whether the customer is Automobile Insurance customer or Home Insurance customer or both, can only be "A" or "H"',
    fname          VARCHAR(10) NOT NULL COMMENT 'the first name of customer, must be in upper case',
    lname          VARCHAR(10) NOT NULL COMMENT 'the last name of customer, must be in upper case',
    state          VARCHAR(10) NOT NULL COMMENT 'the state where customer lives',
    city           VARCHAR(10) NOT NULL COMMENT 'the city where customer lives',
    street         VARCHAR(20) NOT NULL COMMENT 'the street where customer lives',
    zipcode        VARCHAR(5) NOT NULL COMMENT 'the zipcode that where customer lives uses',
    gender         CHAR(1) COMMENT 'show whether customer is male or female, can only be "M" or "F", customer may choose not to provide gender data',
    maritalstatus  CHAR(1) NOT NULL COMMENT 'show marital status of customer, must be either "M", "S", or "W", representing "Married", "Single", and "Widow/Widower" respectively'
);

ALTER TABLE customer
    ADD CONSTRAINT ch_inh_customer CHECK ( type IN (
        'A',
        'H'
    ) );

ALTER TABLE customer ADD CONSTRAINT customer_pk PRIMARY KEY ( customerid,
                                                              type );

CREATE TABLE driver (
    licensenum  INT NOT NULL COMMENT 'the unique license number of driver',
    fname       VARCHAR(10) NOT NULL COMMENT 'the first name of driver, must be in upper case',
    lname       VARCHAR(10) NOT NULL COMMENT 'the last name of driver, must be in upper case',
    birthdate   DATETIME NOT NULL COMMENT 'the birthdate of driver'
);


ALTER TABLE driver ADD CONSTRAINT driver_pk PRIMARY KEY ( licensenum );

CREATE TABLE driver_auto (
    vin         INT NOT NULL COMMENT 'unqiue vehicle VIN (vehicle identification number)',
    licensenum  INT NOT NULL COMMENT 'the unique license number of driver'
);


ALTER TABLE driver_auto ADD CONSTRAINT driver_auto_pk PRIMARY KEY ( vin,
                                                                    licensenum );

CREATE TABLE hcustomer (
    customerid  INT NOT NULL COMMENT 'the unique ID for customer',
    type        CHAR(1) NOT NULL COMMENT 'to show whether the customer is Automobile Insurance customer or Home Insurance customer or both, can only be "A" or "H"'
);


ALTER TABLE hcustomer ADD CONSTRAINT hcustomer_pk PRIMARY KEY ( customerid );

CREATE TABLE home (
    homeid                INT NOT NULL COMMENT 'the unique home ID',
    purchasedate          DATETIME NOT NULL COMMENT 'home purchase date',
    purchasevalue         INT NOT NULL COMMENT 'home purchase value',
    area                  INT NOT NULL COMMENT 'home area in Sq. Ft',
    type                  CHAR(1) NOT NULL COMMENT 'show the type of home, can be S,M,C,T representing Single family, Multi Family, Condominium, Town house respectively',
    autofirenotification  CHAR(1) NOT NULL COMMENT 'show whether there is automatic fire notification to the fire department. 1 for there is and 0 for there is not.',
    securitysystem        CHAR(1) NOT NULL COMMENT 'show whether there is the home security system. 1 for there is and 0 for there is not.',
    swimmingpool          VARCHAR(1) COMMENT 'show which type of the swimming pool and whether there is a swimming pool. Not mendatory attribute, and blank means null showing there is no swimming pool. Can be U,O,I,M, representing Underground swimming pool, Overground swimming pool, Indoor swimming pool and Multiple swimming pool respectively.',
    basement              CHAR(1) NOT NULL COMMENT 'show whether there is basement. 1 for there is and 0 for there is not.',
    customerid            INT NOT NULL COMMENT 'the unique ID for customer'
);

ALTER TABLE home ADD CONSTRAINT home_pk PRIMARY KEY ( homeid );

CREATE TABLE home_hpolicy (
    hpid           INT NOT NULL COMMENT 'the unique ID standing for the relationship between a specific home and a specific home policy',
    startdate      DATETIME NOT NULL COMMENT ' home insurance policy start date',
    enddate        DATETIME NOT NULL COMMENT 'home insurance policy end date',
    premuimamount  INT NOT NULL COMMENT 'home insurance premium amount',
    status         CHAR(1) NOT NULL COMMENT 'show home policy insurance status. If home insurance policy term is current, status column should have value "C", and if it is expired, it should have value "P". ',
    homeid         INT NOT NULL COMMENT 'the unique home ID',
    policyid       INT NOT NULL COMMENT 'the unique ID of policy'
);


ALTER TABLE home_hpolicy ADD CONSTRAINT home_hpolicy_pk PRIMARY KEY ( hpid );

CREATE TABLE hpolicy (
    policyid INT NOT NULL COMMENT 'the unique ID of policy'
);


ALTER TABLE hpolicy ADD CONSTRAINT hpolicy_pk PRIMARY KEY ( policyid );

CREATE TABLE invoice (
    invoiceid       INT NOT NULL COMMENT 'the unique of invoice',
    paymentduedate  DATETIME NOT NULL COMMENT 'show payment due date',
    amount          INT NOT NULL COMMENT 'show invoice amount'
);

ALTER TABLE invoice ADD CONSTRAINT invoice_pk PRIMARY KEY ( invoiceid );

CREATE TABLE payment (
    paymentid  INT NOT NULL COMMENT 'the unique ID for payment',
    paymentdate     DATETIME NOT NULL COMMENT 'payment date ',
    method     VARCHAR(6) NOT NULL COMMENT 'show method of payment, can be either as "PayPal", "Credit", "Debit", "Check" ',
    hpid       INT COMMENT 'the unique ID standing for the relationship between a specific home and a specific home policy',
    apid       INT COMMENT 'the unique ID standing for the relationship between a specific auto and a specific auto policy',
    invoiceid  INT NOT NULL,
    amount INT NOT NULL
);


ALTER TABLE payment ADD CONSTRAINT payment_pk PRIMARY KEY ( paymentid );

CREATE TABLE policy (
    policyid  INT NOT NULL COMMENT 'the unique ID of policy',
    type      CHAR(1) NOT NULL COMMENT 'show the type of policy, a policy can either be Home Insurance policy or Auto Insurance policy, but cannot be both, can be "H" or "A"'
);

ALTER TABLE policy
    ADD CONSTRAINT ch_inh_policy CHECK ( type IN (
        'A',
        'H'
    ) );

ALTER TABLE policy ADD CONSTRAINT policy_pk PRIMARY KEY ( policyid );

alter table user
    add constraint user_customer_fk FOREIGN KEY (customerid)
        REFERENCES customer (customerid);

ALTER TABLE acustomer
    ADD CONSTRAINT acustomer_customer_fk FOREIGN KEY ( customerid,
                                                       type )
        REFERENCES customer ( customerid,
                              type );

ALTER TABLE apolicy
    ADD CONSTRAINT apolicy_policy_fk FOREIGN KEY ( policyid )
        REFERENCES policy ( policyid );

ALTER TABLE auto
    ADD CONSTRAINT auto_acustomer_fk FOREIGN KEY ( customerid )
        REFERENCES acustomer ( customerid );

ALTER TABLE auto_apolicy
    ADD CONSTRAINT auto_apolicy_apolicy_fk FOREIGN KEY ( policyid )
        REFERENCES apolicy ( policyid );

ALTER TABLE auto_apolicy
    ADD CONSTRAINT auto_apolicy_auto_fk FOREIGN KEY ( vin )
        REFERENCES auto ( vin );

ALTER TABLE driver_auto
    ADD CONSTRAINT driver_auto_auto_fk FOREIGN KEY ( vin )
        REFERENCES auto ( vin );

ALTER TABLE driver_auto
    ADD CONSTRAINT driver_auto_driver_fk FOREIGN KEY ( licensenum )
        REFERENCES driver ( licensenum );

ALTER TABLE hcustomer
    ADD CONSTRAINT hcustomer_customer_fk FOREIGN KEY ( customerid,
                                                       type )
        REFERENCES customer ( customerid,
                              type );

ALTER TABLE home
    ADD CONSTRAINT home_hcustomer_fk FOREIGN KEY ( customerid )
        REFERENCES hcustomer ( customerid );

ALTER TABLE home_hpolicy
    ADD CONSTRAINT home_hpolicy_home_fk FOREIGN KEY ( homeid )
        REFERENCES home ( homeid );

ALTER TABLE home_hpolicy
    ADD CONSTRAINT home_hpolicy_hpolicy_fk FOREIGN KEY ( policyid )
        REFERENCES hpolicy ( policyid );

ALTER TABLE hpolicy
    ADD CONSTRAINT hpolicy_policy_fk FOREIGN KEY ( policyid )
        REFERENCES policy ( policyid );

ALTER TABLE payment
    ADD CONSTRAINT payment_auto_apolicy_fk FOREIGN KEY ( apid )
        REFERENCES auto_apolicy ( apid );

ALTER TABLE payment
    ADD CONSTRAINT payment_home_hpolicy_fk FOREIGN KEY ( hpid )
        REFERENCES home_hpolicy ( hpid );

ALTER TABLE payment
    ADD CONSTRAINT payment_invoice_fk FOREIGN KEY ( invoiceid )
        REFERENCES invoice ( invoiceid );

-- CREATE TRIGGER arc_fkarc_21_hcustomer BEFORE
--     INSERT OR UPDATE OF customerid, type ON hcustomer
--     FOR EACH ROW
--     DECLARE d CHAR(1);
-- BEGIN
--     SELECT
--         a.type
--     INTO d
--     FROM
--         customer a
--     WHERE
--             a.customerid = :new.customerid
--         AND a.type = :new.type;

--     IF ( d IS NULL OR d <> 'H' ) THEN
--         raise_application_error(-20223, 'FK HCUSTOMER_CUSTOMER_FK in Table HCUSTOMER violates Arc constraint on Table CUSTOMER - discriminator column type doesn''t have value ''H''');
--     END IF;

--     DECLARE EXIT HANDLER FOR not found BEGIN
--         NULL;
--     END;
--     DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN
--         RAISE;
--     END;
-- END;
-- /

-- CREATE TRIGGER arc_fkarc_21_acustomer BEFORE
--     INSERT OR UPDATE OF customerid, type ON acustomer
--     FOR EACH ROW
--     DECLARE d CHAR(1);
-- BEGIN
--     SELECT
--         a.type
--     INTO d
--     FROM
--         customer a
--     WHERE
--             a.customerid = :new.customerid
--         AND a.type = :new.type;

--     IF ( d IS NULL OR d <> 'A' ) THEN
--         raise_application_error(-20223, 'FK ACUSTOMER_CUSTOMER_FK in Table ACUSTOMER violates Arc constraint on Table CUSTOMER - discriminator column type doesn''t have value ''A''');
--     END IF;

--     DECLARE EXIT HANDLER FOR not found BEGIN
--         NULL;
--     END;
--     DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN
--         RAISE;
--     END;
-- END;
-- /

-- CREATE TRIGGER arc_fkarc_22_apolicy BEFORE
--     INSERT OR UPDATE OF policyid ON apolicy
--     FOR EACH ROW
--     DECLARE d CHAR(1);
-- BEGIN
--     SELECT
--         a.type
--     INTO d
--     FROM
--         policy a
--     WHERE
--         a.policyid = :new.policyid;

--     IF ( d IS NULL OR d <> 'A' ) THEN
--         raise_application_error(-20223, 'FK APOLICY_POLICY_FK in Table APOLICY violates Arc constraint on Table POLICY - discriminator column type doesn''t have value ''A''');
--     END IF;

--     DECLARE EXIT HANDLER FOR not found BEGIN
--         NULL;
--     END;
--     DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN
--         RAISE;
--     END;
-- END;
-- /

-- CREATE TRIGGER arc_fkarc_22_hpolicy BEFORE
--     INSERT OR UPDATE OF policyid ON hpolicy
--     FOR EACH ROW
--     DECLARE d CHAR(1);
-- BEGIN
--     SELECT
--         a.type
--     INTO d
--     FROM
--         policy a
--     WHERE
--         a.policyid = :new.policyid;

--     IF ( d IS NULL OR d <> 'H' ) THEN
--         raise_application_error(-20223, 'FK HPOLICY_POLICY_FK in Table HPOLICY violates Arc constraint on Table POLICY - discriminator column type doesn''t have value ''H''');
--     END IF;

--     DECLARE EXIT HANDLER FOR not found BEGIN
--         NULL;
--     END;
--     DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN
--         RAISE;
--     END;
-- END;
-- /

-- CALL CreateSequence('auto_apolicy_apid_seq', 1, 1) ORDER;

-- CREATE TRIGGER auto_apolicy_apid_trg BEFORE
--     INSERT ON auto_apolicy
--     FOR EACH ROW
--     WHEN ( new.apid IS NULL )
-- BEGIN
--     Set :new.apid = auto_apolicy_apid_seq.nextval;
-- END;
-- /

-- CALL CreateSequence('home_hpolicy_hpid_seq', 1, 1) ORDER;

-- CREATE TRIGGER home_hpolicy_hpid_trg BEFORE
--     INSERT ON home_hpolicy
--     FOR EACH ROW
--     WHEN ( new.hpid IS NULL )
-- BEGIN
--     Set :new.hpid = home_hpolicy_hpid_seq.nextval;
-- END;
-- /

-- user
insert into user (userid, password) values ('Tom', '888888');

-- customer
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


-- home
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



-- driver
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


-- auto
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



-- driver_auto
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

-- policy
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

-- home_hpolicy
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

-- invoice
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

-- auto_apolicy
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

-- payment
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
