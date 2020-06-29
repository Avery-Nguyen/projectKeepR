DROP TABLE IF EXISTS websites CASCADE;
CREATE TABLE websites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
  url VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL
);
