/*
Navicat MySQL Data Transfer

Source Server         : 毕业设计
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : myapp

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-04-23 23:51:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `userAccount` bigint(15) NOT NULL COMMENT '学号/工号',
  `userName` varchar(30) DEFAULT NULL COMMENT '用户姓名',
  `userPassword` varchar(30) DEFAULT NULL COMMENT '账号密码',
  `userPhone` bigint(11) NOT NULL COMMENT '手机号',
  `collegeId` int(6) DEFAULT NULL COMMENT '高校id',
  `role` tinyint(1) DEFAULT NULL COMMENT '用户角色',
  PRIMARY KEY (`id`,`userAccount`,`userPhone`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '201305020443', '肖波', '12345678', '18428369049', '1', '2');
