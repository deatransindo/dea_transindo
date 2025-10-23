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
          <h1 className={styles.heroTitle}>Import Cost Calculator</h1>
          <p className={styles.heroSubtitle}>
            Calculate estimated import costs from China to Jakarta
          </p>
        </div>
      </section>
      <div className="container">
        <h1 className={styles.heroTitle}>Choose your freight</h1>
        <p className={styles.heroSubtitle}>
          Input the Item Dimensions or Weight
        </p>
      </div>
      {/* Calculator Section */}
      <section className="section">
        <div className="container">
          <div className={styles.calculatorWrapper}>
            {/* Shipping Method Toggle - Above Form */}
            <div className={styles.shippingToggle}>
              <button
                type="button"
                className={`${styles.toggleTab} ${
                  formData.shippingMethod === 'sea' ? styles.active : ''
                }`}
                onClick={() =>
                  setFormData({ ...formData, shippingMethod: 'sea' })
                }
              >
                Sea Freight
              </button>
              <button
                type="button"
                className={`${styles.toggleTab} ${
                  formData.shippingMethod === 'air' ? styles.active : ''
                }`}
                onClick={() =>
                  setFormData({ ...formData, shippingMethod: 'air' })
                }
              >
                Air Freight
              </button>
            </div>

            {/* Form Input - Single Container */}
            <div className={styles.calculatorForm}>
              <form onSubmit={calculateCost}>
                {/* Form Content - Conditional & Horizontal Layout */}
                <div className={styles.formContent}>
                  {/* Sea Freight - Dimensions & Quantity */}
                  {formData.shippingMethod === 'sea' && (
                    <>
                      <div className={styles.formGroup}>
                        <label htmlFor="length">
                          Length <span className={styles.required}>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                          <input
                            type="number"
                            id="length"
                            name="length"
                            value={formData.length}
                            onChange={handleChange}
                            step="0.1"
                            min="0.1"
                            required
                            placeholder="0"
                          />
                          <span className={styles.inputUnit}>cm</span>
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="width">
                          Width <span className={styles.required}>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                          <input
                            type="number"
                            id="width"
                            name="width"
                            value={formData.width}
                            onChange={handleChange}
                            step="0.1"
                            min="0.1"
                            required
                            placeholder="0"
                          />
                          <span className={styles.inputUnit}>cm</span>
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="height">
                          Height <span className={styles.required}>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                          <input
                            type="number"
                            id="height"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            step="0.1"
                            min="0.1"
                            required
                            placeholder="0"
                          />
                          <span className={styles.inputUnit}>cm</span>
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="quantity">
                          Quantity <span className={styles.required}>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                          <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            min="1"
                            required
                            placeholder="0"
                          />
                          <span className={styles.inputUnit}>pcs</span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Air Freight - Weight & Quantity */}
                  {formData.shippingMethod === 'air' && (
                    <>
                      <div className={styles.formGroup}>
                        <label htmlFor="weight">
                          Weight <span className={styles.required}>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                          <input
                            type="number"
                            id="weight"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            step="0.1"
                            min="0.1"
                            required
                            placeholder="0"
                          />
                          <span className={styles.inputUnit}>kg</span>
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="quantity">
                          Quantity <span className={styles.required}>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                          <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            min="1"
                            required
                            placeholder="0"
                          />
                          <span className={styles.inputUnit}>pcs</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    type="submit"
                    className={`btn btn-primary ${styles.calculateBtn}`}
                    disabled={isCalculating}
                  >
                    {isCalculating ? 'Calculating...' : 'Calculate Cost'}
                  </button>
                  <button
                    type="button"
                    className={`btn ${styles.resetBtn}`}
                    onClick={resetForm}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            {/* Result Display */}
            {result && (
              <div className={styles.calculatorResult}>
                <div className={styles.resultContent}>
                  <div className={styles.resultHeader}>
                    <h3>Import Cost Estimate</h3>
                    <span className={styles.methodBadge}>
                      {result.shippingMethod}
                    </span>
                  </div>

                  <div className={styles.weightInfo}>
                    <div className={styles.weightItem}>
                      <span className={styles.weightLabel}>Actual Weight:</span>
                      <span className={styles.weightValue}>
                        {result.actualWeight} kg
                      </span>
                    </div>
                    <div className={styles.weightItem}>
                      <span className={styles.weightLabel}>Volume Weight:</span>
                      <span className={styles.weightValue}>
                        {result.volumeWeight} kg
                      </span>
                    </div>
                    <div className={styles.weightItem}>
                      <span className={styles.weightLabel}>
                        Chargeable Weight:
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
                    <h4>Cost Breakdown:</h4>
                    <div className={styles.costItem}>
                      <span>Total estimated shipping cost</span>
                      {/* <span>
                        {result.shippingMethod === 'Sea Freight'
                          ? `Freight Cost (${result.chargeUnit} CBM × IDR 3,500,000)`
                          : `Freight Cost (${result.chargeUnit} kg × IDR 195,000)`}
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
                        Included:
                      </p>
                      <p style={{ margin: '4px 0' }}>Custom Clearance</p>
                      <p style={{ margin: '4px 0' }}>Import Duty</p>
                      <p style={{ margin: '4px 0' }}>Tax (VAT)</p>
                    </div>
                  </div>

                  <div className={styles.totalCost}>
                    <span>Total Cost (All-In):</span>
                    <span className={styles.totalAmount}>
                      {formatCurrency(result.totalCost)}
                    </span>
                  </div>

                  <div className={styles.transitInfo}>
                    <div>
                      <strong>Estimated Transit Time:</strong>
                      <p>{result.transitDays}</p>
                    </div>
                  </div>

                  <div className={styles.disclaimer}>
                    <p>
                      <strong>⚠️ Important Note:</strong>
                    </p>
                    <ul>
                      <li>
                        Price is all-in (includes custom clearance, import duty,
                        and tax)
                      </li>
                      <li>
                        This estimate is a rough calculation and may change
                      </li>
                      <li>
                        Actual cost depends on product type, product value, and
                        current regulations
                      </li>
                      <li>
                        For accurate calculations, contact our team to get an
                        official quotation
                      </li>
                    </ul>
                  </div>

                  <div className={styles.ctaButtons}>
                    <a href="/contact" className="btn btn-primary">
                      Request Official Quotation
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className={styles.infoSection}>
        <div className="container">
          <h2 className="section-title">Important Information</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>📋</span>
              <h3>Required Documents</h3>
              <ul>
                <li>Invoice & Packing List</li>
                <li>Bill of Lading / AWB</li>
                <li>Certificate of Origin</li>
                <li>Permit Documents (if required)</li>
              </ul>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>💰</span>
              <h3>Total Cost Includes</h3>
              <ul>
                <li>Custom Clearance</li>
                <li>Import Duty</li>
                <li>Tax (VAT)</li>
                <li>Insurance</li>
              </ul>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>💡</span>
              <h3>Cost Saving Tips</h3>
              <ul>
                <li>Consolidate shipments for larger volumes</li>
                <li>Choose sea freight for non-urgent items</li>
                <li>Ensure efficient packing to save volume</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
