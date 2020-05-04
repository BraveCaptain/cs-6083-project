DROP DATABASE IF EXISTS WDS;
CREATE DATABASE WDS;
USE WDS;

CREATE TABLE acustomer (
    type        CHAR(1) NOT NULL,
    customerid  INT NOT NULL,
    PRIMARY KEY(customerid)
);

CREATE TABLE admin (
    adminid     VARCHAR(30) NOT NULL,
    password    VARCHAR(200),
    PRIMARY KEY (adminid)
);

-- ALTER TABLE acustomer ADD CONSTRAINT acustomer_pk PRIMARY KEY ( customerid );

CREATE TABLE apolicy (
    policyid INT NOT NULL,
    PRIMARY KEY(policyid)
);

-- ALTER TABLE apolicy ADD CONSTRAINT apolicy_pk PRIMARY KEY ( policyid );

CREATE TABLE auto (
    vin         INT NOT NULL,
    modelyear   DATETIME NOT NULL,
    status      CHAR(1) NOT NULL,
    customerid  INT,
    userid      VARCHAR(30) NOT NULL,
    PRIMARY KEY(vin)
);

-- ALTER TABLE auto ADD CONSTRAINT auto_pk PRIMARY KEY ( vin );

CREATE TABLE auto_apolicy (
    apid           INT NOT NULL,
    startdate      DATETIME NOT NULL,
    enddate        DATETIME NOT NULL,
    premuimamount  INT NOT NULL,
    status         CHAR(1) NOT NULL,
    vin            INT NOT NULL,
    policyid       INT NOT NULL,
    PRIMARY KEY(apid)
);

-- ALTER TABLE auto_apolicy ADD CONSTRAINT auto_apolicy_pk PRIMARY KEY ( apid );

CREATE TABLE customer (
    type        CHAR(1) NOT NULL,
    userid      VARCHAR(30) NOT NULL,
    customerid  INT NOT NULL auto_increment,
    PRIMARY KEY(customerid)
);

ALTER TABLE customer
    ADD CONSTRAINT ch_inh_customer CHECK ( type IN (
        'A',
        'H'
    ) 
);

-- ALTER TABLE customer ADD CONSTRAINT customer_pk PRIMARY KEY ( type, customerid );

CREATE TABLE driver (
    licensenum  INT NOT NULL,
    fname       VARCHAR(10) NOT NULL,
    lname       VARCHAR(10) NOT NULL,
    birthdate   DATETIME NOT NULL,
    PRIMARY KEY(licensenum)
);

-- ALTER TABLE driver ADD CONSTRAINT driver_pk PRIMARY KEY ( licensenum );

CREATE TABLE driver_auto (
    vin         INT NOT NULL,
    licensenum  INT NOT NULL,
    PRIMARY KEY(vin, licensenum)
);


-- ALTER TABLE driver_auto ADD CONSTRAINT driver_auto_pk PRIMARY KEY ( vin, licensenum );

CREATE TABLE hcustomer (
    type        CHAR(1) NOT NULL,
    customerid  INT NOT NULL,
    PRIMARY KEY(customerid)
);

-- ALTER TABLE hcustomer ADD CONSTRAINT hcustomer_pk PRIMARY KEY ( customerid );

CREATE TABLE home (
    homeid                INT NOT NULL auto_increment,
    purchasedate          DATETIME NOT NULL,
    purchasevalue         INT NOT NULL,
    area                  INT NOT NULL,
    type                  CHAR(1) NOT NULL,
    autofirenotification  CHAR(1) NOT NULL,
    securitysystem        CHAR(1) NOT NULL,
    swimmingpool          VARCHAR(1),
    basement              CHAR(1) NOT NULL,
    customerid            INT,
    userid                VARCHAR(30) NOT NULL,
    PRIMARY KEY(homeid)
);

-- ALTER TABLE home ADD CONSTRAINT home_pk PRIMARY KEY ( homeid );

CREATE TABLE home_hpolicy (
    hpid           INT NOT NULL,
    startdate      DATETIME NOT NULL,
    enddate        DATETIME NOT NULL,
    premuimamount  INT NOT NULL,
    status         CHAR(1) NOT NULL,
    homeid         INT NOT NULL,
    policyid       INT NOT NULL,
    PRIMARY KEY(hpid)
);

-- ALTER TABLE home_hpolicy ADD CONSTRAINT home_hpolicy_pk PRIMARY KEY ( hpid );

CREATE TABLE hpolicy (
    policyid INT NOT NULL,
    PRIMARY KEY(policyid)
);


-- ALTER TABLE hpolicy ADD CONSTRAINT hpolicy_pk PRIMARY KEY ( policyid );

