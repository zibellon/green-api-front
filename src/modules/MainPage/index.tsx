import { Button, Flex, Form, Input, Typography, FormProps } from 'antd';
import style from './style.module.scss';
import { useState } from 'react';
import { GreenAPI } from '../../api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FileParams, MessageParams } from '../../api/classes';

type MessageFieldType = {
  phone?: string;
  message?: string;
};

type FileFieldType = {
  phone?: string;
  fileUrl?: string;
};

export const MainPage = () => {
  const [IdInstance, setIdInstance] = useState('');
  const [ApiTokenInstance, setApiTokenInstance] = useState('');

  const [result, setResult] = useState('');

  const getSettings = async () => {
    if (IdInstance !== '' && ApiTokenInstance !== '') {
      const res = await GreenAPI.getSettings(IdInstance, ApiTokenInstance);
      if (res.isSuccess && res.data) {
        setResult(JSON.stringify(res.data, null, 2));
      } else {
        setResult('');
        toast.error(res.message);
      }
    } else {
      setResult('');
      toast.error('Заполните знчения IdInstance и ApiTokenInstance');
    }
  };

  const getStateInstance = async () => {
    if (IdInstance !== '' && ApiTokenInstance !== '') {
      const res = await GreenAPI.getStateInstance(IdInstance, ApiTokenInstance);
      if (res.isSuccess && res.data) {
        setResult(JSON.stringify(res.data, null, 2));
      } else {
        setResult('');
        toast.error(res.message);
      }
    } else {
      setResult('');
      toast.error('Заполните знчения IdInstance и ApiTokenInstance');
    }
  };

  const postMessageForm = async (params: MessageParams) => {
    if (IdInstance !== '' && ApiTokenInstance !== '') {
      const res = await GreenAPI.postMessageForm(IdInstance, ApiTokenInstance, params);
      if (res.isSuccess && res.data) {
        setResult(JSON.stringify(res.data, null, 2));
        toast.success('Сообщение успешно отправлено');
      } else {
        setResult('');
        toast.error(res.message);
      }
    } else {
      setResult('');
      toast.error('Заполните знчения IdInstance и ApiTokenInstance');
    }
  };
  const postFileForm = async (params: FileParams) => {
    if (IdInstance !== '' && ApiTokenInstance !== '') {
      const res = await GreenAPI.postFileForm(IdInstance, ApiTokenInstance, params);
      if (res.isSuccess && res.data) {
        setResult(JSON.stringify(res.data, null, 2));
        toast.success('Сообщение успешно отправлено');
      } else {
        setResult('');
        toast.error(res.message);
      }
    } else {
      setResult('');
      toast.error('Заполните знчения IdInstance и ApiTokenInstance');
    }
  };

  const onFinishMessageForm: FormProps<MessageFieldType>['onFinish'] = (values) => {
    const params = {
      phone: values.phone as string,
      message: values.message as string,
    };
    postMessageForm(params);
  };

  
  const onFinishFileForm: FormProps<FileFieldType>['onFinish'] = ({ phone, fileUrl }) => {
    const params = {
      phone: phone as string,
      fileUrl: fileUrl as string,
    };
    postFileForm(params);
  };
  
  const onFinishFailedForm: FormProps['onFinishFailed'] = (errorInfo) => {
    toast.error(JSON.stringify(errorInfo));
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className={style.container}>
        <Flex className={style.container__flex}>
          <Flex className={style.side_left}>
            <Flex className={style.apiAndToken_block}>
              <Input value={IdInstance} placeholder="IdInstance" onChange={(e) => setIdInstance(e.target.value)} />
              <Input
                value={ApiTokenInstance}
                placeholder="ApiTokenInstance"
                onChange={(e) => setApiTokenInstance(e.target.value)}
              />
            </Flex>

            <Flex className={style.getButttonBlock}>
              <Button onClick={() => getSettings()}>getSettings</Button>
              <Button onClick={() => getStateInstance()}>getStateInstance</Button>
            </Flex>
            <div className={style.messageForm}>
              <Form
                variant="filled"
                onFinish={onFinishMessageForm}
                onFinishFailed={onFinishFailedForm}
                autoComplete="off"
                style={{ maxWidth: 600 }}
              >
                <Form.Item<MessageFieldType> name="phone" rules={[{ required: true, message: 'Please input!' }]}>
                  <Input placeholder="Phone number" />
                </Form.Item>
                <Form.Item<MessageFieldType> name="message" rules={[{ required: true, message: 'Please input!' }]}>
                  <Input.TextArea placeholder="Text message" />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" style={{ width: '100%' }}>
                    SendMessage
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className={style.sendForm}>
              <Form
                variant="filled"
                onFinish={onFinishFileForm}
                onFinishFailed={onFinishFailedForm}
                autoComplete="off"
                style={{ maxWidth: 600 }}
              >
                <Form.Item<FileFieldType> name="phone" rules={[{ required: true, message: 'Please input!' }]}>
                  <Input placeholder="Phone number" />
                </Form.Item>
                <Form.Item<FileFieldType> name="fileUrl" rules={[{ required: true, message: 'Please input!' }]}>
                  <Input placeholder="image URL" />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" style={{ width: '100%' }}>
                    SendFileByURL
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Flex>
          <div className={style.side_rigth}>
            <Typography>Ответ:</Typography>
            <div className={style.textArea}>
              <Input.TextArea style={{ height: '650px' }} disabled value={`${result}`}></Input.TextArea>
            </div>
          </div>
        </Flex>
      </div>
    </>
  );
};
