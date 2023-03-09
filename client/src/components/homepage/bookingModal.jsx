import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, Radio } from "antd";
import { AuthContext } from "../../contexts/AuthContext";
import { getAllDoctors } from "../../action/doctorActions";
import useFetch from "../../hooks/useFetch";
import moment from "moment";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../contexts/constants";
import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";
import _isEqual from 'lodash/isEqual';

const getDateForm = (i) => {
  const todayMoment = moment();

  return {
    dayOfExam: todayMoment.clone().add(i, "days").date(),
    monthOfExam: todayMoment.clone().add(i, "days").month() + 1,
    yearOfExam: todayMoment.clone().add(i, "days").year(),
  }
};

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
  { value: 24, label: "17:40 - 18:00" }
];

function BookingModal(props) {
  const {
    authState: { isAuthenticated, user },
  } = useContext(AuthContext);
  const todayMoment = moment();
  const [form] = Form.useForm();

  const [typeSelector, setTypeSelector] = useState("");
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSelectTypeModal, setOpenSelectTypeModal] = useState(false);
  const [openDoctorModal, setOpenDoctorModal] = useState(false);
  const [openTimeModal, setOpenTimeModal] = useState(false);
  // const [openInfoModal, setOpenInfoModal] = useState(false);

  const [majority, setMajority] = useState("");

  const [doctorList, setDoctorList] = useState([]);
  const [unavaibledSchedule, setUnavaibledSchedule] = useState([]);

  const { data, loading, error } = useFetch(`/doctors/${majority}`);

  useEffect(() => {
    const newList =
      data?.doctors?.map((doctor) => {
        return {
          name: doctor.fullname,
          id: doctor._id,
          majority: doctor.majority,
        };
      }) || [];
    setDoctorList(newList);
  }, [data]);

  const handleChangeDateRadio = ({target: {value}}) => {
    form.setFieldsValue({date: value});
    if (typeSelector === 'doc') {
      const url = `${apiUrl}/schedule/by-doctor/${value.dayOfExam}/${value.monthOfExam}/${value.yearOfExam}/${form.getFieldValue("doctor")}`;
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
      axios.get(url)
      .then(response => {
        setUnavaibledSchedule(response.data.timeslots);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  const showModal = () => {
    if (!isAuthenticated) {
      setOpenLoginModal(true);
    } else {
      setOpenSelectTypeModal(true);
    }
  };

  const handleOkLoginModal = () => {
    window.open("/login");
    setOpenLoginModal(false);
  };
  const handleOkSelectTypeModal = () => {
    setOpenSelectTypeModal(false);
  };
  const handleOkDoctorModal = () => {
    setOpenDoctorModal(false);
  };

  const handleCancel = () => {
    setOpenLoginModal(false);
    setOpenSelectTypeModal(false);
    setOpenDoctorModal(false);
    setOpenTimeModal(false);
    setOpenInfoModal(false);
  };

  const onChangeMajority = (value) => {
    setMajority(value);
    form.setFieldsValue({ majority: value });
  };
  const onChangeDoctor = (value) => {
    form.setFieldsValue({ doctor: value });
  };

  const handleNextDoctor = () => {
    if (typeSelector === "doc") {
      // api
      setOpenTimeModal(true);
    } else {
      postSchedule();
      setOpenInfoModal(true);
    }
  };

  const handleNextTime = () => {
    if (typeSelector === "time") {
      // api
      setOpenDoctorModal(true);
    } else {
      postSchedule();
      setOpenInfoModal(true);
    }
  };

  const postSchedule = () => {
    const body = {
      doctorId: form.getFieldValue("doctor"),
      userId: user._id,
      dayOfExam: form.getFieldValue("date").dayOfExam,
      monthOfExam: form.getFieldValue("date").monthOfExam,
      yearOfExam: form.getFieldValue("date").yearOfExam,
      timeSlot: form.getFieldValue("timeSlot"),
    }
    console.log(body);
    setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    axios.post(`${apiUrl}/schedule`, body)
      .then(response => {
        console.log(response.json());
      })
      .catch(error => {
        console.log(error);
      });
  }

  const checkSelectedDate = (i) => {
    const selectedDate = form.getFieldValue("date");
    return _isEqual(selectedDate, getDateForm(i));
  }

  const radioButtons = [];
  for (let i = 1; i <= 7; i++) {
    const date = todayMoment.clone().add(i, "days").format("L");
    const value = getDateForm(i);
    const className = checkSelectedDate(i) ? 'ant-radio-button-wrapper-checked' : '';
    radioButtons.push(
      <Radio.Button key={i} value={value} className={className}>
        {date}
      </Radio.Button>
    );
  }

  return (
    <>
      <button className="make-appoint-btn" onClick={showModal}>
        ĐĂNG KÝ KHÁM NGAY
      </button>
      {/* modal yêu cầu đăng nhập */}
      <Modal
        title="Đăng ký lịch khám"
        visible={openLoginModal}
        onOk={handleOkLoginModal}
        onCancel={handleCancel}
        cancelText="Hủy"
      >
        <p>Vui lòng đăng nhập để sử dụng tính năng này</p>
        <Button
          onClick={() => {
            window.open("/login");
          }}
        >
          Đăng nhập
        </Button>
      </Modal>
      {/* modal chọn kiểu đăng ký */}
      <Modal
        title="Đăng ký lịch khám"
        visible={openSelectTypeModal}
        onCancel={handleCancel}
        footer={null}
      >
        <Button
          onClick={() => {
            if (typeSelector === 'time') {
              form.resetFields();
            }
            setTypeSelector("doc");
            setOpenSelectTypeModal(false);
            setOpenDoctorModal(true);
          }}
        >
          Tôi muốn chọn bác sĩ trước
        </Button>
        <Button
          onClick={() => {
            if (typeSelector === 'doc') {
              setUnavaibledSchedule([]);
              form.resetFields();
            }
            setTypeSelector("time");
            setOpenSelectTypeModal(false);
            setOpenTimeModal(true);
          }}
        >
          Tôi muốn chọn lịch khám trước
        </Button>
      </Modal>
      {/* modal chọn bác sĩ */}
      <Modal
        title="Đăng ký lịch khám"
        visible={openDoctorModal}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onFinish={(value) => {
            setOpenDoctorModal(false);
            handleNextDoctor();
          }}
          onSubmit={(e) => e.preventDefault()}
          form={form}
        >
          <Form.Item form={form} name="majority" label="Chọn chuyên khoa">
            <Select
              placeholder="Chọn chuyên khoa"
              value={majority}
              onChange={onChangeMajority}
            >
              <Select.Option value="">Tất cả bác sĩ</Select.Option>
              <Select.Option value="gp">Đa khoa</Select.Option>
              <Select.Option value="cardiology">Tim mạch</Select.Option>
              <Select.Option value="pediatrics">Nhi</Select.Option>
              <Select.Option value="obstetrics">
                Sản phụ khoa và hỗ trợ sinh sản
              </Select.Option>
              <Select.Option value="oncologyRadiotherapy">
                Ung bướu - Xạ trị
              </Select.Option>
              <Select.Option value="generalHealth">
                Sức khỏe tổng quát
              </Select.Option>
              <Select.Option value="gastroenterology">
                Tiêu hóa - Gan mật
              </Select.Option>
              <Select.Option value="rheumatology">Cơ xương khớp</Select.Option>
              <Select.Option value="stemCellAndGene">
                Tế bào gốc và Công nghệ Gene
              </Select.Option>
              <Select.Option value="traditional">Y học Cổ truyền</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="doctor" label="Chọn bác sĩ">
            <Select
              placeholder="Chọn bác sĩ"
              value={form.getFieldValue("doctor")}
              onChange={onChangeDoctor}
              options={doctorList.map((doctor) => {
                return {
                  value: doctor.id,
                  label: doctor.name,
                };
              })}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tiếp tục
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* modal chọn thời gian */}
      <Modal
        title="Chọn thời gian dự khám"
        visible={openTimeModal}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onFinish={(value) => {
            setOpenTimeModal(false);
            handleNextTime();
          }}
          onSubmit={(e) => e.preventDefault()}
          form={form}
        >
          <Form.Item label="Chọn ngày" name="date">
            <Radio.Group
              value={form.getFieldValue("date")}
              onChange={handleChangeDateRadio}
              optionType="button"
            >
              {radioButtons}
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Chọn khung giờ" name="timeSlot">
            <Radio.Group
              value={form.getFieldValue("timeSlot")}
              onChange={(e) => {
                form.setFieldsValue({timeSlot: e.target.value});
              }}
              optionType="button"
            >
              {timeRanges.map((range) => (
                <Radio.Button key={range.value} value={range.value} disabled={unavaibledSchedule.includes(range.value)}>
                  {range.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tiếp tục
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BookingModal;
