-- migrate:up
CREATE TABLE bookings (
  id INT NOT NULL AUTO_INCREMENT,
  guest_id INT NOT NULL,
  room_id INT NOT NULL,
  guest_number INT NOT NULL,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  booking_status_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY (guest_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- migrate:down
DROP TABLE bookings;
