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
      const volumeWeight = (length * width * height * quantity) / 6000;

      // Gunakan berat yang lebih besar (actual weight vs volume weight)
      const chargeableWeight = Math.max(weight * quantity);

      // Hitung CBM (Cubic Meter)
      const cbm = (length * width * height * quantity) / 1000000;

      // Hitung biaya berdasarkan metode pengiriman
      let totalCost, transitDays, shippingMethod, chargeUnit;

      if (formData.shippingMethod === 'sea') {
        // Sea Freight: Rp 3,500,000 per CBM all-in
        totalCost = cbm * 3500000;
        transitDays = '21-30 hari';
        shippingMethod = 'Sea Freight';
        chargeUnit = cbm.toFixed(4);
      } else {
        // Air Freight: Rp 195,000 per kg all-in
        totalCost = chargeableWeight * 195000;
        transitDays = '3-5 hari';
        shippingMethod = 'Air Freight';
        chargeUnit = chargeableWeight.toFixed(2);
      }

      setResult({
        chargeableWeight: chargeableWeight,
        volumeWeight: volumeWeight,
        actualWeight: weight * quantity,
        cbm: cbm.toFixed(2),
        chargeUnit: chargeUnit,
        totalCost,
        transitDays,
        shippingMethod,
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
                    placeholder="Masukan berat.."
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
                    placeholder="Masukan quantity.."
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
                    <option value="sea">🚢 Sea Freight (Laut)</option>
                    <option value="air">✈️ Air Freight (Udara)</option>
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
                    Isi formulir dan klik tombol &quot;Hitung Biaya&quot; untuk
                    melihat estimasi biaya impor Anda
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
                    {result.shippingMethod === 'Sea Freight' && (
                      <div className={styles.weightItem}>
                        <span className={styles.weightLabel}>
                          Volume (CBM):
                        </span>
                        <span className={styles.weightValue}>
                          <strong>{result.cbm} m³</strong>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className={styles.costBreakdown}>
                    <h4>Rincian Biaya:</h4>
                    <div className={styles.costItem}>
                      <span>Total perkiraan biaya kirim</span>
                      {/* <span>
                        {result.shippingMethod === 'Sea Freight'
                          ? `Biaya Freight (${result.chargeUnit} CBM × Rp 3.500.000)`
                          : `Biaya Freight (${result.chargeUnit} kg × Rp 195.000)`}
                      </span> */}
                      <span>{formatCurrency(result.totalCost)}</span>
                    </div>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        color: '#666',
                        marginTop: '12px',
                        padding: '10px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '4px',
                      }}
                    >
                      <p style={{ margin: '4px 0', fontWeight: '500' }}>
                        ✅ Sudah termasuk:
                      </p>
                      <p style={{ margin: '4px 0' }}>🟢 Custom Clearance</p>
                      <p style={{ margin: '4px 0' }}>🟢 Bea Masuk</p>
                      <p style={{ margin: '4px 0' }}>🟢 Pajak (PPN)</p>
                    </div>
                  </div>

                  <div className={styles.totalCost}>
                    <span>Total Biaya (All-In):</span>
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
                        Harga adalah all-in (sudah termasuk custom clearance,
                        bea masuk, dan pajak)
                      </li>
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
              <h3>Perhitungan Biaya</h3>
              <ul>
                <li>
                  <strong>Sea Freight:</strong> Rp 3.500.000 per CBM (All-In)
                </li>
                <li>
                  <strong>Air Freight:</strong> Rp 195.000 per kg (All-In)
                </li>
                <li>CBM = (P × L × T × Qty) / 1.000.000</li>
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
