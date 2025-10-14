// app/calculator/page.js
'use client';
import { useState } from 'react';
import styles from './calculator.module.css';

export default function CalculatorPage() {
  const [formData, setFormData] = useState({
    weight: '',
    length: '',
    width: '',
    height: '',
    quantity: '',
    shippingMethod: 'sea',
  });

  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateCost = (e) => {
    e.preventDefault();
    setIsCalculating(true);

    // Simulasi loading
    setTimeout(() => {
      const weight = parseFloat(formData.weight);
      const length = parseFloat(formData.length);
      const width = parseFloat(formData.width);
      const height = parseFloat(formData.height);
      const quantity = parseInt(formData.quantity);

      // Hitung volume weight (dalam kg)
      const volumeWeight = (length * width * height * quantity) / 6000; // DIM factor for air

      // Gunakan berat yang lebih besar (actual weight vs volume weight)
      const chargeableWeight = Math.max(weight * quantity, volumeWeight);

      // Hitung biaya berdasarkan metode pengiriman
      let baseRate, transitDays, customsClearance, adminFee, insurance;

      if (formData.shippingMethod === 'sea') {
        baseRate = chargeableWeight * 15000; // Rp 15,000 per kg untuk sea freight
        transitDays = '25-35 hari';
        customsClearance = 2500000; // Rp 2,500,000
        adminFee = 500000; // Rp 500,000
        insurance = baseRate * 0.015; // 1.5% dari nilai barang
      } else {
        baseRate = chargeableWeight * 45000; // Rp 45,000 per kg untuk air freight
        transitDays = '5-7 hari';
        customsClearance = 3000000; // Rp 3,000,000
        adminFee = 750000; // Rp 750,000
        insurance = baseRate * 0.02; // 2% dari nilai barang
      }

      // Hitung pajak impor (estimasi 10% dari nilai barang)
      const importDuty = baseRate * 0.1;
      const vat = (baseRate + importDuty) * 0.11; // PPN 11%

      // Total biaya
      const totalCost =
        baseRate + customsClearance + adminFee + insurance + importDuty + vat;

      setResult({
        chargeableWeight: chargeableWeight.toFixed(2),
        volumeWeight: volumeWeight.toFixed(2),
        actualWeight: (weight * quantity).toFixed(2),
        baseRate,
        customsClearance,
        adminFee,
        insurance,
        importDuty,
        vat,
        totalCost,
        transitDays,
        shippingMethod:
          formData.shippingMethod === 'sea' ? 'Sea Freight' : 'Air Freight',
      });

      setIsCalculating(false);
    }, 800);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const resetForm = () => {
    setFormData({
      weight: '',
      length: '',
      width: '',
      height: '',
      quantity: '',
      shippingMethod: 'sea',
    });
    setResult(null);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Kalkulator Biaya Impor</h1>
          <p className={styles.heroSubtitle}>
            Hitung estimasi biaya impor dari China ke Jakarta
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="section">
        <div className="container">
          <div className={styles.calculatorWrapper}>
            {/* Form Input */}
            <div className={styles.calculatorForm}>
              <div className={styles.formHeader}>
                <h2>📦 Input Data Barang</h2>
                <p>Masukkan detail barang yang akan diimpor</p>
              </div>

              <form onSubmit={calculateCost}>
                <div className={styles.formGroup}>
                  <label htmlFor="weight">Berat per Item (kg) *</label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    step="0.1"
                    min="0.1"
                    required
                    placeholder="Contoh: 5.5"
                  />
                  <small>Masukkan berat aktual barang dalam kilogram</small>
                </div>

                <div className={styles.dimensionGroup}>
                  <label>Dimensi per Item (cm) *</label>
                  <div className={styles.dimensionInputs}>
                    <div className={styles.dimensionItem}>
                      <input
                        type="number"
                        name="length"
                        value={formData.length}
                        onChange={handleChange}
                        step="0.1"
                        min="0.1"
                        required
                        placeholder="Panjang"
                      />
                      <span>cm</span>
                    </div>
                    <span className={styles.times}>×</span>
                    <div className={styles.dimensionItem}>
                      <input
                        type="number"
                        name="width"
                        value={formData.width}
                        onChange={handleChange}
                        step="0.1"
                        min="0.1"
                        required
                        placeholder="Lebar"
                      />
                      <span>cm</span>
                    </div>
                    <span className={styles.times}>×</span>
                    <div className={styles.dimensionItem}>
                      <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        step="0.1"
                        min="0.1"
                        required
                        placeholder="Tinggi"
                      />
                      <span>cm</span>
                    </div>
                  </div>
                  <small>
                    Ukuran panjang × lebar × tinggi dalam sentimeter
                  </small>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="quantity">Jumlah Item *</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    required
                    placeholder="Contoh: 10"
                  />
                  <small>Berapa banyak item yang akan dikirim</small>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="shippingMethod">Metode Pengiriman *</label>
                  <select
                    id="shippingMethod"
                    name="shippingMethod"
                    value={formData.shippingMethod}
                    onChange={handleChange}
                    required
                  >
                    <option value="sea">
                      🚢 Sea Freight (Laut) - Lebih Ekonomis
                    </option>
                    <option value="air">
                      ✈️ Air Freight (Udara) - Lebih Cepat
                    </option>
                  </select>
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    type="submit"
                    className={`btn btn-primary ${styles.calculateBtn}`}
                    disabled={isCalculating}
                  >
                    {isCalculating ? '⏳ Menghitung...' : '🧮 Hitung Biaya'}
                  </button>
                  <button
                    type="button"
                    className={`btn ${styles.resetBtn}`}
                    onClick={resetForm}
                  >
                    🔄 Reset
                  </button>
                </div>
              </form>
            </div>

            {/* Result Display */}
            <div className={styles.calculatorResult}>
              {!result ? (
                <div className={styles.emptyState}>
                  <span className={styles.emptyIcon}>📊</span>
                  <h3>Hasil Perhitungan</h3>
                  <p>
                    Isi formulir dan klik tombol Hitung Biaya untuk melihat
                    estimasi biaya impor Anda
                  </p>
                </div>
              ) : (
                <div className={styles.resultContent}>
                  <div className={styles.resultHeader}>
                    <h3>💰 Estimasi Biaya Impor</h3>
                    <span className={styles.methodBadge}>
                      {result.shippingMethod}
                    </span>
                  </div>

                  <div className={styles.weightInfo}>
                    <div className={styles.weightItem}>
                      <span className={styles.weightLabel}>Berat Aktual:</span>
                      <span className={styles.weightValue}>
                        {result.actualWeight} kg
                      </span>
                    </div>
                    <div className={styles.weightItem}>
                      <span className={styles.weightLabel}>Berat Volume:</span>
                      <span className={styles.weightValue}>
                        {result.volumeWeight} kg
                      </span>
                    </div>
                    <div className={styles.weightItem}>
                      <span className={styles.weightLabel}>
                        Berat Dikenakan:
                      </span>
                      <span className={styles.weightValue}>
                        <strong>{result.chargeableWeight} kg</strong>
                      </span>
                    </div>
                  </div>

                  <div className={styles.costBreakdown}>
                    <h4>Rincian Biaya:</h4>
                    <div className={styles.costItem}>
                      <span>Biaya Freight</span>
                      <span>{formatCurrency(result.baseRate)}</span>
                    </div>
                    <div className={styles.costItem}>
                      <span>Customs Clearance</span>
                      <span>{formatCurrency(result.customsClearance)}</span>
                    </div>
                    <div className={styles.costItem}>
                      <span>Biaya Admin & Handling</span>
                      <span>{formatCurrency(result.adminFee)}</span>
                    </div>
                    <div className={styles.costItem}>
                      <span>Asuransi</span>
                      <span>{formatCurrency(result.insurance)}</span>
                    </div>
                    <div className={styles.costItem}>
                      <span>Bea Masuk (Est. 10%)</span>
                      <span>{formatCurrency(result.importDuty)}</span>
                    </div>
                    <div className={styles.costItem}>
                      <span>PPN 11%</span>
                      <span>{formatCurrency(result.vat)}</span>
                    </div>
                  </div>

                  <div className={styles.totalCost}>
                    <span>Total Estimasi Biaya:</span>
                    <span className={styles.totalAmount}>
                      {formatCurrency(result.totalCost)}
                    </span>
                  </div>

                  <div className={styles.transitInfo}>
                    <span className={styles.transitIcon}>⏱️</span>
                    <div>
                      <strong>Estimasi Waktu Transit:</strong>
                      <p>{result.transitDays}</p>
                    </div>
                  </div>

                  <div className={styles.disclaimer}>
                    <p>
                      <strong>⚠️ Catatan Penting:</strong>
                    </p>
                    <ul>
                      <li>
                        Estimasi ini hanya perhitungan kasar dan dapat berubah
                      </li>
                      <li>
                        Biaya aktual tergantung pada jenis barang, nilai barang,
                        dan regulasi terkini
                      </li>
                      <li>
                        Untuk perhitungan akurat, hubungi tim kami untuk
                        mendapatkan quotation resmi
                      </li>
                    </ul>
                  </div>

                  <div className={styles.ctaButtons}>
                    <a href="/contact" className="btn btn-primary">
                      💬 Minta Quotation Resmi
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className={styles.infoSection}>
        <div className="container">
          <h2 className="section-title">Informasi Penting</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>📋</span>
              <h3>Dokumen yang Diperlukan</h3>
              <ul>
                <li>Invoice & Packing List</li>
                <li>Bill of Lading / AWB</li>
                <li>Certificate of Origin</li>
                <li>Dokumen Perizinan (jika diperlukan)</li>
              </ul>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>⚖️</span>
              <h3>Perhitungan Berat</h3>
              <ul>
                <li>Berat Volume: (P × L × T) / 6000</li>
                <li>Berat dikenakan adalah yang lebih besar</li>
                <li>Untuk sea freight, faktor berbeda</li>
              </ul>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>💡</span>
              <h3>Tips Menghemat Biaya</h3>
              <ul>
                <li>Konsolidasi pengiriman untuk volume lebih besar</li>
                <li>Pilih sea freight untuk barang non-urgent</li>
                <li>Pastikan packing efisien untuk hemat volume</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
