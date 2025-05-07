'use client';

import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, notification } from 'antd';
import type { UploadProps } from 'antd';

const { Dragger } = Upload;

/**
 * @description UploadDragger component for uploading files via drag and drop.
 * Utilizes Ant Design's Upload component with drag and drop functionality.
 * Displays notifications for successful uploads and errors.
 * @returns {JSX.Element} The UploadDragger component.
 */
const UploadDragger: React.FC = () => {
  /**
   * @description Ant Design notification API.
   * Provides methods for displaying notifications.
   */
  const [api, contextHolder] = notification.useNotification();

  /**
   * @description Configuration for the Ant Design Upload component.
   * Defines the upload behavior, including the upload URL, file handling, and event callbacks.
   */
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    action: '/api/upload', 
    /**
     * @description Callback function triggered when the upload status changes.
     * Displays success or error notifications based on the upload status.
     * @param {object} info - Information about the upload event.
     */
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
    /**
     * @description Callback function triggered when files are dropped into the upload area.
     * Logs the dropped files to the console.
     * @param {DragEvent} e - The drag event object.
     */
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
