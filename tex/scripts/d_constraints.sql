--customer
alter table customer add constraints c_customer_id check (customerid >= 10000000);
alter table customer add constraints c_customer_gender check (gender in ('M', 'F'));
alter table customer add constraints c_customer_maritalstatus check (maritalstatus in ('M', 'S', 'W'));

--driver
alter table driver add constraints c_driver_num check (licenseNum >= 10000000);

--home_hpolicy
alter table home_hpolicy add constraints c_home_hpolicy_hpID check (hpID >= 10000000);
alter table home_hpolicy add constraints c_home_hpolicy_status check (status in ('C', 'P'));

--home
alter table home add constraints c_home_id check (homeid >= 10000000);
alter table home add constraints c_home_type check (type in ('S', 'M', 'C','T'));
alter table home add constraints c_home_autoFireNotification check (autoFireNotification in ('1', '0'));
alter table home add constraints c_home_securitySystem check (securitySystem in ('1', '0'));
alter table home add constraints c_home_swimmingpool check(swimmingpool in ('U', 'O', 'I', 'M'));
alter table home add constraints c_home_basement check (basement in ('1', '0'));

--payment
alter table payment add constraints c_payment_id check (paymentid >= 10000000);
alter table payment add constraints c_payment_method check (method in ('PayPal', 'Credit', 'Debit','Check'));

--auto_apolicy
alter table auto_apolicy add constraints c_auto_apolicy_apID check (apID >= 10000000);
alter table auto_apolicy add constraints c_auto_apolicy_status check (status in ('C', 'P'));

--auto
alter table auto add constraints c_auto_vin check (vin >= 10000000);
alter table auto add constraints c_auto_status check (status in ('L', 'F', 'O'));

--policy
alter table policy add constraints c_policy_policyid check (policyid >= 10000000);

--invoice
alter table invoice add constraints c_invoice_id check (invoiceid >= 10000000);

