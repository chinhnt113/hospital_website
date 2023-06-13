import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, Radio } from "antd";
import { AuthContext } from "../../contexts/AuthContext";
import moment from "moment";
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from "../../contexts/constants";
import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";
import _isEqual from 'lodash/isEqual';
import './booking-modal.scss';

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
  const { isHeader } = props;
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
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [scheduleInfo, setScheduleInfo] = useState({});
  const [doctorName, setDoctorName] = useState('');

  const [majority, setMajority] = useState();

  const [doctorList, setDoctorList] = useState([]);
  const [unavaibledSchedule, setUnavaibledSchedule] = useState([]);

  useEffect(() => {
    getAvailableDoctors();
  }, [majority]);

  const handleChangeDateRadio = (date) => {
    if (typeSelector === 'doc') {
      const url = `${API_URL}/schedule/by-doctor/${date.dayOfExam}/${date.monthOfExam}/${date.yearOfExam}/${form.getFieldValue("doctor")}`;
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

  const getAvailableDoctors = () => {
    let url = '';
    if (typeSelector === 'time') {
      const { dayOfExam, monthOfExam, yearOfExam } = form.getFieldValue("date");
      url = `${API_URL}/schedule/by-time/${dayOfExam}/${monthOfExam}/${yearOfExam}/${form.getFieldValue("timeSlot")}/${majority || ''}`;
    } else if (typeSelector === 'doc') {
      url = `${API_URL}/schedule/by-time/0/0/0/0/${majority}`;
    } else {
      url = `${API_URL}/doctors`;
    }

    setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    axios.get(url)
      .then(response => {
        const newList = response.data?.doctors?.map((doctor) => {
          return {
            name: doctor.fullname,
            id: doctor._id,
            majority: doctor.majority,
          };
        }) || [];
        setDoctorList(newList);
      })
      .catch(error => {
        console.log(error);
      });
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

  const handleBackDoctor = () => {
    setOpenDoctorModal(false);
    if (typeSelector === "doc") {
      setOpenSelectTypeModal(true);
    } else {
      setOpenTimeModal(true);
    }
  }

  const handleBackTime = () => {
    setOpenTimeModal(false);
    if (typeSelector === "doc") {
      setOpenDoctorModal(true);
    } else {
      setOpenSelectTypeModal(true);
    }
  }

  const onChangeMajority = (value) => {
    setMajority(value);
    form.setFieldsValue({ majority: value });
    form.setFieldsValue({ doctor: undefined });
  };
  const onChangeDoctor = (value) => {
    form.setFieldsValue({ doctor: value });
  };

  const handleNextDoctor = () => {
    if (typeSelector === "doc") {
      setOpenTimeModal(true);
    } else {
      postSchedule();
      setOpenInfoModal(true);
    }
  };

  const handleNextTime = () => {
    if (typeSelector === "time") {
      getAvailableDoctors();
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
    setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    axios.post(`${API_URL}/schedule`, body)
      .then(response => {
        setScheduleInfo(response.data);
        setDoctorName(doctorList.find((doc) => doc.id === response.data.doctorId)?.name || '')
      })
      .catch(error => {
        console.log(error);
      });
    form.resetFields();
    setUnavaibledSchedule([]);
  }

  const optionDays = [
    {
      dayOfWeek: todayMoment.clone().add(1, "days").format("dddd"),
      label: todayMoment.clone().add(1, "days").format("DD/MM"),
      value: getDateForm(1) 
    },
    {
      dayOfWeek: todayMoment.clone().add(2, "days").format("dddd"),
      label: todayMoment.clone().add(2, "days").format("DD/MM"),
      value: getDateForm(2) 
    },
    {
      dayOfWeek: todayMoment.clone().add(3, "days").format("dddd"),
      label: todayMoment.clone().add(3, "days").format("DD/MM"),
      value: getDateForm(3) 
    },
    {
      dayOfWeek: todayMoment.clone().add(4, "days").format("dddd"),
      label: todayMoment.clone().add(4, "days").format("DD/MM"),
      value: getDateForm(4) 
    },
    {
      dayOfWeek: todayMoment.clone().add(5, "days").format("dddd"),
      label: todayMoment.clone().add(5, "days").format("DD/MM"),
      value: getDateForm(5) 
    },
    {
      dayOfWeek: todayMoment.clone().add(6, "days").format("dddd"),
      label: todayMoment.clone().add(6, "days").format("DD/MM"),
      value: getDateForm(6) 
    },
    {
      dayOfWeek: todayMoment.clone().add(7, "days").format("dddd"),
      label: todayMoment.clone().add(7, "days").format("DD/MM"),
      value: getDateForm(7) 
    },
  ];

  return (
    <>
      {isHeader ? (
        <button className="trans-btn" onClick={showModal}>ĐẶT LỊCH KHÁM</button>
      ) : (
        <button className="make-appoint-btn" onClick={showModal}>
          ĐĂNG KÝ KHÁM NGAY
        </button>
      )}
      {/* modal yêu cầu đăng nhập */}
      <Modal
        title="Đăng ký lịch khám"
        visible={openLoginModal}
        onOk={handleOkLoginModal}
        onCancel={handleCancel}
        cancelText="Hủy"
      >
        <div className="booking-modal login-required">
          <p>Vui lòng đăng nhập để sử dụng tính năng này</p>
          <Button
            onClick={() => {
              window.open("/login");
            }}
          >
            Đăng nhập
          </Button>
        </div>
      </Modal>
      {/* modal chọn kiểu đăng ký */}
      <Modal
        title="Đăng ký lịch khám"
        visible={openSelectTypeModal}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="booking-modal select-type-modal">
          <Button
            onClick={() => {
              if (typeSelector === 'time') {
                form.resetFields();
                setUnavaibledSchedule([]);
              }
              setTypeSelector("doc");
              setOpenSelectTypeModal(false);
              setOpenDoctorModal(true);
            }}
          >
            <i class="fa-solid fa-user-nurse fa-2xl" style={{ color: 'var(--main)' }}></i>
            <div>Tôi muốn chọn</div>
            <div>bác sĩ trước</div>
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
            <i class="fa-solid fa-calendar-days fa-2xl" style={{ color: 'var(--main)' }}></i>
            <div>Tôi muốn chọn</div>
            <div>lịch khám trước</div>
          </Button>
        </div>
      </Modal>
      {/* modal chọn bác sĩ */}
      <Modal
        title="Đăng ký lịch khám"
        visible={openDoctorModal}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="booking-modal select-doctor-modal">
          <Form
            onFinish={(value) => {
              setOpenDoctorModal(false);
              handleNextDoctor();
            }}
            onSubmit={(e) => e.preventDefault()}
            form={form}
          >
            <Form.Item name="majority" label="Chọn chuyên khoa">
              <Select
                placeholder="Chọn chuyên khoa"
                value={majority}
                onChange={onChangeMajority}
              >
                <Select.Option value="">Tất cả bác sĩ</Select.Option>
                <Select.Option value="cardio">Tim mạch</Select.Option>
                <Select.Option value="pediatrics">Nhi</Select.Option>
                <Select.Option value="obgyn">
                  Sản phụ khoa và hỗ trợ sinh sản
                </Select.Option>
                <Select.Option value="oncology">
                  Ung bướu - Xạ trị
                </Select.Option>
                <Select.Option value="general">
                  Sức khỏe tổng quát
                </Select.Option>
                <Select.Option value="gastro">
                  Tiêu hóa - Gan mật
                </Select.Option>
                <Select.Option value="ortho">Cơ xương khớp</Select.Option>
                <Select.Option value="stemCellAndGene">
                  Tế bào gốc và Công nghệ Gene
                </Select.Option>
                <Select.Option value="tchm">Y học Cổ truyền</Select.Option>
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
            <Form.Item className="form-footer">
              <Button onClick={handleBackDoctor}>
                Quay lại
              </Button>
              <Button type="primary" htmlType="submit">
                Tiếp tục
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      {/* modal chọn thời gian */}
      <Modal
        title="Chọn thời gian dự khám"
        visible={openTimeModal}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <div className="booking-modal select-timeslot-modal">
          <Form
            onFinish={(value) => {
              setOpenTimeModal(false);
              handleNextTime();
            }}
            onSubmit={(e) => e.preventDefault()}
            form={form}
          >
            <Form.Item label="Chọn ngày" className="date-select" name="date2">
              <Radio.Group
                value={form.getFieldValue("date")}
                onChange={(e) => {
                  form.setFieldsValue({date: e.target.value});
                  handleChangeDateRadio(e.target.value);
                }}
                optionType="button"
              >
                {optionDays.map((day) => (
                  <Radio.Button
                    key={day.value.dayOfExam}
                    value={day.value} 
                    className={_isEqual(day.value, form.getFieldValue("date")) ? 'ant-radio-button-wrapper-checked' : ''} 
                    style={{ color: `${day.dayOfWeek === 'thứ bảy' ? '#efbd34' : day.dayOfWeek === 'chủ nhật' ? '#ef3434' : ''}` }}
                  >
                    <div class="date">
                      {day.dayOfWeek.charAt(0).toUpperCase() + day.dayOfWeek.slice(1)}
                    </div>
                    <div className="day">
                      {day.label}
                    </div>
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Chọn khung giờ" className="timeslot-select" name="timeSlot">
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
            <Form.Item className="form-footer">
              <Button onClick={handleBackTime}>
                Quay lại
              </Button>
              <Button type="primary" htmlType="submit">
                Tiếp tục
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      {/* modal thông tin */}
      {openInfoModal && (
        <Modal
          title="Thông tin đặt lịch khám"
          visible={openInfoModal}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="booking-modal schedule-info-modal">
            <div className="info-title">BẠN ĐÃ ĐẶT LỊCH KHÁM THÀNH CÔNG</div>
            <div className="info-detail">
              <div className="info-left">
                <div className="info-doctor">Bác sĩ:</div>
                <div className="info-time">Thời gian:</div>
                <div className="info-date">Ngày:</div>
                <div className="info-status">Trạng thái:</div>
              </div>
              <div className="info-right">
                <div className="info-doctor">{doctorName}</div>
                <div className="info-time">{timeRanges.find((range) => range.value === scheduleInfo.timeSlot)?.label || ''}</div>
                <div className="info-date">{`${scheduleInfo.dayOfExam}/${scheduleInfo.monthOfExam}/${scheduleInfo.yearOfExam}`}</div>
                <div className="info-status">Chờ khám</div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default BookingModal;
