--data dictionary queries that details all tables, columns-dataype-size-mandatory/optional, and
--attribute comments of schema objects
select table_name, column_name, data_type, data_precision, char_length, nullable, comments
from user_tab_columns natural join user_col_comments

--data dictionary queries that details all constraints
select table_name, constraint_name, constraint_type, search_condition, r_owner, r_constraint_name
from user_constraints