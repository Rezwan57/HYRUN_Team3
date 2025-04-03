"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import "./page.css";

const CheckoutPage = () => {
  const router = useRouter(); 
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [UserDetails, setUserDetails] = useState({
      FirstName: '',
      LastName: '',
      ContactNumber: '',
      Email: '',
      DeliveryAddress: {
      Street: '',
      City: '',
      State: '',
      Postcode: '',
      Country: 'United Kingdom'
    },
      BillingAddress: {
      Street: '',
      City: '',
      State: '',
      Postcode: '',
      Country: 'United Kingdom'
    },
    DeliveryOption: 'standard'
  });

  const validateField = (name, value, section = null) => {
    let error = "";

    if (!value.trim()) {
      error = `${name.replace(/([A-Z])/g, " $1")} is required`;
    } else {
      switch (name) {
        case "FirstName":
        case "LastName":
          if (!/^[A-Za-z\s]+$/.test(value)) error = "Only letters are allowed";
          break;
        case "Email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid Email format";
          break;
        case "ContactNumber":
          if (!/^\d{10,15}$/.test(value)) error = "Must be 10-15 digits";
          break;
        case "Postcode":
          if (!/^[A-Z0-9 ]{5,8}$/i.test(value)) error = "Invalid UK Postcode format";
          break;
        default:
          break;
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [section ? `${section}.${name}` : name]: error,
    }));

    return !error;
  };

  const handleInputChange = (e, section = null) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [section ? section : name]: section ? { ...prev[section], [name]: value } : value,
    }));
    validateField(name, value, section);
  };
  

  const handleSameAsBillingChange = (e) => {
    const checked = e.target.checked;
    setSameAsBilling(checked);
    if (checked) {
      setUserDetails((prev) => ({
        ...prev,
        BillingAddress: { ...prev.DeliveryAddress },
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let newErrors = {};
    let isValid = true;
  
    Object.entries(UserDetails).forEach(([key, value]) => {
      if (typeof value === "object") {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (!validateField(subKey, subValue, key)) {
            newErrors[`${key}.${subKey}`] = true;
            isValid = false;
          }
        });
      } else {
        if (!validateField(key, value)) {
          newErrors[key] = true;
          isValid = false;
          console.log(`Validation failed for ${key}: ${value}`); // Debug log
        }
      }
    });
  
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Set formSubmitted to true BEFORE validation
    setFormSubmitted(true);
    
    const isValid = validateAllFields();
    
    if (isValid) {
      console.log("Checkout data submitted:", userDetails);
      // ... rest of your submit logic
    } else {
      //this will ensure that css styles are applied immediately
      setTimeout(() => {
        // Find and scroll to the first error element
        const firstErrorElement = document.querySelector('.input-error');
        if (firstErrorElement) {
          firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstErrorElement.focus();
        }
      }, 0);
      
      alert("Please fill in all required fields before proceeding.");
    }
  };
  
  return (
    <div className="checkout-container">
      <h1 className="heading">Billing Details</h1>


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
                  name="DeliveryOption"
                  value="standard"
                  checked={UserDetails.DeliveryOption === 'standard'}
                  onChange={(e) => setUserDetails({...UserDetails, DeliveryOption: e.target.value})}
                />
                <span className="radio-text">Standard Delivery (4-7 working days)</span>
              </label>
            </div>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="DeliveryOption"
                  value="express"
                  checked={UserDetails.DeliveryOption === 'express'}
                  onChange={(e) => setUserDetails({...UserDetails, DeliveryOption: e.target.value})}
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
              <label htmlFor="FirstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={userDetails.firstName}
                onChange={handleInputChange}
                className={errors.FirstName ? "input-error" : ""}
                required
              />
              {errors.FirstName && <p className="error-message">{errors.FirstName}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="LastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={userDetails.lastName}
                onChange={handleInputChange}
                className={errors.LastName ? "input-error" : ""}
                required
              />
              {errors.LastName && <p className="error-message">{errors.LastName}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="Email">Email Address *</label>
              <input
                type="Email"
                id="Email"
                name="Email"
                value={UserDetails.Email}
                onChange={handleInputChange}
                className={errors.Email ? "input-error" : ""}
                required
              />
             {errors.Email && <p className="error-message">{errors.Email}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="ContactNumber">Contact Number *</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={userDetails.contactNumber}
                onChange={handleInputChange}
                className={errors.ContactNumber ? "input-error" : ""}
                required
              />
              {errors.ContactNumber && <p className="error-message">{errors.ContactNumber}</p>}
            </div>
          </div>
        </section>

        {/* below is the delivery address*/}

        <section className="checkout-section">
          <h2>3. Delivery Address</h2>
          <div className="form-group">
            <label htmlFor="Street">Street Address *</label>
            <input
              type="text"
              id="Street"
              name="Street"
              value={UserDetails.DeliveryAddress.Street}
              onChange={(e) => handleInputChange(e, 'DeliveryAddress')}
              className={errors['DeliveryAddress.Street'] ? "input-error" : ""}
              required
            />
            {errors['DeliveryAddress.Street'] && <p className="error-message">{errors['DeliveryAddress.Street']}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="City">City/Town *</label>
              <input
                type="text"
                id="City"
                name="City"
                value={UserDetails.DeliveryAddress.City}
                onChange={(e) => handleInputChange(e, 'DeliveryAddress')}
                className={errors['DeliveryAddress.City'] ? "input-error" : ""}
                required
              />
              {errors['DeliveryAddress.City'] && <p className="error-message">{errors['DeliveryAddress.City']}</p>}
            </div>
            
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="Postcode">Postcode *</label>
              <input
                type="text"
                id="Postcode"
                name="Postcode"
                value={UserDetails.DeliveryAddress.Postcode}
                onChange={(e) => handleInputChange(e, 'DeliveryAddress')}
                className={errors['DeliveryAddress.Postcode'] ? "input-error" : ""}
                required
              />
              {errors['DeliveryAddress.Postcode'] && <p className="error-message">{errors['DeliveryAddress.Postcode']}</p>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="Country">Country *</label>
              <select
                id="Country"
                name="Country"
                value={UserDetails.DeliveryAddress.Country}
                onChange={(e) => handleInputChange(e, 'DeliveryAddress')}
                className={errors['DeliveryAddress.Country'] ? "input-error" : ""}
                required
              >
                <option value="United Kingdom">United Kingdom</option>
                <option value="Ireland">Ireland</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
              </select>
              {errors['DeliveryAddress.Country'] && <p className="error-message">{errors['DeliveryAddress.Country']}</p>}
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
                <label htmlFor="billing-Street">Street Address *</label>
                <input
                  type="text"
                  id="billing-Street"
                  name="Street"
                  value={UserDetails.BillingAddress.Street}
                  onChange={(e) => handleInputChange(e, 'BillingAddress')}
                  className={errors['BillingAddress.Street'] ? "input-error" : ""}
                  required
                />
                {errors['BillingAddress.Street'] && <p className="error-message">{errors['BillingAddress.Street']}</p>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="billing-City">City/Town *</label>
                  <input
                    type="text"
                    id="billing-City"
                    name="City"
                    value={UserDetails.BillingAddress.City}
                    onChange={(e) => handleInputChange(e, 'BillingAddress')}
                    className={errors['BillingAddress.City'] ? "input-error" : ""}
                    required
                  />
                  {errors['BillingAddress.City'] && <p className="error-message">{errors['BillingAddress.City']}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="billing-State">County</label>
                  <input
                    type="text"
                    id="billing-State"
                    name="State"
                    value={UserDetails.BillingAddress.State}
                    onChange={(e) => handleInputChange(e, 'BillingAddress')}
                    className={errors['BillingAddress.State'] ? "input-error" : ""}
                  />
                  {errors['BillingAddress.State'] && <p className="error-message">{errors['BillingAddress.State']}</p>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="billing-Postcode">Postcode *</label>
                  <input
                    type="text"
                    id="billing-Postcode"
                    name="Postcode"
                    value={UserDetails.BillingAddress.Postcode}
                    onChange={(e) => handleInputChange(e, 'BillingAddress')}
                    className={errors['BillingAddress.Postcode'] ? "input-error" : ""}
                    required
                  />
                  {errors['BillingAddress.Postcode'] && <p className="error-message">{errors['BillingAddress.Postcode']}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="billing-Country">Country *</label>
                  <select
                    id="billing-Country"
                    name="Country"
                    value={UserDetails.BillingAddress.Country}
                    onChange={(e) => handleInputChange(e, 'BillingAddress')}
                    className={errors['BillingAddress.Country'] ? "input-error" : ""}
                    required
                  >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Scotland">Scotland</option>
                    <option value="Whales">Whales</option>
                    <option value="Germany">Germany</option>
                  </select>
                  {errors['BillingAddress.Country'] && <p className="error-message">{errors['BillingAddress.Country']}</p>}
                </div>
              </div>
            </>
          )}
        </section>

        {/* below is the privacy note and proceed to payment*/}
        <section className="checkout-section">
          <div className="privacy-notice">
            <p>We will use your information in accordance with our <a href="#">privacy notice</a>. Updated April 2025.</p>
          </div>
          
          <button 
          type="submit" 
          className="checkout-btn">Proceed to Payment</button>
        </section>
      </form>
    </div>
  );
};

export default CheckoutPage;

