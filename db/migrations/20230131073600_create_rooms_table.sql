-- migrate:up
CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  address VARCHAR(100) NOT NULL,
  maximum_people INT NOT NULL,
  bedroom_count INT NOT NULL,
  bed_count INT NOT NULL,
  bathroom_count INT NOT NULL,
  theme_id INT NOT NULL,
  region_id INT NOT NULL,
  host_id INT NOT NULL,
  room_type_id INT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY (theme_id) REFERENCES themes(id),
  FOREIGN KEY (host_id) REFERENCES hosts(id),
  FOREIGN KEY (room_type_id) REFERENCES room_types(id),
  FOREIGN KEY (region_id) REFERENCES regions(id)
);

-- migrate:down
DROP TABLE rooms;
