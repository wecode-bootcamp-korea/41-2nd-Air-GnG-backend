-- migrate:up
CREATE TABLE room_types (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  PRIMARY KEY(id)
);

-- migrate:down
DROP TABLE room_types;
