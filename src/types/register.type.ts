// {
//     "message": "success",
//     "user": {
//         "name": "Ahmed Abd Al-Muti",
//         "email": "ahmedmuttisi4012@gmail.com",
//         "role": "user"
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Yjc1ODQyMTcxMzlhZWEyYjA2NGRjYSIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzczNjIzMzYzLCJleHAiOjE3ODEzOTkzNjN9.BWU6b_CKuTmp0EOqQihEBW8UWMfLfXDFlVIK4aa9pvc"
// }

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
  terms?: boolean;
};

export type RegisterResponse = {
  message: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
};
