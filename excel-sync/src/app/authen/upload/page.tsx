'use client'
import UploadDragger from '@/app/components/UploadDragger';
import React, { useState } from 'react';

export default function SigninPage () {
  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      <h1 className="text-2xl font-bold mb-6">Upload your Excel files</h1>
      <UploadDragger />
    </div>
  );
}