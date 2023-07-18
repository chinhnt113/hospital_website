import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { API_URL } from './constant';

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/admin/login`, values); // Đường dẫn API cần được chỉnh sửa tùy thuộc vào BE của bạn
      const data = response.data;
      if (data.success) {
        sessionStorage.setItem('accessToken', data.accessToken);
        message.success('Đăng nhập thành công');
        window.location.href = '/admin/schedule';
      } else {
        message.error('Tên đăng nhập hoặc mật khẩu không chính xác');
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Đăng nhập quản lý</h1>
      <Form onFinish={handleLogin}>
        <Form.Item
          name="adminname"
          label="Tên đăng nhập"
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminLogin;
