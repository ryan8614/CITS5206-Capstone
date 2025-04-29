'use client';

import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, notification } from 'antd';
import type { UploadProps } from 'antd';

const { Dragger } = Upload;

const UploadDragger: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    action: '/api/upload', 
    onChange(info) {
      const { status, name, response } = info.file;

      if (status === 'done' && response?.success) {
        api.success({
          message: response.message,
          placement: 'topRight',
        });
      } else if (status === 'error') {
        api.error({
          message: `Upload failed`,
          description: response?.message || 'Unknown server error.',
          placement: 'topRight',
        });
      }
    },
    onDrop(e) {
      console.log('Dropped files:', e.dataTransfer.files);
    },
  };

  return (
    <>
      {contextHolder}
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Excel files only (.xls, .xlsx).
        </p>
      </Dragger>
    </>
  );
};

export default UploadDragger;