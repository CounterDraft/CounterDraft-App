#maunal create loging table;
CREATE TABLE IF NOT EXISTS server_log (
    ts timestamp default current_timestamp,
    level varchar,
    msg varchar,
    meta json
);
