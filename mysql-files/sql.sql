

SELECT * FROM t_college_info;
SELECT * FROM t_role;
SELECT * FROM t_user;
SELECT * FROM t_vali_code;

//登陆
1)
SELECT 
	u.user_id userId,
	u.user_account userAccount,
	u.user_password userPassword,
	u.user_phone userPhone,
	u.user_name userName,
	c.college_id collegeId,
	c.college_name collegeName,
	r.role_id roleId,
	r.role_name roleName
FROM t_user u, t_role r, t_college_info c
WHERE u.user_role_id=r.role_id 
AND u.user_college_id=c.college_id
AND (u.user_account='201305020443' OR u.user_phone='18428369049') 
AND u.user_role_id=r.role_id;

2)
SELECT 
	u.user_id userId,
	u.user_account userAccount,
	u.user_password userPassword,
	u.user_phone userPhone,
	u.user_name userName,
	c.college_id collegeId,
	c.college_name collegeName,
	r.role_id roleId,
	r.role_name roleName
FROM t_user u 
INNER JOIN t_role r ON u.user_role_id=r.role_id 
INNER JOIN t_college_info c ON u.user_college_id=c.college_id
WHERE (u.user_account='201305020445' OR u.user_phone='18428369045') AND u.user_role_id=r.role_id;



//验证码
1)验证手机号是否存在记录
SELECT * FROM t_vali_code WHERE vali_code_phone = '18428369049' ;

INSERT INTO t_vali_code (vali_code_phone,vali_code,vali_time) VALUES ('18428369049','4444','1524754934092');

UPDATE t_vali_code SET vali_code = '6666' ,vali_time ='1524755857704' WHERE vali_code_phone = '18428369049';

