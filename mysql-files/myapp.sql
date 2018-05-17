/*
Navicat MySQL Data Transfer

Source Server         : 毕设
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : myapp

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-05-17 22:18:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_ann
-- ----------------------------
DROP TABLE IF EXISTS `t_ann`;
CREATE TABLE `t_ann` (
  `ann_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '公告id',
  `ann_title` varchar(255) NOT NULL DEFAULT '' COMMENT '公告题目',
  `ann_content` varchar(255) NOT NULL DEFAULT '' COMMENT '公告内容',
  `ann_time` varchar(255) NOT NULL DEFAULT '' COMMENT '公告时间',
  `ann_tecaher_account` bigint(20) NOT NULL,
  PRIMARY KEY (`ann_id`,`ann_tecaher_account`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_ann
-- ----------------------------

-- ----------------------------
-- Table structure for t_college_info
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
-- Table structure for t_progress
-- ----------------------------
DROP TABLE IF EXISTS `t_progress`;
CREATE TABLE `t_progress` (
  `progress_id` int(20) NOT NULL AUTO_INCREMENT COMMENT '进度id',
  `progress` bigint(20) NOT NULL COMMENT '进度',
  `progress_content` varchar(255) NOT NULL COMMENT '进度内容',
  `progress_time` varchar(50) NOT NULL COMMENT '进度时间',
  `progress_account` bigint(30) NOT NULL COMMENT '关联的学生账号',
  `progress_topic_id` int(20) NOT NULL COMMENT '关联的题目id',
  PRIMARY KEY (`progress_id`,`progress_topic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_progress
-- ----------------------------

-- ----------------------------
-- Table structure for t_role
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
-- Table structure for t_topic
-- ----------------------------
DROP TABLE IF EXISTS `t_topic`;
CREATE TABLE `t_topic` (
  `topic_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '题目id',
  `topic_title` text NOT NULL,
  `topic_content` text NOT NULL,
  `student_account` bigint(15) DEFAULT NULL,
  `teacher_account` bigint(15) NOT NULL,
  `topic_college_id` int(10) NOT NULL,
  `topic_sms_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`topic_id`,`topic_college_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_topic
-- ----------------------------

-- ----------------------------
-- Table structure for t_user
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
  `sex` int(1) DEFAULT NULL COMMENT '性别 1男  2女',
  `email` varchar(30) DEFAULT NULL COMMENT '邮箱',
  PRIMARY KEY (`user_id`,`user_account`,`user_phone`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------

-- ----------------------------
-- Table structure for t_vali_code
-- ----------------------------
DROP TABLE IF EXISTS `t_vali_code`;
CREATE TABLE `t_vali_code` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `vali_code_phone` bigint(11) NOT NULL COMMENT '手机号',
  `vali_code` int(4) NOT NULL COMMENT '验证码',
  `vali_time` varchar(50) NOT NULL,
  PRIMARY KEY (`id`,`vali_code_phone`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_vali_code
-- ----------------------------
