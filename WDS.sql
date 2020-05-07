DROP DATABASE IF EXISTS WDS;
CREATE DATABASE WDS;
USE WDS;


CREATE TABLE admin (
    adminid     VARCHAR(30) NOT NULL,
    password    VARCHAR(200),
    PRIMARY KEY (adminid)
);

CREATE TABLE auto (
    autoname    VARCHAR(30) NOT NULL,
    vin         INT NOT NULL,
    modeldate   DATETIME NOT NULL,
    status      CHAR(1) NOT NULL,
    customerid  INT,
    userid      VARCHAR(30) NOT NULL,
    PRIMARY KEY(vin)
);

CREATE TABLE auto_policy (
	userid         VARCHAR(30) NOT NULL,
    apid           INT NOT NULL auto_increment,
    startdate      DATETIME NOT NULL,
    enddate        DATETIME NOT NULL,
    amount         INT NOT NULL,
	amountpaid     INT NOT NULL,
    vin            INT,
    policyid       INT,
	autoname       VARCHAR(30),
	policyname     VARCHAR(30),
    paymentduedate DATETIME NOT NULL,
    PRIMARY KEY(apid)
);


CREATE TABLE apayment (
	userid         VARCHAR(30) NOT NULL,
    paymentid    INT NOT NULL auto_increment,
    paymentdate  DATETIME NOT NULL,
    method       VARCHAR(6) NOT NULL,
    apid         INT,
    amount       INT NOT NULL,
    PRIMARY KEY(paymentid)
);

CREATE TABLE customer (
    type        CHAR(1) NOT NULL,
    userid      VARCHAR(30) NOT NULL,
    customerid  INT NOT NULL auto_increment,
    PRIMARY KEY(customerid, type)
);

ALTER TABLE customer
    ADD CONSTRAINT ch_inh_customer CHECK ( type IN (
        'A',
        'H'
    ) 
);

CREATE TABLE driver (
    userid      VARCHAR(30) NOT NULL,
    licensenum  INT NOT NULL,
    fname       VARCHAR(10) NOT NULL,
    lname       VARCHAR(10) NOT NULL,
    vin         INT NOT NULL,
    autoname    VARCHAR(30) NOT NULL,
    birthdate   DATETIME NOT NULL,
    PRIMARY KEY(licensenum, vin)
);

CREATE TABLE driver_auto (
    userid      VARCHAR(30) NOT NULL,
    vin         INT,
    licensenum  INT NOT NULL,
    autoname    VARCHAR(30) NOT NULL,
    PRIMARY KEY(vin, licensenum)
);

CREATE TABLE home (
    homename              VARCHAR(30) NOT NULL,
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

CREATE TABLE home_policy (
	userid         VARCHAR(30) NOT NULL,
    hpid           INT NOT NULL auto_increment,
    startdate      DATETIME NOT NULL,
    enddate        DATETIME NOT NULL,
    amount         INT NOT NULL,
	amountpaid     INT NOT NULL,
    homeid         INT,
    policyid       INT,
	homename       VARCHAR(30),
	policyname     VARCHAR(30),
	paymentduedate DATETIME NOT NULL,
    PRIMARY KEY(hpid)
);

CREATE TABLE hpayment (
	userid         VARCHAR(30) NOT NULL,
    paymentid    INT NOT NULL auto_increment,
    paymentdate  DATETIME NOT NULL,
    method       VARCHAR(6) NOT NULL,
    hpid         INT,
    amount       INT NOT NULL,
    PRIMARY KEY(paymentid)
);

CREATE TABLE policy (
    policyid  INT NOT NULL auto_increment,
    type      CHAR(1) NOT NULL,
    policyname VARCHAR(30) not null,
	amount 	   INT NOT NULL,
    PRIMARY KEY(policyid, type),
	UNIQUE (policyname)
);

ALTER TABLE policy
    ADD CONSTRAINT ch_inh_policy CHECK ( type IN (
        'A',
        'H'
    ) );

CREATE TABLE user (
    userid         VARCHAR(30) NOT NULL,
    password       VARCHAR(200) NOT NULL,
    fname          VARCHAR(30),
    lname          VARCHAR(30),
    state          VARCHAR(30),
    city           VARCHAR(30),
    street         VARCHAR(30),
    zipcode        VARCHAR(5),
    gender         CHAR(1),
    maritalstatus  CHAR(1),
    PRIMARY KEY(userid)
);
