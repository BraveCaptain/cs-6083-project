-- Generated by Oracle SQL Developer Data Modeler 19.4.0.350.1424
--   at:        2020-04-09 16:26:51 EDT
--   site:      Oracle Database 11g
--   type:      Oracle Database 11g



CREATE TABLE acustomer (
    customerid  NUMBER(8) NOT NULL,
    type        CHAR(1) NOT NULL
);

ALTER TABLE acustomer ADD CONSTRAINT acustomer_pk PRIMARY KEY ( customerid );

CREATE TABLE apolicy (
    policyid NUMBER(8) NOT NULL
);

ALTER TABLE apolicy ADD CONSTRAINT apolicy_pk PRIMARY KEY ( policyid );

CREATE TABLE auto (
    vin         NUMBER(8) NOT NULL,
    modelyear   DATE NOT NULL,
    status      CHAR(1 CHAR) NOT NULL,
    customerid  NUMBER(8) NOT NULL
);

ALTER TABLE auto ADD CONSTRAINT auto_pk PRIMARY KEY ( vin );

CREATE TABLE auto_apolicy (
    apid           NUMBER(8) NOT NULL,
    startdate      DATE NOT NULL,
    enddate        DATE,
    premuimamount  NUMBER(8) NOT NULL,
    status         CHAR(1 CHAR) NOT NULL,
    vin            NUMBER(8) NOT NULL,
    policyid       NUMBER(8) NOT NULL
);

ALTER TABLE auto_apolicy ADD CONSTRAINT auto_apolicy_pk PRIMARY KEY ( apid );

CREATE TABLE customer (
    customerid     NUMBER(8) NOT NULL,
    type           CHAR(1) NOT NULL,
    fname          VARCHAR2(10) NOT NULL,
    lname          VARCHAR2(10) NOT NULL,
    state          VARCHAR2(10) NOT NULL,
    city           VARCHAR2(10) NOT NULL,
    street         VARCHAR2(20) NOT NULL,
    zipcode        VARCHAR2(5) NOT NULL,
    gender         CHAR(1 CHAR),
    maritalstatus  CHAR(1 CHAR) NOT NULL
);

ALTER TABLE customer
    ADD CONSTRAINT ch_inh_customer CHECK ( type IN (
        'A',
        'H'
    ) );

ALTER TABLE customer ADD CONSTRAINT customer_pk PRIMARY KEY ( customerid,
                                                              type );

CREATE TABLE driver (
    licensenum  NUMBER(8) NOT NULL,
    fname       VARCHAR2(10) NOT NULL,
    lname       VARCHAR2(10) NOT NULL,
    birthdate   DATE NOT NULL
);

ALTER TABLE driver ADD CONSTRAINT driver_pk PRIMARY KEY ( licensenum );

CREATE TABLE driver_auto (
    vin         NUMBER(8) NOT NULL,
    licensenum  NUMBER(8) NOT NULL
);

ALTER TABLE driver_auto ADD CONSTRAINT driver_auto_pk PRIMARY KEY ( vin,
                                                                    licensenum );

CREATE TABLE hcustomer (
    customerid  NUMBER(8) NOT NULL,
    type        CHAR(1) NOT NULL
);

ALTER TABLE hcustomer ADD CONSTRAINT hcustomer_pk PRIMARY KEY ( customerid );

CREATE TABLE home (
    homeid                NUMBER(8) NOT NULL,
    purchasedate          DATE NOT NULL,
    purchasevalue         NUMBER(8) NOT NULL,
    area                  NUMBER(8) NOT NULL,
    type                  CHAR(1 CHAR) NOT NULL,
    autofirenotification  CHAR(1) NOT NULL,
    securitysystem        CHAR(1) NOT NULL,
    swimmingpool          VARCHAR2(1 CHAR),
    basement              CHAR(1) NOT NULL,
    customerid            NUMBER(8) NOT NULL
);

ALTER TABLE home ADD CONSTRAINT home_pk PRIMARY KEY ( homeid );

CREATE TABLE home_hpolicy (
    hpid           NUMBER(8) NOT NULL,
    startdate      DATE NOT NULL,
    enddate        DATE,
    premuimamount  NUMBER(8) NOT NULL,
    status         CHAR(1 CHAR) NOT NULL,
    duedate        DATE NOT NULL,
    invoiceamount  NUMBER(8) NOT NULL,
    homeid         NUMBER(8) NOT NULL,
    policyid       NUMBER(8) NOT NULL
);

ALTER TABLE home_hpolicy ADD CONSTRAINT home_hpolicy_pk PRIMARY KEY ( hpid );

CREATE TABLE hpolicy (
    policyid NUMBER(8) NOT NULL
);

ALTER TABLE hpolicy ADD CONSTRAINT hpolicy_pk PRIMARY KEY ( policyid );

CREATE TABLE invoice (
    invoiceid       NUMBER(8) NOT NULL,
    paymentduedate  DATE NOT NULL,
    amount          NUMBER(8) NOT NULL
);

ALTER TABLE invoice ADD CONSTRAINT invoice_pk PRIMARY KEY ( invoiceid );

