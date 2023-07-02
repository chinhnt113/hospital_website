import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Tag, Button } from 'antd';

const AdminScheduleList = () => {
  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    fetchScheduleList();
  }, []);

  const fetchScheduleList = async () => {
    try {
      const token = sessionStorage.getItem('accessToken');

      const response = await axios.get('http://localhost:5000/api/schedule/admin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { success, schedules } = response.data;

      if (success) {
        setScheduleList(schedules);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (scheduleId, status) => {
    try {
      const token = sessionStorage.getItem('accessToken');

      const response = await axios.put(`http://localhost:5000/api/schedule/admin/${scheduleId}`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { success, schedule } = response.data;

      if (success) {
        const updatedScheduleList = scheduleList.map((schedule) => {
          if (schedule._id === scheduleId) {
            return { ...schedule, status };
          }
          return schedule;
        });

        setScheduleList(updatedScheduleList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    // Xử lý đăng xuất
    sessionStorage.removeItem('accessToken');
    // Chuyển đến trang đăng nhập
    window.location.href = '/';
  };

  const columns = [
    {
      title: 'ID Bác sĩ',
      dataIndex: 'doctorId',
      key: 'doctorId',
    },
    {
      title: 'ID Người dùng',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Ngày',
      dataIndex: 'dayOfExam',
      key: 'dayOfExam',
    },
    {
      title: 'Tháng',
      dataIndex: 'monthOfExam',
      key: 'monthOfExam',
    },
    {
      title: 'Năm',
      dataIndex: 'yearOfExam',
      key: 'yearOfExam',
    },
    {
      title: 'Khung giờ',
      dataIndex: 'timeSlot',
      key: 'timeSlot',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'open' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <div>
          {record.status === 'open' && (
            <Button onClick={() => handleStatusChange(record._id, 'closed')}>
              Đóng
            </Button>
          )}
          {record.status === 'closed' && (
            <Button onClick={() => handleStatusChange(record._id, 'open')}>
              Mở
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Danh sách lịch khám</h1>
      <Button onClick={handleLogout}>Đăng xuất</Button>
      <Table dataSource={scheduleList} columns={columns} />
    </div>
  );
};

export default AdminScheduleList;
