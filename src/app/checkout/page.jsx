"use client";
import React, { useState } from 'react';
import './page.css';

const CheckoutPage = () => {
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [UserDetails, setUserDetails] = useState({
      firstName: '',
      lastName: '',
      contactNumber: '',
      email: '',
      deliveryAddress: {
      street: '',
      city: '',
      state: '',
      postcode: '',
      country: 'United Kingdom'
    },
      billingAddress: {
      street: '',
      city: '',
      state: '',
      postcode: '',
      country: 'United Kingdom'
    },
    deliveryOption: 'standard'
  });

  const handleInputChange = (e, section = null) => {
    const { name, value } = e.target;
    
    if (section) {
      setUserDetails({
        ...UserDetails,
        [section]: {
          ...UserDetails[section],
          [name]: value
        }
      });
    } else {
      setUserDetails({
        ...UserDetails,
        [name]: value
      });
    }
  };

  const handleSameAsBillingChange = (e) => {
    setSameAsBilling(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process checkout - would typically send to a backend API
    console.log('Checkout data submitted:', UserDetails);
    alert('Proceeding to payment...');
  };

  return (
    <div className="checkout-container">
      <h1>Billing Details</h1>

      {/* below is the delivery options*/}
      
      <form onSubmit={handleSubmit}>
        <section className="checkout-section">
          <h2>1. Delivery Options</h2>
          
          <div className="delivery-method-options">
            <h3>Delivery Method</h3>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="deliveryOption"
                  value="standard"
                  checked={UserDetails.deliveryOption === 'standard'}
                  onChange={(e) => setUserDetails({...UserDetails, deliveryOption: e.target.value})}
                />
                <span className="radio-text">Standard Delivery (4-7 working days)</span>
              </label>
            </div>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="deliveryOption"
                  value="express"
                  checked={UserDetails.deliveryOption === 'express'}
                  onChange={(e) => setUserDetails({...UserDetails, deliveryOption: e.target.value})}
                />
                <span className="radio-text">Express Delivery (1-2 working days)</span>
              </label>
            </div>
          </div>
        </section>

      {/* below is the contact details*/}

        <section className="checkout-section">
          <h2>2. Contact Details</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={UserDetails.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={UserDetails.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={UserDetails.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number *</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={UserDetails.contactNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </section>

        {/* below is the delivery address*/}

        <section className="checkout-section">
          <h2>3. Delivery Address</h2>
          <div className="form-group">
            <label htmlFor="street">Street Address *</label>
            <input
              type="text"
              id="street"
              name="street"
              value={UserDetails.deliveryAddress.street}
              onChange={(e) => handleInputChange(e, 'deliveryAddress')}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City/Town *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={UserDetails.deliveryAddress.city}
                onChange={(e) => handleInputChange(e, 'deliveryAddress')}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">County</label>
              <input
                type="text"
                id="state"
                name="state"
                value={UserDetails.deliveryAddress.state}
                onChange={(e) => handleInputChange(e, 'deliveryAddress')}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="postcode">Postcode *</label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={UserDetails.deliveryAddress.postcode}
                onChange={(e) => handleInputChange(e, 'deliveryAddress')}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country *</label>
              <select
                id="country"
                name="country"
                value={UserDetails.deliveryAddress.country}
                onChange={(e) => handleInputChange(e, 'deliveryAddress')}
                required
              >
                <option value="United Kingdom">United Kingdom</option>
                <option value="Ireland">Ireland</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
              </select>
            </div>
          </div>

          {/* below is the billing address*/} 
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={sameAsBilling}
                onChange={handleSameAsBillingChange}
              />
              <span>Billing address same as delivery address</span>
            </label>
          </div>

          {!sameAsBilling && (
            <div className="billing-address">
              <h3>Billing Address</h3>
              <div className="form-group">
                <label htmlFor="billing-street">Street Address *</label>
                <input
                  type="text"
                  id="billing-street"
                  name="street"
                  value={UserDetails.billingAddress.street}
                  onChange={(e) => handleInputChange(e, 'billingAddress')}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="billing-city">City/Town *</label>
                  <input
                    type="text"
                    id="billing-city"
                    name="city"
                    value={UserDetails.billingAddress.city}
                    onChange={(e) => handleInputChange(e, 'billingAddress')}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="billing-state">County</label>
                  <input
                    type="text"
                    id="billing-state"
                    name="state"
                    value={UserDetails.billingAddress.state}
                    onChange={(e) => handleInputChange(e, 'billingAddress')}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="billing-postcode">Postcode *</label>
                  <input
                    type="text"
                    id="billing-postcode"
                    name="postcode"
                    value={UserDetails.billingAddress.postcode}
                    onChange={(e) => handleInputChange(e, 'billingAddress')}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="billing-country">Country *</label>
                  <select
                    id="billing-country"
                    name="country"
                    value={UserDetails.billingAddress.country}
                    onChange={(e) => handleInputChange(e, 'billingAddress')}
                    required
                  >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Scotland">Scotland</option>
                    <option value="Whales">Whales</option>
                    <option value="Germany">Germany</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* below is the privacy note and proceed to payment*/}
        <section className="checkout-section">
          <div className="privacy-notice">
            <p>We will use your information in accordance with our <a href="#">privacy notice</a>. Updated April 2025.</p>
          </div>
          
          <button type="submit" className="checkout-btn">Proceed to Payment</button>
        </section>
      </form>
    </div>
  );
};

export default CheckoutPage;