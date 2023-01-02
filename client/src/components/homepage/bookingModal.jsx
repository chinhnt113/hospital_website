import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { AuthContext } from "../../contexts/AuthContext";

const BookingModal = () => {
  const {
    authState: { isAuthenticated, user },
  } = useContext(AuthContext);
  const [form] = Form.useForm();

  const [typeSelector, setTypeSelector] = useState("doc");
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSelectTypeModal, setOpenSelectTypeModal] = useState(false);
  const [openDoctorModal, setOpenDoctorModal] = useState(false);
  const [openTimeModal, setOpenTimeModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);

  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    setDoctorList([
      { name: "1", id: "1", major: "1" },
      { name: "2", id: "2", major: "2" },
      { name: "3", id: "3", major: "3" },
    ]);
  }, [form.getFieldValue("major")]);

  const showModal = () => {
    // if (!isAuthenticated) {
    //   setOpenLoginModal(true);
    // } else {
    setOpenSelectTypeModal(true);
    // }
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

  const onChangeMajor = (value) => {
    form.setFieldsValue({ major: value });
  };
  const onChangeDoctor = (value) => {
    form.setFieldsValue({ doctor: value });
  };

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
            console.log(value);
          }}
          onSubmit={(e) => e.preventDefault()}
          form={form}
        >
          <Form.Item name="majority" label="Chọn chuyên khoa">
            <Select defaultValue="all" onChange={onChangeMajor}>
              <Select.Option value="all">Tất cả chuyên khoa</Select.Option>
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
              value={form.getFieldValue('doctor')}
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
      <Modal
        title="Title"
        visible={openTimeModal}
        onCancel={handleCancel}
        footer={null}
      >
        <p>check</p>
      </Modal>
    </>
  );
};

export default BookingModal;
