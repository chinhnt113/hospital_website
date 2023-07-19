import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import { API_URL } from '../../contexts/constants';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${API_URL}/doctors`);
        setDoctors(response.data?.doctors.map((doctor, index) => ({ ...doctor, key: index + 1 })));
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, dataIndex) => {
    clearFilters();
    setSearchText('');
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={dataIndex === 'fullname' ? 'Tìm theo tên bác sĩ' : 'Tìm theo chuyên khoa'}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 258, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 124 }}
          >
            Tìm kiếm
          </Button>
          <Button onClick={() => handleReset(clearFilters, dataIndex)} size="small" style={{ width: 124 }}>
            Đặt lại
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      width: 50,
      align: 'center',
    },
    {
      title: 'Ảnh chụp',
      dataIndex: 'avaImage',
      key: 'avaImage',
      render: (text, record) => <img src={record.avaImage} alt={record.fullname} style={{ width: '180px', height: '200px', objectFit: 'cover' }} />,
      align: 'center',
    },
    {
      title: 'Tên',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (text, record) => {
        const name = record.fullname.replace('Bác sĩ ', '').replace('Dược sĩ ', '');
        const rank = record.rank.replace(/,([^ ])/g, ', $1');
        return (
          <div>
            <div>{rank}</div>
            <div style={{ fontWeight: 600, fontSize: '16px' }}>{name}</div>
          </div>
        );
      },
      align: 'center',
      width: 300,
      ...getColumnSearchProps('fullname'),
    },
    {
      title: 'Chuyên khoa',
      dataIndex: 'majorityFull',
      align: 'center',
      key: 'majorityFull',
      width: 250,
      ...getColumnSearchProps('majorityFull'),
    },
    {
      title: 'Mô tả',
      dataIndex: 'desc',
      key: 'desc',
      align: 'center',
    },
  ];

  return (
    <ConfigProvider locale={viVN}>
      <div className="section-title">Đội ngũ bác sĩ</div>
      <div>
        <Table columns={columns} dataSource={doctors} />
      </div>
    </ConfigProvider>
  );
};

export default DoctorsList;
