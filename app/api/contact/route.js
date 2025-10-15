// app/api/contact/route.js
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service, message } = body;

    // Validasi
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { message: 'Mohon lengkapi semua field yang wajib diisi' },
        { status: 400 }
      );
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Format email tidak valid' },
        { status: 400 }
      );
    }

    // Get IP & User Agent
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded
      ? forwarded.split(',')[0]
      : request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('deatrans_db');

    // Insert document
    const result = await db.collection('contact_submissions').insertOne({
      name,
      email,
      phone,
      company: company || null,
      service: service || null,
      message,
      status: 'new',
      ip_address: ip,
      user_agent: userAgent,
      submitted_at: new Date(),
      read_at: null,
      replied_at: null,
    });

    console.log('✅ Contact form saved to MongoDB');
    console.log('   ID:', result.insertedId);
    console.log('   Name:', name);

    return NextResponse.json(
      {
        message: 'Pesan berhasil dikirim',
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server. Silakan coba lagi nanti.' },
      { status: 500 }
    );
  }
}

// GET endpoint to view submissions
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit')) || 50;

    const client = await clientPromise;
    const db = client.db('deatrans_db');

    const query = status ? { status } : {};

    const submissions = await db
      .collection('contact_submissions')
      .find(query)
      .sort({ submitted_at: -1 })
      .limit(limit)
      .toArray();

    return NextResponse.json(
      {
        success: true,
        data: submissions,
        total: submissions.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Error fetching data' },
      { status: 500 }
    );
  }
}