CREATE TABLE payment (
    paymentid  NUMBER(8) NOT NULL,
    "date"     DATE NOT NULL,
    method     VARCHAR2(6 CHAR) NOT NULL,
    hpid       NUMBER(8),
    apid       NUMBER(8),
    invoiceid  NUMBER(8) NOT NULL
);

ALTER TABLE payment ADD CONSTRAINT payment_pk PRIMARY KEY ( paymentid );

CREATE TABLE policy (
    policyid  NUMBER(8) NOT NULL,
    type      CHAR(1) NOT NULL
);

ALTER TABLE policy
    ADD CONSTRAINT ch_inh_policy CHECK ( type IN (
        'A',
        'H'
    ) );

ALTER TABLE policy ADD CONSTRAINT policy_pk PRIMARY KEY ( policyid );

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

CREATE OR REPLACE TRIGGER arc_fkarc_21_hcustomer BEFORE
    INSERT OR UPDATE OF customerid, type ON hcustomer
    FOR EACH ROW
DECLARE
    d CHAR(1);
BEGIN
    SELECT
        a.type
    INTO d
    FROM
        customer a
    WHERE
            a.customerid = :new.customerid
        AND a.type = :new.type;

    IF ( d IS NULL OR d <> 'H' ) THEN
        raise_application_error(-20223, 'FK HCUSTOMER_CUSTOMER_FK in Table HCUSTOMER violates Arc constraint on Table CUSTOMER - discriminator column type doesn''t have value ''H''');
    END IF;

EXCEPTION
    WHEN no_data_found THEN
        NULL;
    WHEN OTHERS THEN
        RAISE;
END;
/

CREATE OR REPLACE TRIGGER arc_fkarc_21_acustomer BEFORE
    INSERT OR UPDATE OF customerid, type ON acustomer
    FOR EACH ROW
DECLARE
    d CHAR(1);
BEGIN
    SELECT
        a.type
    INTO d
    FROM
        customer a
    WHERE
            a.customerid = :new.customerid
        AND a.type = :new.type;

    IF ( d IS NULL OR d <> 'A' ) THEN
        raise_application_error(-20223, 'FK ACUSTOMER_CUSTOMER_FK in Table ACUSTOMER violates Arc constraint on Table CUSTOMER - discriminator column type doesn''t have value ''A''');
    END IF;

EXCEPTION
    WHEN no_data_found THEN
        NULL;
    WHEN OTHERS THEN
        RAISE;
END;
/

CREATE OR REPLACE TRIGGER arc_fkarc_22_apolicy BEFORE
    INSERT OR UPDATE OF policyid ON apolicy
    FOR EACH ROW
DECLARE
    d CHAR(1);
BEGIN
    SELECT
        a.type
    INTO d
    FROM
        policy a
    WHERE
        a.policyid = :new.policyid;

    IF ( d IS NULL OR d <> 'A' ) THEN
        raise_application_error(-20223, 'FK APOLICY_POLICY_FK in Table APOLICY violates Arc constraint on Table POLICY - discriminator column type doesn''t have value ''A''');
    END IF;

EXCEPTION
    WHEN no_data_found THEN
        NULL;
    WHEN OTHERS THEN
        RAISE;
END;
/

CREATE OR REPLACE TRIGGER arc_fkarc_22_hpolicy BEFORE
    INSERT OR UPDATE OF policyid ON hpolicy
    FOR EACH ROW
DECLARE
    d CHAR(1);
BEGIN
    SELECT
        a.type
    INTO d
    FROM
        policy a
    WHERE
        a.policyid = :new.policyid;

    IF ( d IS NULL OR d <> 'H' ) THEN
        raise_application_error(-20223, 'FK HPOLICY_POLICY_FK in Table HPOLICY violates Arc constraint on Table POLICY - discriminator column type doesn''t have value ''H''');
    END IF;

EXCEPTION
    WHEN no_data_found THEN
        NULL;
    WHEN OTHERS THEN
        RAISE;
END;
/

CREATE SEQUENCE auto_apolicy_apid_seq START WITH 1 NOCACHE ORDER;

CREATE OR REPLACE TRIGGER auto_apolicy_apid_trg BEFORE
    INSERT ON auto_apolicy
    FOR EACH ROW
    WHEN ( new.apid IS NULL )
BEGIN
    :new.apid := auto_apolicy_apid_seq.nextval;
END;
/

CREATE SEQUENCE home_hpolicy_hpid_seq START WITH 1 NOCACHE ORDER;

CREATE OR REPLACE TRIGGER home_hpolicy_hpid_trg BEFORE
    INSERT ON home_hpolicy
    FOR EACH ROW
    WHEN ( new.hpid IS NULL )
BEGIN
    :new.hpid := home_hpolicy_hpid_seq.nextval;
END;
/



-- Oracle SQL Developer Data Modeler Summary Report: 
-- 
-- CREATE TABLE                            14
-- CREATE INDEX                             0
-- ALTER TABLE                             31
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           6
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          2
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0
