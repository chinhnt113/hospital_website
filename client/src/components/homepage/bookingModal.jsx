import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, Radio } from "antd";
import { AuthContext } from "../../contexts/AuthContext";
import { getAllDoctors } from "../../action/doctorActions";
import useFetch from "../../hooks/useFetch";

const BookingModal = () => {
  const {
    authState: { isAuthenticated, user },
  } = useContext(AuthContext);
  const today = new Date();
  const [form] = Form.useForm();

  const [typeSelector, setTypeSelector] = useState("doc");
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSelectTypeModal, setOpenSelectTypeModal] = useState(false);
  const [openDoctorModal, setOpenDoctorModal] = useState(false);
  const [openTimeModal, setOpenTimeModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);

  const [majority, setMajority] = useState('');

  const [doctorList, setDoctorList] = useState([]);
  
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

  const showModal = () => {
    if (isAuthenticated) {
      setOpenLoginModal(true);
    } else {
      setOpenSelectTypeModal(true);
    }
  };

  const handleOkLoginModal = () => {
    window.open("/login");
    setOpenLoginModal(false);
  };
  // const handleOkSelectTypeModal = () => {
  //   setOpenSelectTypeModal(false);
  // };
  // const handleOkDoctorModal = () => {
  //   setOpenDoctorModal(false);
  // };

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
    if (typeSelector === 'doc') {
      // api
      setOpenTimeModal(true);
    } else {
      setOpenInfoModal(true);
    }
  };

  const handleNextTime = () => {
    if (typeSelector === 'time') {
      // api
      setOpenDoctorModal(true);
    } else {
      setOpenInfoModal(true);
    }
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
            setTypeSelector("doc");
            setOpenSelectTypeModal(false);
            setOpenDoctorModal(true);
          }}
        >
          Tôi muốn chọn bác sĩ trước
        </Button>
        <Button
          onClick={() => {
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
        title="Title"
        visible={openTimeModal}
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
          <Form.Item label="Form Layout" name="layout">
            <Radio.Group value={form.getFieldValue('date')}  onChange={(e) => {console.log(e.target.value)}} optionType="button">
              <Radio.Button value={today}>{today.getDay()}</Radio.Button>
              <Radio.Button value={today + 1}>{today.getDay()}</Radio.Button>
              <Radio.Button value={today + 2}>{today.getDate()}</Radio.Button>
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
