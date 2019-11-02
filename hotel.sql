SET NAMES UTF8;
DROP DATABASE IF EXISTS hotel;
CREATE DATABASE hotel CHARSET=UTF8;
use hotel;

CREATE TABLE ht_user(
  hid INT PRIMARY KEY AUTO_INCREMENT,
  hname VARCHAR(32),
  hpwd VARCHAR(32),
  email VARCHAR(64),
  phone VARCHAR(16),
  sex VARCHAR(2)
);

INSERT INTO ht_user VALUES
(NULL, 'dingding', '123456', 'ding@qq.com', '13501234567', '1'),
(NULL, 'dangdang', '123456', 'dang@qq.com', '13501234568', '1'),
(NULL, 'doudou', '123456', 'dou@qq.com', '13501234569', '1'),
(NULL, 'yaya', '123456', 'ya@qq.com', '13501234560', '0');

