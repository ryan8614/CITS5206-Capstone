import { POST } from '@/app/api/upload/route';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { parseExcelAndSave } from '@/lib/parseExcelAndSave';

// Mock the modules and functions used in the route handler
jest.mock('next/server', () => ({
   NextResponse: {
       json: jest.fn(),
       next: jest.fn(),
       // Mock the constructor to return a mock object
       constructor: jest.fn().mockImplementation((body, init) => {
           return {
               body: body,
               status: init?.status,
               headers: init?.headers,
           };
       }),
   },
   NextRequest: jest.fn()
}));

jest.mock('path', () => ({
   join: jest.fn().mockReturnValue('/mocked/output/dir'),
}));

jest.mock('@/lib/parseExcelAndSave', () => ({
   parseExcelAndSave: jest.fn().mockResolvedValue(['file1.json', 'file2.json']),
}));

describe('API Route: /api/upload', () => {
   let req: NextRequest;
   let formData: FormData;
   let file: File;

   beforeEach(() => {
       jest.clearAllMocks();

       // Mock File object
       file = {
           name: 'test.xlsx',
           type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
       } as File;

       // Mock FormData object
       formData = new FormData();
       formData.append('file', file);

       // Mock NextRequest object
       req = {
           formData: jest.fn().mockResolvedValue(formData),
       } as any;
   });

   it('should successfully upload a valid Excel file', async () => {
       const response = await POST(req);

       expect(req.formData).toHaveBeenCalled();
       expect(path.join).toHaveBeenCalledWith(process.cwd(), 'src', 'data');
       expect(parseExcelAndSave).toHaveBeenCalledWith(file, '/mocked/output/dir');
       expect(NextResponse.constructor).toHaveBeenCalledWith(
           JSON.stringify({ success: true, message: 'test.xlsx uploaded successfully.' }),
           { status: 200, headers: { 'Content-Type': 'application/json' } }
       );
   });

   it('should return a 400 error if no file is uploaded', async () => {
       (req.formData as jest.Mock).mockResolvedValue(new FormData()); // Empty FormData

       const response = await POST(req);

       expect(NextResponse.constructor).toHaveBeenCalledWith(
           JSON.stringify({ message: 'No file uploaded.' }),
           { status: 400, headers: { 'Content-Type': 'application/json' } }
       );
   });

   it('should return a 400 error if the uploaded file is not a valid Excel file', async () => {
       // Mock file with invalid type
       file = {
           name: 'test.txt',
           type: 'text/plain',
       } as File;
       formData.set('file', file);
       (req.formData as jest.Mock).mockResolvedValue(formData);

       const response = await POST(req);

       expect(NextResponse.constructor).toHaveBeenCalledWith(
           JSON.stringify({ message: 'test.txt is not a valid Excel file.' }),
           { status: 400, headers: { 'Content-Type': 'application/json' } }
       );
   });

   it('should return a 500 error if an error occurs during file processing', async () => {
       (parseExcelAndSave as jest.Mock).mockRejectedValue(new Error('File processing error'));

       const response = await POST(req);

       expect(NextResponse.constructor).toHaveBeenCalledWith(
           JSON.stringify({ message: 'An error occurred (network/server error).' }),
           { status: 500, headers: { 'Content-Type': 'application/json' } }
       );
   });

   it('should handle different Excel MIME types correctly', async () => {
       // Test with 'application/vnd.ms-excel'
       file = {
           name: 'test.xls',
           type: 'application/vnd.ms-excel',
       } as File;
       formData.set('file', file);
       (req.formData as jest.Mock).mockResolvedValue(formData);

       await POST(req);

       expect(parseExcelAndSave).toHaveBeenCalledWith(file, '/mocked/output/dir');

       // Test with 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
       file = {
           name: 'test.xlsx',
           type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
       } as File;
       formData.set('file', file);
       (req.formData as jest.Mock).mockResolvedValue(formData);

       await POST(req);

       expect(parseExcelAndSave).toHaveBeenCalledWith(file, '/mocked/output/dir');
   });

   it('should handle empty file name gracefully', async () => {
       file = {
           name: '',
           type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
       } as File;
       formData.set('file', file);
       (req.formData as jest.Mock).mockResolvedValue(formData);

       const response = await POST(req);

       expect(NextResponse.constructor).toHaveBeenCalledWith(
           JSON.stringify({ success: true, message: ' uploaded successfully.' }), // Empty filename in message
           { status: 200, headers: { 'Content-Type': 'application/json' } }
       );
   });

   it('should handle parseExcelAndSave returning an empty array', async () => {
       (parseExcelAndSave as jest.Mock).mockResolvedValue([]);

       const response = await POST(req);

       expect(req.formData).toHaveBeenCalled();
       expect(path.join).toHaveBeenCalledWith(process.cwd(), 'src', 'data');
       expect(parseExcelAndSave).toHaveBeenCalledWith(file, '/mocked/output/dir');
       expect(NextResponse.constructor).toHaveBeenCalledWith(
           JSON.stringify({ success: true, message: 'test.xlsx uploaded successfully.' }),
           { status: 200, headers: { 'Content-Type': 'application/json' } }
       );
   });

   it('should handle parseExcelAndSave throwing a specific error', async () => {
       const specificError = new Error('Specific file processing error');
       (parseExcelAndSave as jest.Mock).mockRejectedValue(specificError);

       const response = await POST(req);

       expect(NextResponse.constructor).toHaveBeenCalledWith(
           JSON.stringify({ message: 'An error occurred (network/server error).' }),
           { status: 500, headers: { 'Content-Type': 'application/json' } }
       );
   });
});
