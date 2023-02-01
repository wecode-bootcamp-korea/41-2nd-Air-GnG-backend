-- migrate:up
CREATE TABLE room_images (
  id INT NOT NULL AUTO_INCREMENT,
  image_url VARCHAR(2000) NOT NULL,
  room_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- migrate:down
DROP TABLE room_images;
