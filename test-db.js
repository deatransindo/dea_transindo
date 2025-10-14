// test-db.js
// Script untuk test koneksi database MySQL
// Jalankan dengan: node test-db.js

const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('=================================');
  console.log('🧪 Testing MySQL Connection...');
  console.log('=================================');
  console.log('');

  console.log('📋 Configuration:');
  console.log('   Host:', process.env.DB_HOST);
  console.log('   Port:', process.env.DB_PORT);
  console.log('   User:', process.env.DB_USER);
  console.log('   Database:', process.env.DB_NAME);
  console.log('');

  try {
    // Test 1: Create connection
    console.log('🔌 Test 1: Connecting to MySQL...');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log('   ✅ Connection successful!');
    console.log('');

    // Test 2: Query shipments table
    console.log('📦 Test 2: Querying shipments table...');
    const [shipments] = await connection.query('SELECT * FROM shipments');
    console.log(`   ✅ Found ${shipments.length} shipment(s) in database`);

    if (shipments.length > 0) {
      console.log('');
      console.log('   Sample tracking numbers:');
      shipments.forEach((ship, index) => {
        console.log(
          `   ${index + 1}. ${
            ship.tracking_number
          } - ${ship.service_type.toUpperCase()} - ${ship.current_status}`
        );
      });
    }
    console.log('');

    // Test 3: Query tracking history
    console.log('📜 Test 3: Querying tracking_history table...');
    const [history] = await connection.query(
      'SELECT COUNT(*) as count FROM tracking_history'
    );
    console.log(`   ✅ Found ${history[0].count} tracking record(s)`);
    console.log('');

    // Test 4: Query status master
    console.log('📊 Test 4: Querying status_master table...');
    const [statuses] = await connection.query('SELECT * FROM status_master');
    console.log(`   ✅ Found ${statuses.length} status definition(s)`);
    console.log('');

    // Close connection
    await connection.end();
    console.log('🔒 Connection closed');
    console.log('');
    console.log('=================================');
    console.log('✅ All tests passed successfully!');
    console.log('=================================');
    console.log('');
    console.log('💡 Your database is ready to use!');
    console.log('   You can now run: npm run dev');
    console.log('');
  } catch (error) {
    console.log('');
    console.log('=================================');
    console.log('❌ Connection Test Failed!');
    console.log('=================================');
    console.log('');
    console.log('Error:', error.message);
    console.log('');

    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Troubleshooting:');
      console.log('   1. Make sure MySQL service is running');
      console.log('   2. Check if MySQL is installed');
      console.log('   3. Verify port 3306 is not blocked');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('💡 Troubleshooting:');
      console.log('   1. Check your password in .env.local');
      console.log('   2. Verify username is correct');
      console.log('   3. Try: mysql -u root -p');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('💡 Troubleshooting:');
      console.log('   1. Database "freightpro_db" does not exist');
      console.log('   2. Create it: CREATE DATABASE freightpro_db;');
      console.log('   3. Import schema.sql file');
    }

    console.log('');
    process.exit(1);
  }
}

// Run the test
testConnection();
