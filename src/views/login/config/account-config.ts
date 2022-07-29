// 编写规则
export const rules = {
  name: [
    {
      required: true,
      message: '用户名是必传的',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{6,8}$/,
      message: '必须是6-8个字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必传的',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{3,}$/,
      message: '密码必须是3位以上的字母或数字',
      trigger: 'blur'
    }
  ]
}
