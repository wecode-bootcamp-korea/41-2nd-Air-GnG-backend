-- migrate:up
ALTER TABLE wish_lists ADD UNIQUE KEY (user_id, room_id)

-- migrate:down

