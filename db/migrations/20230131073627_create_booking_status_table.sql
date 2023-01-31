-- migrate:up
CREATE TABLE booking_status (
  id INT NOT NULL AUTO_INCREMENT,
  status VARCHAR(50) NOT NULL,
  PRIMARY KEY(id)
);

-- migrate:down
DROP TABLE booking_status;
