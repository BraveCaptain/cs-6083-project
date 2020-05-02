DROP DATABASE IF EXISTS WDS;
CREATE DATABASE WDS;
USE WDS;

CREATE TABLE acustomer (
    type        CHAR(1) NOT NULL COMMENT 'to show whether the customer is Automobile Insurance customer or Home Insurance customer or both, can only be "A" or "H"',
    customerid  INT NOT NULL
);

ALTER TABLE acustomer ADD CONSTRAINT acustomer_pk PRIMARY KEY ( customerid );

CREATE TABLE apolicy (
    policyid INT NOT NULL COMMENT 'the unique ID of policy'
);

ALTER TABLE apolicy ADD CONSTRAINT apolicy_pk PRIMARY KEY ( policyid );

CREATE TABLE auto (
    vin                            INT NOT NULL COMMENT 'unqiue vehicle VIN (vehicle identification number)',
    modelyear                      DATETIME NOT NULL COMMENT 'vehicle make-model year',
    status                         CHAR(1) NOT NULL COMMENT 'show the status of the vehicle, can be one of "L", "F", or "O" representing "Leased", "Financed", and "Owned"
',
    acustomer_customer_customerid  INT NOT NULL
);

ALTER TABLE auto ADD CONSTRAINT auto_pk PRIMARY KEY ( vin );

CREATE TABLE auto_apolicy (
    apid           INT NOT NULL COMMENT 'the unique ID standing for the relationship between a specific auto and a specific auto policy',
    startdate      DATETIME NOT NULL COMMENT 'auto insurance policy start date',
    enddate        DATETIME NOT NULL COMMENT 'auto insurance policy end date',
    premuimamount  INT NOT NULL COMMENT 'auto insurance premium amount',
    status         CHAR(1) NOT NULL COMMENT 'show auto policy insurance status. If auto insurance policy term is current, status column should have value "C", and if it is expired, it should have value "P". ',
    vin            INT NOT NULL COMMENT 'unqiue vehicle VIN (vehicle identification number)',
    policyid       INT NOT NULL COMMENT 'the unique ID of policy'
);


ALTER TABLE auto_apolicy ADD CONSTRAINT auto_apolicy_pk PRIMARY KEY ( apid );

CREATE TABLE customer (
    type        CHAR(1) NOT NULL COMMENT 'to show whether the customer is Automobile Insurance customer or Home Insurance customer or both, can only be "A" or "H"',
    userid      VARCHAR(30),
    customerid  INT NOT NULL
);

ALTER TABLE customer
    ADD CONSTRAINT ch_inh_customer CHECK ( type IN (
        'A',
        'H'
    ) );

ALTER TABLE customer ADD CONSTRAINT customer_pk PRIMARY KEY ( type,
                                                              customerid );

CREATE TABLE driver (
    licensenum  INT NOT NULL COMMENT 'the unique license number of driver',
    fname       VARCHAR(10) NOT NULL COMMENT 'the first name of driver',
    lname       VARCHAR(10) NOT NULL COMMENT 'the last name of driver',
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
    type        CHAR(1) NOT NULL COMMENT 'to show whether the customer is Automobile Insurance customer or Home Insurance customer or both, can only be "A" or "H"',
    customerid  INT NOT NULL
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
    hcustomer_customerid  INT NOT NULL
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
    paymentid    INT NOT NULL COMMENT 'the unique ID for payment',
    paymentdate  DATETIME NOT NULL COMMENT 'payment date ',
    method       VARCHAR(6) NOT NULL COMMENT 'show method of payment, can be either as "PayPal", "Credit", "Debit", "Check" ',
    hpid         INT COMMENT 'the unique ID standing for the relationship between a specific home and a specific home policy',
    apid         INT COMMENT 'the unique ID standing for the relationship between a specific auto and a specific auto policy',
    invoiceid    INT NOT NULL,
    amount       INT NOT NULL COMMENT 'the amount of money of payment'
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

CREATE TABLE user (
    userid         VARCHAR(30) NOT NULL,
    password       VARCHAR(200) NOT NULL,
    fname          VARCHAR(10)  COMMENT 'the first name of customer',
    lname          VARCHAR(10)  COMMENT 'the last name of customer',
    state          VARCHAR(10)  COMMENT 'the state where customer lives',
    city           VARCHAR(10)  COMMENT 'the city where customer lives',
    street         VARCHAR(20)  COMMENT 'the street where customer lives',
    zipcode        VARCHAR(5)  COMMENT 'the zipcode that where customer lives uses',
    gender         CHAR(1) COMMENT 'show whether customer is male or female, can only be "M" or "F", customer may choose not to provide gender data',
    maritalstatus  CHAR(1)  COMMENT 'show marital status of customer, must be either "M", "S", or "W", representing "Married", "Single", and "Widow/Widower" respectively'
);

ALTER TABLE user ADD CONSTRAINT user_pk PRIMARY KEY ( userid );

ALTER TABLE acustomer
    ADD CONSTRAINT acustomer_customer_fk FOREIGN KEY ( type,
                                                       customerid )
        REFERENCES customer ( type,
                              customerid );

ALTER TABLE apolicy
    ADD CONSTRAINT apolicy_policy_fk FOREIGN KEY ( policyid )
        REFERENCES policy ( policyid );

ALTER TABLE auto
    ADD CONSTRAINT auto_acustomer_fk FOREIGN KEY ( acustomer_customer_customerid )
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
    ADD CONSTRAINT hcustomer_customer_fk FOREIGN KEY ( type,
                                                       customerid )
        REFERENCES customer ( type,
                              customerid );

ALTER TABLE home
    ADD CONSTRAINT home_hcustomer_fk FOREIGN KEY ( hcustomer_customerid )
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

ALTER TABLE customer
    ADD CONSTRAINT user_fk FOREIGN KEY ( userid )
        REFERENCES user ( userid );