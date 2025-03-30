"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import './page.css';

const CheckoutPage = () => {
  const router = useRouter();
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [UserDetails, setUserDetails] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    ContactNumber: "",
    DeliveryAddress: {
      HouseNumber: "",
      Street: "",
      City: "",
      Postcode: "",
      State: ""
    },
    BillingAddress: {
      HouseNumber: "",
      Street: "",
      City: "",
      Postcode: "",
      State: ""
    }
  });

// Updates the user details state whenever an input field is changed.
  // Also triggers validation if the form has already been submitted.  
    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate the field if form has been submitted already
    if (formSubmitted) {
      const error = getFieldError(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  // it will updates   same like the user details.
  const handleAddressChange = (type, e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [name]: value
      }
    }));

    // Validate the field if form has been submitted already
    if (formSubmitted) {
      const error = getFieldError(name, value);
      setErrors(prev => ({
        ...prev,
        [`${type}.${name}`]: error
      }));
    }
  };

  // Toggles the 'same as billing' checkbox and copies delivery address to billing if checked.
  // Also clears any validation errors related to the billing address if the addresses are synced.
  const handleCheckboxChange = () => {
    setSameAsBilling(!sameAsBilling);
    
    // If checked done, copy delivery address to billing address
    if (!sameAsBilling) {
      setUserDetails(prev => ({
        ...prev,
        BillingAddress: { ...prev.DeliveryAddress }
      }));

      // Clear billing address errors if we're copying from delivery
      if (formSubmitted) {
        let newErrors = { ...errors };
        Object.keys(newErrors)
          .filter(key => key.startsWith('BillingAddress'))
          .forEach(key => delete newErrors[key]);
        setErrors(newErrors);
      }
    }
  };

  //Returns error messages based on validation rules for different fields.
  const getFieldError = (name, value) => {
    if (!value || !value.toString().trim()) {
      return `${name.replace(/([A-Z])/g, " $1").trim()} is required`;
    }
    
    switch (name) {
      case "FirstName":
      case "LastName":
        if (!/^[A-Za-z\s]+$/.test(value)) return "Only letters are allowed";
        break;
      case "Email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid Email format";
        break;
      case "ContactNumber":
        if (!/^\d{10,15}$/.test(value)) return "Must be 10-15 digits";
        break;
      case "Postcode":
        if (!/^[A-Z0-9]{1,4} ?[0-9][A-Z]{2}$/i.test(value)) return "Invalid UK Postcode format";
        break;
      case "HouseNumber":
        if (!/^[0-9a-zA-Z\s\-\/\.]+$/.test(value)) return "Invalid house number format";
        break;
    }
    
    return "";
  };

  // Validate all form fields
  const validateAllFields = () => {
    let newErrors = {};
    let isValid = true;

    
    ["FirstName", "LastName", "Email", "ContactNumber"].forEach(field => {
      const error = getFieldError(field, UserDetails[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    
    Object.entries(UserDetails.DeliveryAddress).forEach(([key, value]) => {
      if (key !== "State") { // Skip optional State field
        const error = getFieldError(key, value);
        if (error) {
          newErrors[`DeliveryAddress.${key}`] = error;
          isValid = false;
        }
      }
    });

   
    if (!sameAsBilling) {
      Object.entries(UserDetails.BillingAddress).forEach(([key, value]) => {
        if (key !== "State") { // Skip optional State field
          const error = getFieldError(key, value);
          if (error) {
            newErrors[`BillingAddress.${key}`] = error;
            isValid = false;
          }
        }
      });
    }

    // Update errors state with all validation results at once
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Set formSubmitted to true BEFORE validation
    setFormSubmitted(true);
    
    const isValid = validateAllFields();
    
    if (isValid) {
      console.log("Checkout data submitted:", UserDetails);
      alert("Proceeding to payment...");
      router.push("/payment");
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
      <h1 className="heading">Checkout</h1>
      
      <form onSubmit={handleSubmit} noValidate>
        <section className="checkout-section">
          <h2>Personal Details</h2>
          
          <div className="form-row">
            <div className={`form-group ${errors.FirstName ? "has-error" : ""}`}>
              <label htmlFor="FirstName" className="required">First Name</label>
              <input
                type="text"
                id="FirstName"
                name="FirstName"
                value={UserDetails.FirstName}
                onChange={handleInputChange}
                className={errors.FirstName ? "input-error" : ""}
              />
              {errors.FirstName && <span className="error-message">{errors.FirstName}</span>}
            </div>
            
            <div className={`form-group ${errors.LastName ? "has-error" : ""}`}>
              <label htmlFor="LastName" className="required">Last Name</label>
              <input
                type="text"
                id="LastName"
                name="LastName"
                value={UserDetails.LastName}
                onChange={handleInputChange}
                className={errors.LastName ? "input-error" : ""}
              />
              {errors.LastName && <span className="error-message">{errors.LastName}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className={`form-group ${errors.Email ? "has-error" : ""}`}>
              <label htmlFor="Email" className="required">Email Address</label>
              <input
                type="email"
                id="Email"
                name="Email"
                value={UserDetails.Email}
                onChange={handleInputChange}
                className={errors.Email ? "input-error" : ""}
              />
              {errors.Email && <span className="error-message">{errors.Email}</span>}
            </div>
            
            <div className={`form-group ${errors.ContactNumber ? "has-error" : ""}`}>
              <label htmlFor="ContactNumber" className="required">Contact Number</label>
              <input
                type="tel"
                id="ContactNumber"
                name="ContactNumber"
                value={UserDetails.ContactNumber}
                onChange={handleInputChange}
                className={errors.ContactNumber ? "input-error" : ""}
              />
              {errors.ContactNumber && <span className="error-message">{errors.ContactNumber}</span>}
            </div>
          </div>
        </section>
        
        <section className="checkout-section">
          <h2>Delivery Address</h2>
          
          <div className="form-row">
            <div className={`form-group ${errors['DeliveryAddress.HouseNumber'] ? "has-error" : ""}`}>
              <label htmlFor="dHouseNumber" className="required">House Number</label>
              <input
                type="text"
                id="dHouseNumber"
                name="HouseNumber"
                value={UserDetails.DeliveryAddress.HouseNumber}
                onChange={(e) => handleAddressChange('DeliveryAddress', e)}
                className={errors['DeliveryAddress.HouseNumber'] ? "input-error" : ""}
              />
              {errors['DeliveryAddress.HouseNumber'] && 
                <span className="error-message">{errors['DeliveryAddress.HouseNumber']}</span>}
            </div>
            
            <div className={`form-group ${errors['DeliveryAddress.Street'] ? "has-error" : ""}`}>
              <label htmlFor="dStreet" className="required">Street</label>
              <input
                type="text"
                id="dStreet"
                name="Street"
                value={UserDetails.DeliveryAddress.Street}
                onChange={(e) => handleAddressChange('DeliveryAddress', e)}
                className={errors['DeliveryAddress.Street'] ? "input-error" : ""}
              />
              {errors['DeliveryAddress.Street'] && 
                <span className="error-message">{errors['DeliveryAddress.Street']}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className={`form-group ${errors['DeliveryAddress.City'] ? "has-error" : ""}`}>
              <label htmlFor="dCity" className="required">City</label>
              <input
                type="text"
                id="dCity"
                name="City"
                value={UserDetails.DeliveryAddress.City}
                onChange={(e) => handleAddressChange('DeliveryAddress', e)}
                className={errors['DeliveryAddress.City'] ? "input-error" : ""}
              />
              {errors['DeliveryAddress.City'] && 
                <span className="error-message">{errors['DeliveryAddress.City']}</span>}
            </div>
            
            <div className={`form-group ${errors['DeliveryAddress.Postcode'] ? "has-error" : ""}`}>
              <label htmlFor="dPostcode" className="required">Postcode</label>
              <input
                type="text"
                id="dPostcode"
                name="Postcode"
                value={UserDetails.DeliveryAddress.Postcode}
                onChange={(e) => handleAddressChange('DeliveryAddress', e)}
                className={errors['DeliveryAddress.Postcode'] ? "input-error" : ""}
              />
              {errors['DeliveryAddress.Postcode'] && 
                <span className="error-message">{errors['DeliveryAddress.Postcode']}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dState">County/State (optional)</label>
              <input
                type="text"
                id="dState"
                name="State"
                value={UserDetails.DeliveryAddress.State}
                onChange={(e) => handleAddressChange('DeliveryAddress', e)}
              />
            </div>
          </div>
        </section>
        
        <section className="checkout-section">
          <h2>Billing Address</h2>
          
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="sameAsBilling"
              checked={sameAsBilling}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="sameAsBilling">Same as delivery address</label>
          </div>
          
          {!sameAsBilling && (
            <>
              <div className="form-row">
                <div className={`form-group ${errors['BillingAddress.HouseNumber'] ? "has-error" : ""}`}>
                  <label htmlFor="bHouseNumber" className="required">House Number</label>
                  <input
                    type="text"
                    id="bHouseNumber"
                    name="HouseNumber"
                    value={UserDetails.BillingAddress.HouseNumber}
                    onChange={(e) => handleAddressChange('BillingAddress', e)}
                    className={errors['BillingAddress.HouseNumber'] ? "input-error" : ""}
                  />
                  {errors['BillingAddress.HouseNumber'] && 
                    <span className="error-message">{errors['BillingAddress.HouseNumber']}</span>}
                </div>
                
                <div className={`form-group ${errors['BillingAddress.Street'] ? "has-error" : ""}`}>
                  <label htmlFor="bStreet" className="required">Street</label>
                  <input
                    type="text"
                    id="bStreet"
                    name="Street"
                    value={UserDetails.BillingAddress.Street}
                    onChange={(e) => handleAddressChange('BillingAddress', e)}
                    className={errors['BillingAddress.Street'] ? "input-error" : ""}
                  />
                  {errors['BillingAddress.Street'] && 
                    <span className="error-message">{errors['BillingAddress.Street']}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className={`form-group ${errors['BillingAddress.City'] ? "has-error" : ""}`}>
                  <label htmlFor="bCity" className="required">City</label>
                  <input
                    type="text"
                    id="bCity"
                    name="City"
                    value={UserDetails.BillingAddress.City}
                    onChange={(e) => handleAddressChange('BillingAddress', e)}
                    className={errors['BillingAddress.City'] ? "input-error" : ""}
                  />
                  {errors['BillingAddress.City'] && 
                    <span className="error-message">{errors['BillingAddress.City']}</span>}
                </div>
                
                <div className={`form-group ${errors['BillingAddress.Postcode'] ? "has-error" : ""}`}>
                  <label htmlFor="bPostcode" className="required">Postcode</label>
                  <input
                    type="text"
                    id="bPostcode"
                    name="Postcode"
                    value={UserDetails.BillingAddress.Postcode}
                    onChange={(e) => handleAddressChange('BillingAddress', e)}
                    className={errors['BillingAddress.Postcode'] ? "input-error" : ""}
                  />
                  {errors['BillingAddress.Postcode'] && 
                    <span className="error-message">{errors['BillingAddress.Postcode']}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bState">County/State (optional)</label>
                  <input
                    type="text"
                    id="bState"
                    name="State"
                    value={UserDetails.BillingAddress.State}
                    onChange={(e) => handleAddressChange('BillingAddress', e)}
                  />
                </div>
              </div>
            </>
          )}
        </section>
        
        <div className="privacy-notice">
          <p>
            By submitting this form, you agree to our <a href="/privacy-policy">Privacy Policy</a> and 
            <a href="/terms-of-service"> Terms of Service</a>. Your personal information will be processed 
            in accordance with our policies.
          </p>
        </div>
        
        <button type="submit" className="submit-button">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;