CREATE TABLE invoice (
    invoiceid       INT NOT NULL,
    paymentduedate  DATETIME NOT NULL,
    amount          INT NOT NULL,
    PRIMARY KEY(invoiceid)
);

-- ALTER TABLE invoice ADD CONSTRAINT invoice_pk PRIMARY KEY ( invoiceid );

CREATE TABLE payment (
    paymentid    INT NOT NULL,
    paymentdate  DATETIME NOT NULL,
    method       VARCHAR(6) NOT NULL,
    hpid         INT,
    apid         INT,
    invoiceid    INT NOT NULL,
    amount       INT NOT NULL,
    PRIMARY KEY(paymentid)
);

-- ALTER TABLE payment ADD CONSTRAINT payment_pk PRIMARY KEY ( paymentid );

CREATE TABLE policy (
    policyid  INT NOT NULL,
    type      CHAR(1) NOT NULL,
    PRIMARY KEY(policyid)
);

ALTER TABLE policy
    ADD CONSTRAINT ch_inh_policy CHECK ( type IN (
        'A',
        'H'
    ) );

-- ALTER TABLE policy ADD CONSTRAINT policy_pk PRIMARY KEY ( policyid );

CREATE TABLE user (
    userid         VARCHAR(30) NOT NULL,
    password       VARCHAR(200) NOT NULL,
    fname          VARCHAR(30) ,
    lname          VARCHAR(30) ,
    state          VARCHAR(30) ,
    city           VARCHAR(30) ,
    street         VARCHAR(30) ,
    zipcode        VARCHAR(5) ,
    gender         CHAR(1),
    maritalstatus  CHAR(1),
    PRIMARY KEY(userid)
);

-- ALTER TABLE user ADD CONSTRAINT user_pk PRIMARY KEY ( userid );

-- ALTER TABLE acustomer
--     ADD CONSTRAINT acustomer_customer_fk FOREIGN KEY ( type, customerid )
--         REFERENCES customer ( type, customerid );

-- ALTER TABLE apolicy
--     ADD CONSTRAINT apolicy_policy_fk FOREIGN KEY ( policyid )
--         REFERENCES policy ( policyid );

-- ALTER TABLE auto
--     ADD CONSTRAINT auto_acustomer_fk FOREIGN KEY ( customerid )
--         REFERENCES acustomer ( customerid );

-- ALTER TABLE auto_apolicy
--     ADD CONSTRAINT auto_apolicy_apolicy_fk FOREIGN KEY ( policyid )
--         REFERENCES apolicy ( policyid );

-- ALTER TABLE auto_apolicy
--     ADD CONSTRAINT auto_apolicy_auto_fk FOREIGN KEY ( vin )
--         REFERENCES auto ( vin );

-- ALTER TABLE driver_auto
--     ADD CONSTRAINT driver_auto_auto_fk FOREIGN KEY ( vin )
--         REFERENCES auto ( vin );

-- ALTER TABLE driver_auto
--     ADD CONSTRAINT driver_auto_driver_fk FOREIGN KEY ( licensenum )
--         REFERENCES driver ( licensenum );

-- ALTER TABLE hcustomer
--     ADD CONSTRAINT hcustomer_customer_fk FOREIGN KEY ( type,
--                                                        customerid )
--         REFERENCES customer ( type,
--                               customerid );

-- ALTER TABLE home
--     ADD CONSTRAINT home_hcustomer_fk FOREIGN KEY ( customerid )
--         REFERENCES hcustomer ( customerid );

-- ALTER TABLE home_hpolicy
--     ADD CONSTRAINT home_hpolicy_home_fk FOREIGN KEY ( homeid )
--         REFERENCES home ( homeid );

-- ALTER TABLE home_hpolicy
--     ADD CONSTRAINT home_hpolicy_hpolicy_fk FOREIGN KEY ( policyid )
--         REFERENCES hpolicy ( policyid );

-- ALTER TABLE hpolicy
--     ADD CONSTRAINT hpolicy_policy_fk FOREIGN KEY ( policyid )
--         REFERENCES policy ( policyid );

-- ALTER TABLE payment
--     ADD CONSTRAINT payment_auto_apolicy_fk FOREIGN KEY ( apid )
--         REFERENCES auto_apolicy ( apid );

-- ALTER TABLE payment
--     ADD CONSTRAINT payment_home_hpolicy_fk FOREIGN KEY ( hpid )
--         REFERENCES home_hpolicy ( hpid );

-- ALTER TABLE payment
--     ADD CONSTRAINT payment_invoice_fk FOREIGN KEY ( invoiceid )
--         REFERENCES invoice ( invoiceid );

-- ALTER TABLE customer
--     ADD CONSTRAINT user_fk FOREIGN KEY ( userid )
--         REFERENCES user ( userid );