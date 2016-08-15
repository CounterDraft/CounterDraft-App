CREATE DATABASE Counter;

create table server_log (
    ts timestamp default current_timestamp,
    level varchar,
    msg varchar,
    meta json
);
