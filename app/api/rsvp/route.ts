import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// --- CONFIGURATION ---
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Sheet1'; // Configurable sheet name
const RANGE = `${SHEET_NAME}!A:F`; // Columns A to F

// --- AUTHENTICATION ---
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

console.log("RSVP API: Initialized. Sheet ID:", SPREADSHEET_ID ? "Yes" : "No", "Email:", CLIENT_EMAIL ? "Yes" : "No");

const sheets = google.sheets({ version: 'v4', auth });

// --- HELPERS ---

// Helper to format date
const getISODate = () => new Date().toISOString();

export async function GET(request: Request) {
    // 1. Check Credentials
    if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
        return NextResponse.json({ error: 'Server misconfiguration: Google Credentials missing' }, { status: 500 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const isTestRequest = searchParams.get('test') === 'true';

        // 2. Fetch Data from Sheets
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE,
        });

        const rows = response.data.values;

        // 3. Parse Data
        // Assume Row 1 is Header: id, name, attendance, message, createdAt, isTest
        if (!rows || rows.length === 0) {
            return NextResponse.json([]);
        }

        const headers = rows[0]; // Not used but good to know
        const dataRows = rows.slice(1); // Skip header

        const rsvps = dataRows.map((row) => ({
            id: row[0],
            name: row[1],
            attendance: row[2],
            message: row[3],
            createdAt: row[4],
            isTest: row[5] === 'TRUE' || row[5] === 'true', // Sheets stores booleans as text often
        }));

        // 4. Filter & Sort
        // Logic: 
        // - If ?test=true, return ONLY test data? Or include it?
        // - Requirement: "Return only isTest = false by default. If ?test=true, return only test entries."

        const filtered = rsvps.filter(r => isTestRequest ? r.isTest : !r.isTest);

        // Sort Newest First (descending)
        filtered.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA;
        });

        return NextResponse.json(filtered);

    } catch (error: any) {
        console.error('Google Sheets API Error (GET):', error);
        return NextResponse.json({ error: 'Failed to fetch RSVP data', details: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    // 1. Check Credentials
    if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
        return NextResponse.json({ error: 'Server misconfiguration: Google Credentials missing' }, { status: 500 });
    }

    try {
        const body = await request.json();
        const { name, attendance, message, isTest } = body;

        // 2. Validate
        if (!name || !attendance) {
            return NextResponse.json({ error: 'Name and attendance are required' }, { status: 400 });
        }

        // 3. Prepare Data
        const newRsvp = {
            id: crypto.randomUUID(),
            name: name.trim(),
            attendance,
            message: message ? message.trim() : '',
            createdAt: getISODate(),
            isTest: !!isTest,
        };

        const values = [
            [
                newRsvp.id,
                newRsvp.name,
                newRsvp.attendance,
                newRsvp.message,
                newRsvp.createdAt,
                newRsvp.isTest ? 'TRUE' : 'FALSE'
            ]
        ];

        // 4. Append to Sheets
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values,
            },
        });

        return NextResponse.json({ success: true, data: newRsvp });

    } catch (error: any) {
        console.error('Google Sheets API Error (POST):', error);
        return NextResponse.json({ error: 'Failed to submit RSVP', details: error.message }, { status: 500 });
    }
}
