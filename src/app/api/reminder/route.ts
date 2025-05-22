import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const dataPath = path.join(process.cwd(), 'public', 'data', 'maps', 'layouts', 'students.json');
        const fileContent = fs.readFileSync(dataPath, 'utf-8');
        const data = JSON.parse(fileContent);

        const allStudentsArrays = Object.values(data);
        const allStudents = allStudentsArrays.flat();

        const today = new Date();
        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth();
        const todayDate = today.getDate();

        const matches = allStudents.filter((student: any) => {
            const endDate = new Date(student['End Date']);
            return (
                endDate.getFullYear() === todayYear &&
                endDate.getMonth() === todayMonth &&
                endDate.getDate() === todayDate
            );
        });

        if (matches.length === 0) {
            return NextResponse.json({ message: 'No students found for today.' });
        }

        console.log(`[INFO] Found ${matches.length} student(s) expiring today.`);

        const res = await fetch('https://austinz.pythonanywhere.com/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(matches),
        });

        if (!res.ok) {
            throw new Error(`Notification server responded with status ${res.status}`);
        }

        const result = await res.json();
        return NextResponse.json({ message: 'Data sent to notification server', result });

    } catch (err: any) {
        console.error('[ERROR] Reminder Cron Job:', err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
