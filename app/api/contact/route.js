// app/api/contact/route.js
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service, message } = body;

    // Validasi data
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { message: 'Mohon lengkapi semua field yang wajib diisi' },
        { status: 400 }
      );
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Format email tidak valid' },
        { status: 400 }
      );
    }

    // Get IP address dan User Agent
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded
      ? forwarded.split(',')[0]
      : request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Save to database
    try {
      const [result] = await pool.query(
        `INSERT INTO contact_submissions 
        (name, email, phone, company, service, message, ip_address, user_agent, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new')`,
        [
          name,
          email,
          phone,
          company || null,
          service || null,
          message,
          ip,
          userAgent,
        ]
      );

      console.log('✅ Contact form saved to database');
      console.log('   ID:', result.insertId);
      console.log('   Name:', name);
      console.log('   Email:', email);
    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      // Jika database error, tetap return success tapi log error
      // Sehingga user tidak tahu ada masalah di backend
    }

    // Log data untuk backup (jika database gagal)
    console.log('📋 Contact Form Submission:');
    console.log('========================');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Company:', company || 'N/A');
    console.log('Service:', service || 'N/A');
    console.log('Message:', message);
    console.log('IP:', ip);
    console.log('Timestamp:', new Date().toISOString());
    console.log('========================');

    // Return success response
    return NextResponse.json(
      {
        message: 'Pesan berhasil dikirim',
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server. Silakan coba lagi nanti.' },
      { status: 500 }
    );
  }
}

// Handle GET request (optional - untuk view submissions)
export async function GET(request) {
  try {
    // Optional: Add authentication check here

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit')) || 50;

    let query = 'SELECT * FROM contact_submissions';
    let params = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY submitted_at DESC LIMIT ?';
    params.push(limit);

    const [submissions] = await pool.query(query, params);

    return NextResponse.json(
      {
        success: true,
        data: submissions,
        total: submissions.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { message: 'Error fetching data' },
      { status: 500 }
    );
  }
}
