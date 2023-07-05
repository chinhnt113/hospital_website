import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Table, Tag, Button, Select } from "antd";
import { Option } from "antd/es/mentions";

const timeRanges = [
  { value: 1, label: "08:00 - 08:20" },
  { value: 2, label: "08:20 - 08:40" },
  { value: 3, label: "08:40 - 09:00" },
  { value: 4, label: "09:00 - 09:20" },
  { value: 5, label: "09:20 - 09:40" },
  { value: 6, label: "09:40 - 10:00" },
  { value: 7, label: "10:00 - 10:20" },
  { value: 8, label: "10:20 - 10:40" },
  { value: 9, label: "10:40 - 11:00" },
  { value: 10, label: "11:00 - 11:20" },
  { value: 11, label: "11:20 - 11:40" },
  { value: 12, label: "11:40 - 12:00" },
  { value: 13, label: "14:00 - 14:20" },
  { value: 14, label: "14:20 - 14:40" },
  { value: 15, label: "14:40 - 15:00" },
  { value: 16, label: "15:00 - 15:20" },
  { value: 17, label: "15:20 - 15:40" },
  { value: 18, label: "15:40 - 16:00" },
  { value: 19, label: "16:00 - 16:20" },
  { value: 20, label: "16:20 - 16:40" },
  { value: 21, label: "16:40 - 17:00" },
  { value: 22, label: "17:00 - 17:20" },
  { value: 23, label: "17:20 - 17:40" },
  { value: 24, label: "17:40 - 18:00" },
];

