// app/api/tracking/route.js
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const trackingNumber = searchParams.get('tracking_number');

    if (!trackingNumber) {
      return NextResponse.json(
        {
          success: false,
          error: 'Tracking number is required',
        },
        { status: 400 }
      );
    }

    // Query shipment dari database
    const [shipments] = await pool.query(
      'SELECT * FROM shipments WHERE tracking_number = ?',
      [trackingNumber.toUpperCase()]
    );

    if (shipments.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Nomor resi tidak ditemukan. Pastikan nomor resi yang Anda masukkan benar.',
        },
        { status: 404 }
      );
    }

    const shipment = shipments[0];

    // Query tracking history
    const [history] = await pool.query(
      `SELECT 
        status_code, 
        status_name, 
        location, 
        description, 
        remarks, 
        DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i') as timestamp
       FROM tracking_history 
       WHERE shipment_id = ? 
       ORDER BY timestamp ASC`,
      [shipment.id]
    );

    // Format dates
    const formatDate = (date) => {
      if (!date) return null;
      const d = new Date(date);
      return d.toLocaleString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    };

    // Format response
    const response = {
      success: true,
      data: {
        shipment: {
          trackingNumber: shipment.tracking_number,
          serviceType: shipment.service_type,
          serviceName:
            shipment.service_type === 'sea' ? 'Sea Freight' : 'Air Freight',
          currentStatus: shipment.current_status,
          customerName: shipment.customer_name,

          origin: {
            city: shipment.origin_city,
            port: shipment.origin_port,
            country: shipment.origin_country || 'China',
          },

          destination: {
            city: shipment.destination_city,
            port: shipment.destination_port,
            address: shipment.destination_address,
            country: shipment.destination_country || 'Indonesia',
          },

          details: {
            weight: shipment.weight ? `${shipment.weight} kg` : null,
            cargoDescription: shipment.cargo_description,
            containerNumber: shipment.container_number,
            vesselName: shipment.vessel_name,
            voyageNumber: shipment.voyage_number,
          },

          schedule: {
            estimatedDeparture: formatDate(shipment.estimated_departure),
            actualDeparture: formatDate(shipment.actual_departure),
            estimatedArrival: formatDate(shipment.estimated_arrival),
            departureStatus: shipment.departure_status,
            departureStatusText:
              shipment.departure_status === 'on_time'
                ? 'Tepat Waktu'
                : 'Terlambat',
            delayReason: shipment.delay_reason,
          },
        },

        history: history.map((h) => ({
          statusCode: h.status_code,
          statusName: h.status_name,
          location: h.location,
          description: h.description,
          remarks: h.remarks,
          timestamp: h.timestamp,
        })),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);

    // Check if it's a database connection error
    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json(
        {
          success: false,
          error:
            'Database connection failed. Please make sure MySQL is running.',
          details: 'MySQL service is not running or not accessible',
        },
        { status: 500 }
      );
    }

    if (error.code === 'ER_BAD_DB_ERROR') {
      return NextResponse.json(
        {
          success: false,
          error: 'Database not found',
          details:
            'Database "freightpro_db" does not exist. Please create it first.',
        },
        { status: 500 }
      );
    }

    if (error.code === 'ER_NO_SUCH_TABLE') {
      return NextResponse.json(
        {
          success: false,
          error: 'Database tables not found',
          details: 'Please import database-schema.sql file',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
