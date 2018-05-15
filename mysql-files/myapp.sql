/*
Navicat MySQL Data Transfer

Source Server         : 毕设
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : myapp

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-05-15 18:13:53
*/

SET FOREIGN_KEY_CHECKS=0;

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
INSERT INTO `t_progress` VALUES ('4', '5', '登录,注册，密码找回模块完成！', '1526285469596', '201305020443', '21');
INSERT INTO `t_progress` VALUES ('5', '10', '主页页面布局实现完成~', '1526285499043', '201305020443', '21');

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
INSERT INTO `t_topic` VALUES ('21', '基于JSP的旅游管理系统的设计与实现', '对现有旅游查询网站的分析和比较的基础上，依循面向对象软件开发过程，设计出客户端基于Web浏览器，服务器端基于JSP和Servlet，数据源基于关系型数据库的三层框架，完成JSP页面设计、服务器端核心请求的处理以及对数据库的同步更新。该系统可以实现游客分类查询路线信息.路线预定，在线选购物品和结账。系统管理员查询、修改、删除和添加交通和线路,产品信息。系统工作稳定、操作简单、维护方便。', '201305020443', '201305020442', '1001', '');
INSERT INTO `t_topic` VALUES ('22', '网络相册管理系统的设计与实现', '使用任意可视化的编程工具完成具体的B/S模式管理系统，完整的管理系统，管理目标为相片，能够管理不同格式的图片，能够限制图片的大小，每一图片应配有说明，并可通过说明进行多条件查询，也要能进行增删操作；需要包括登录界面，并以此记录访问者的相关信息，能够通过客户端访问服务器上的相片资源。', null, '201305020442', '1001', '');
INSERT INTO `t_topic` VALUES ('23', '基于web的某市人才市场人才管理系统的设计', '为某市人才市场提供一个网络版人才管理的平台，实现管理员和用户两个权限。主要功能有：用户注册；人才基本信息录入、修改、删除、查询、统计等；招聘信息的录入、修改、删除、查询、统计等；留言板。开发平台：ASP或JSP。', null, '201305020442', '1001', '');

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
INSERT INTO `t_user` VALUES ('13', '201305020443', '孟子', '123456', '18428369049', '1001', '2', '1', '8276@qq.com');
INSERT INTO `t_user` VALUES ('14', '201305020442', '孔子', '123456', '18584808258', '1001', '1', '1', 'qiukong@163.com');

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
INSERT INTO `t_vali_code` VALUES ('9', '18428369049', '5215', '1526283367377');
INSERT INTO `t_vali_code` VALUES ('10', '18584808258', '4329', '1526283454206');