const AdminScheduleList = () => {
  const [scheduleList, setScheduleList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [filterDoctorName, setFilterDoctorName] = useState("");
  const [filterUserName, setFilterUserName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetchScheduleList();
  }, []);

  const fetchScheduleList = async (doctorId = null) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      let url = "http://localhost:5000/api/schedule/admin";

      if (doctorId) {
        url = `http://localhost:5000/api/schedule/admin/by-doctor/${doctorId}`;
      }

      const response = await axios.get(url, {
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

  const handleDoctorClick = (doctorId, doctorName) => {
    setSelectedDoctor(doctorName);
    fetchScheduleList(doctorId);
  };

  const handleStatusChange = async (scheduleId, status) => {
    try {
      const token = sessionStorage.getItem("accessToken");

      const response = await axios.put(
        `http://localhost:5000/api/schedule/admin/${scheduleId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success, schedule } = response.data;

      if (success) {
        // ...
        const updatedScheduleList = scheduleList.map((schedule) => {
          if (schedule._id === scheduleId) {
            return { ...schedule, status, expired: scheduleExpired(schedule) };
          }
          return schedule;
        });

        setScheduleList(updatedScheduleList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    setSelectedDoctor(null);
    fetchScheduleList();
  };

  const handleFilterDoctorName = (value) => {
    setFilterDoctorName(value);
  };

  const handleFilterUserName = (value) => {
    setFilterUserName(value);
  };

  const handleFilterStatus = (value) => {
    setFilterStatus(value);
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "ascend" ? "descend" : "ascend");
    } else {
      setSortField(field);
      setSortOrder("ascend");
    }
  };

  const filteredScheduleList = scheduleList.filter((schedule) => {
    const doctorNameMatch =
      !filterDoctorName ||
      schedule.doctorId.doctorname.toLowerCase().includes(filterDoctorName.toLowerCase());
    const userNameMatch =
      !filterUserName ||
      (schedule.userId && schedule.userId.username.toLowerCase().includes(filterUserName.toLowerCase()));
    const statusMatch = !filterStatus || schedule.status === filterStatus;
  
    return doctorNameMatch && userNameMatch && statusMatch;
  });

  const sortedScheduleList = filteredScheduleList.sort((a, b) => {
    if (sortField === "doctorId") {
      const nameA = a.doctorId.doctorname.toUpperCase();
      const nameB = b.doctorId.doctorname.toUpperCase();
      if (nameA < nameB) {
        return sortOrder === "ascend" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrder === "ascend" ? 1 : -1;
      }
      return 0;
    }
  
    if (sortField === "userId") {
      const nameA = a.userId && a.userId.username.toUpperCase();
      const nameB = b.userId && b.userId.username.toUpperCase();
      if (nameA < nameB) {
        return sortOrder === "ascend" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrder === "ascend" ? 1 : -1;
      }
      return 0;
    }
  
    if (sortField === "dateOfExam") {
      const dateA = moment({
        day: a.dayOfExam,
        month: a.monthOfExam - 1,
        year: a.yearOfExam,
      });
      const dateB = moment({
        day: b.dayOfExam,
        month: b.monthOfExam - 1,
        year: b.yearOfExam,
      });
  
      if (dateA.isBefore(dateB)) {
        return sortOrder === "ascend" ? -1 : 1;
      }
      if (dateA.isAfter(dateB)) {
        return sortOrder === "ascend" ? 1 : -1;
      }
      return 0;
    }
  
    return 0;
  });

  const scheduleExpired = (schedule) => {
    const { dayOfExam, monthOfExam, yearOfExam } = schedule;
    const currentDate = moment();
    const scheduleDate = moment({
      day: dayOfExam,
      month: monthOfExam - 1,
      year: yearOfExam,
    });

    return currentDate.isAfter(scheduleDate);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  const columns = [
    {
      title: "Bác sĩ",
      dataIndex: "doctorId.doctorname",
      key: "doctorId",
      render: (text, record) => (
        <span
          className="doctor-name"
          onClick={() =>
            handleDoctorClick(record.doctorId._id, record.doctorId.doctorname)
          }
        >
          {record.doctorId.doctorname}
        </span>
      ),
    },
    {
      title: "Người dùng",
      dataIndex: "userId",
      key: "userId",
      render: (user) => user && user.username,
    },
    {
      title: "Ngày khám",
      dataIndex: "dateOfExam",
      key: "dateOfExam",
      sorter: true,
      sortOrder: sortField === "dateOfExam" && sortOrder,
      render: (text, record) => {
        const { dayOfExam, monthOfExam, yearOfExam } = record;
        const date = moment({
          day: dayOfExam,
          month: monthOfExam - 1, // Trừ đi 1 vì tháng trong moment.js bắt đầu từ 0 (0 - 11)
          year: yearOfExam,
        });
        return date.format("DD/MM/YYYY");
      },
    },
    {
      title: "Khung giờ",
      dataIndex: "timeSlot",
      key: "timeSlot",
      render: (timeSlot) => {
        const selectedTimeRange = timeRanges.find(
          (range) => range.value === timeSlot
        );
        return selectedTimeRange ? selectedTimeRange.label : "-";
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        let color = "green";
        if (status === "pending") {
          color = "blue";
        } else if (status === "closed") {
          color = "red";
        } else if (record.expired) {
          color = "orange";
        }

        return (
          <Tag color={color}>
            {status === "pending" && "Chờ xác nhận"}
            {status === "confirmed" && "Đã xác nhận"}
            {status === "closed" && "Đã hủy"}
          </Tag>
        );
      },
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => {
        const { status, _id } = record;

        if (status === "pending") {
          return (
            <div>
              <Button onClick={() => handleStatusChange(_id, "confirmed")}>
                Xác nhận lịch
              </Button>
              <Button onClick={() => handleStatusChange(_id, "closed")}>
                Hủy lịch
              </Button>
            </div>
          );
        } else if (record.status === "confirmed") {
          return (
            <div>
              <Button onClick={() => handleStatusChange(record._id, "closed")}>
                Hủy
              </Button>
            </div>
          );
        } else {
          return null;
        }
      },
    },
  ];

  return (
    <div>
      {selectedDoctor ? (
        <div>
          <h2>Lịch khám của bác sĩ {selectedDoctor}</h2>
          <Button onClick={handleBack}>Quay lại</Button>
        </div>
      ) : (
        <div>
          <h1>Danh sách lịch khám</h1>
          <Button onClick={handleLogout}>Đăng xuất</Button>
        </div>
      )}
      <div className="filters">
        <Select
          placeholder="Lọc theo bác sĩ"
          value={filterDoctorName}
          onChange={handleFilterDoctorName}
        >
          <Option value="">Tất cả</Option>
          {/* Thêm tùy chọn cho các bác sĩ */}
        </Select>
        <Select
          placeholder="Lọc theo người dùng"
          value={filterUserName}
          onChange={handleFilterUserName}
        >
          <Option value="">Tất cả</Option>
          {/* Thêm tùy chọn cho các người dùng */}
        </Select>
        <Select
          placeholder="Lọc theo trạng thái"
          value={filterStatus}
          onChange={handleFilterStatus}
        >
          <Option value="">Tất cả</Option>
          <Option value="pending">Chờ xác nhận</Option>
          <Option value="confirmed">Đã xác nhận</Option>
          <Option value="closed">Đã hủy</Option>
        </Select>
      </div>
      <Table
        dataSource={sortedScheduleList}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default AdminScheduleList;
