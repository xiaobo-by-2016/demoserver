/*
Navicat MySQL Data Transfer

Source Server         : 毕业设计
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : myapp

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-04-27 16:13:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_college_info`
-- ----------------------------
DROP TABLE IF EXISTS `t_college_info`;
CREATE TABLE `t_college_info` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '高校Id',
  `college_id` int(10) NOT NULL COMMENT '高校ID',
  `college_name` varchar(30) NOT NULL COMMENT '高校名称',
  PRIMARY KEY (`id`,`college_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_college_info
-- ----------------------------
INSERT INTO `t_college_info` VALUES ('1', '1001', '西南石油大学');
INSERT INTO `t_college_info` VALUES ('2', '1002', '四川大学');
INSERT INTO `t_college_info` VALUES ('3', '1003', '电子科技大学');
INSERT INTO `t_college_info` VALUES ('4', '1004', '西南科技大学');

-- ----------------------------
-- Table structure for `t_role`
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(10) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_role
-- ----------------------------
INSERT INTO `t_role` VALUES ('1', '教师');
INSERT INTO `t_role` VALUES ('2', '学生');

-- ----------------------------
-- Table structure for `t_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_account` bigint(15) NOT NULL COMMENT '学号/工号',
  `user_name` varchar(30) DEFAULT NULL COMMENT '用户姓名',
  `user_password` varchar(30) NOT NULL COMMENT '账号密码',
  `user_phone` bigint(11) NOT NULL COMMENT '手机号',
  `user_college_id` int(6) DEFAULT NULL COMMENT '高校id',
  `user_role_id` tinyint(1) DEFAULT NULL COMMENT '用户角色',
  PRIMARY KEY (`user_id`,`user_account`,`user_phone`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1', '201305020443', '肖波', '12345678', '18428369049', '1001', '2');
INSERT INTO `t_user` VALUES ('2', '201305020445', '邱凯', '12345678', '18428369045', '1001', '2');

-- ----------------------------
-- Table structure for `t_vali_code`
-- ----------------------------
DROP TABLE IF EXISTS `t_vali_code`;
CREATE TABLE `t_vali_code` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `vali_code_phone` bigint(11) NOT NULL COMMENT '手机号',
  `vali_code` int(4) NOT NULL COMMENT '验证码',
  `vali_time` varchar(50) NOT NULL,
  PRIMARY KEY (`id`,`vali_code_phone`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_vali_code
-- ----------------------------
INSERT INTO `t_vali_code` VALUES ('1', '18428369049', '6666', '1524755857704');
