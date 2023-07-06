import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment";
import { Table, Tag, Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons"
import Highlighter from 'react-highlight-words';

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
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

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

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "ascend" ? "descend" : "ascend");
    } else {
      setSortField(field);
      setSortOrder("ascend");
    }
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Đặt lại
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Lọc
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      if (dataIndex === "doctorname") {
        return record.doctorId.doctorname.toString().toLowerCase().includes(value.toLowerCase())
      }
      if (dataIndex === "username") {
        return record.userId.username.toString().toLowerCase().includes(value.toLowerCase())
      }
      return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const sortedScheduleList = scheduleList.sort((a, b) => {
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
      render: (text, record) =>
        searchedColumn === "doctorId" ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={record.doctorId.doctorname ? record.doctorId.doctorname.toString() : ''}
          />
        ) : (
          <span
            className="doctor-name"
            onClick={() =>
              handleDoctorClick(record.doctorId._id, record.doctorId.doctorname)
            }
          >
            {record.doctorId.doctorname}
          </span>
        ),
      ...getColumnSearchProps('doctorname'),
    },
    {
      title: "Người dùng",
      dataIndex: "userId",
      key: "userId",
      onFilter: (value, record) => record.userId.username.includes(value),
      render: (text, record) =>
        searchedColumn === "userId" ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={record.userId.username ? record.userId.username.toString() : ''}
          />
        ) : (
          <span>
            {record.userId.username}
          </span>
        ),
      ...getColumnSearchProps('username'),
    },
    {
      title: <div onClick={() => handleSort("dateOfExam")}>Ngày khám</div>,
      dataIndex: "dateOfExam",
      key: "dateOfExam",
      sorter: true,
      sortOrder: sortField === "dateOfExam" && sortOrder,
      showSorterTooltip: false,
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
      filters: [
        {
          text: 'Chờ xác nhận',
          value: 'pending',
        },
        {
          text: 'Đã xác nhận',
          value: 'confirmed',
        },
        {
          text: 'Đã hủy',
          value: 'closed',
        },
      ],
      onFilter: (value, record) => record.status === value,
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
                Hủy lịch
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
      <Table
        dataSource={sortedScheduleList}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default AdminScheduleList;
