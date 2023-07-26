import { Button, Form, Input, Table, Tag, message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { API_URL } from '../contexts/constants';
import moment from 'moment';

const timeRanges = [
  { value: 1, label: '08:00 - 08:20' },
  { value: 2, label: '08:20 - 08:40' },
  { value: 3, label: '08:40 - 09:00' },
  { value: 4, label: '09:00 - 09:20' },
  { value: 5, label: '09:20 - 09:40' },
  { value: 6, label: '09:40 - 10:00' },
  { value: 7, label: '10:00 - 10:20' },
  { value: 8, label: '10:20 - 10:40' },
  { value: 9, label: '10:40 - 11:00' },
  { value: 10, label: '11:00 - 11:20' },
  { value: 11, label: '11:20 - 11:40' },
  { value: 12, label: '11:40 - 12:00' },
  { value: 13, label: '14:00 - 14:20' },
  { value: 14, label: '14:20 - 14:40' },
  { value: 15, label: '14:40 - 15:00' },
  { value: 16, label: '15:00 - 15:20' },
  { value: 17, label: '15:20 - 15:40' },
  { value: 18, label: '15:40 - 16:00' },
  { value: 19, label: '16:00 - 16:20' },
  { value: 20, label: '16:20 - 16:40' },
  { value: 21, label: '16:40 - 17:00' },
  { value: 22, label: '17:00 - 17:20' },
  { value: 23, label: '17:20 - 17:40' },
  { value: 24, label: '17:40 - 18:00' },
];

const Account = () => {
  const {
    authState: { isAuthenticated, user },
    logoutUser,
  } = useContext(AuthContext);

  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(`${API_URL}/schedule/my-schedule`, {
          params: { userId: user._id },
        });
        setSchedules(response.data.schedules);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSchedules();
  }, [user._id]);

  const logout = () => logoutUser();

  const handleUpdateEmail = async () => {
    try {
      await axios.put(`${API_URL}/auth/`, { email });
      message.success('Cập nhật email thành công');
    } catch (error) {
      console.error(error);
      message.error('Có lỗi xảy ra');
    }
  };

  const handleUpdatePassword = async () => {
    if (retypePassword !== password) {
      message.error("Nhập lại mật khẩu chưa đúng");
      return;
    } else if (!oldPassword) {
      message.error("Vui lòng nhập mật khẩu hiện tại");
      return;
    }
    try {
      await axios.put(`${API_URL}/auth/`, { password, oldPassword });
      message.success('Cập nhật mật khẩu thành công');
    } catch (error) {
      console.error(error);
      message.error('Có lỗi xảy ra');
    }
  };

  const handleCancelSchedule = async (scheduleId) => {
    try {
      await axios.put(`${API_URL}/schedule/${scheduleId}`, { status: 'closed' });
      message.success('Hủy lịch khám thành công');
      setSchedules(schedules.map(schedule => schedule._id === scheduleId ? { ...schedule, status: 'closed' } : schedule));
    } catch (error) {
      console.error(error);
      message.error('Có lỗi xảy ra');
    }
  };

  const columns = [
    { title: 'Ngày', dataIndex: 'date', key: 'date', render: (text, record) => moment({ day: record.dayOfExam, month: record.monthOfExam - 1, year: record.yearOfExam }).format('DD/MM/YYYY') },
    { title: 'Khung giờ', dataIndex: 'timeSlot', key: 'timeSlot', render: (timeSlot) => timeRanges.find(range => range.value === timeSlot)?.label || '-' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (status) => {
      let color = 'green';
      if (status === 'pending') {
        color = 'blue';
      } else if (status === 'closed') {
        color = 'red';
      } else if (status === 'expired') {
        color = 'orange';
      }
      return (
        <Tag color={color}>
          {status === 'pending' && 'Chờ xác nhận'}
          {status === 'confirmed' && 'Đã xác nhận'}
          {status === 'closed' && 'Đã hủy'}
          {status === 'expired' && 'Quá ngày'}
        </Tag>
      );
    }},
    { title: 'Hành động', key: 'action', render: (_, record) => record.status !== 'closed' && <Button onClick={() => handleCancelSchedule(record._id)}>Hủy lịch</Button> },
  ];

  return (
    <div>
      <section>
        <div>
          <h2>Xin chào, {user.username}</h2>
          <Button onClick={logout}>Đăng xuất</Button>
          <p>Họ tên: {user.fullname}</p>
          <p>Ngày sinh: {moment(user.dob).format('DD/MM/YYYY')}</p>
          <div>
            <Form>
              <Form.Item label="Email">
                <Input value={email} onChange={e => setEmail(e.target.value)} />
                <Button onClick={handleUpdateEmail}>Update Email</Button>
              </Form.Item>
              <Form.Item label="Nhập mật khẩu mới">
                <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Item>
              <Form.Item label="Nhập lại mật khẩu mới">
                <Input.Password value={retypePassword} onChange={e => setRetypePassword(e.target.value)} />
              </Form.Item>
              <Form.Item label="Nhập mật khẩu hiện tại">
                <Input.Password value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                <Button onClick={handleUpdatePassword}>Cập nhật mật khẩu</Button>
              </Form.Item>
            </Form>
          </div>

          <h2>Lịch khám của tôi</h2>
          <Table dataSource={schedules} columns={columns} rowKey="_id" />
        </div>
      </section>
    </div>
  );
};

export default Account;
