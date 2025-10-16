// app/api/tracking/route.js
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

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

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('deatrans_db');

    // Find shipment
    const shipment = await db.collection('shipments').findOne({
      tracking_number: trackingNumber.toUpperCase(),
    });

    if (!shipment) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Nomor resi tidak ditemukan. Pastikan nomor resi yang Anda masukkan benar.',
        },
        { status: 404 }
      );
    }

    // Get tracking history (optional - jika ada)
    const history = await db
      .collection('tracking_history')
      .find({ shipment_id: shipment._id })
      .sort({ timestamp: 1 })
      .toArray();

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
            city: shipment.current_location,
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
          timestamp: formatDate(h.timestamp),
        })),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('MongoDB Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details:
          process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
