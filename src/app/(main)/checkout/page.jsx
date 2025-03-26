"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import "./page.css";

const CheckoutPage = () => {
  const { user, loading } = useAuth(); // Add loading from context
  const router = useRouter();
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [errors, setErrors] = useState({});
  const [saveInfo, setSaveInfo] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    deliveryAddress: {
      street: "",
      city: "",
      state: "",
      postcode: "",
      country: "United Kingdom",
    },
    billingAddress: {
      street: "",
      city: "",
      state: "",
      postcode: "",
      country: "United Kingdom",
    },
    deliveryOption: "standard",
  });

  const validateField = (name, value, section = null) => {
    let error = "";

    if (!value.trim()) {
      error = `${name.replace(/([A-Z])/g, " $1")} is required`;
    } else {
      switch (name) {
        case "firstName":
        case "lastName":
          if (!/^[A-Za-z\s]+$/.test(value)) error = "Only letters are allowed";
          break;
        case "email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            error = "Invalid Email format";
          break;
        case "contactNumber":
          if (!/^\d{10,15}$/.test(value)) error = "Must be 10-15 digits";
          break;
        case "postcode":
          if (!/^[A-Z0-9 ]{5,8}$/i.test(value))
            error = "Invalid UK Postcode format";
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
    setUserDetails((prev) => ({
      ...prev,
      [section ? section : name]: section
        ? { ...prev[section], [name]: value }
        : value,
    }));
    validateField(name, value, section);
  };

  const handleSameAsBillingChange = (e) => {
    const checked = e.target.checked;
    setSameAsBilling(checked);
    if (checked) {
      setUserDetails((prev) => ({
        ...prev,
        billingAddress: { ...prev.deliveryAddress },
      }));
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert("Please log in to proceed with checkout.");
      router.push("/login");
      return;
    }

    let newErrors = {};
    let isValid = true;

    Object.entries(userDetails).forEach(([key, value]) => {
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
        }
      }
    });

    setErrors(newErrors);

    if (isValid) {
      console.log("Checkout data submitted:", userDetails);
      
      if (saveInfo) {
        try {
          const response = await fetch("/api/checkout-info", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user.id,
              ...userDetails,
              deliveryAddress: userDetails.deliveryAddress,
              billingAddress: userDetails.billingAddress,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to save checkout information");
          }
        } catch (error) {
          console.error("Error saving checkout info:", error);
        }
      }

      alert("Proceeding to payment...");
      router.push("/payment");
    } else {
      alert("Please correct the errors before proceeding.");
    }
  };

  // Show loading state while checking auth
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="checkout-container">
      <h1 className="heading">Contact Information</h1>
      <form onSubmit={handleSubmit}>
        <section className="checkout-section">
          <h2>1. Delivery Options</h2>
          <div className="delivery-method-options">
            <h3>Delivery Method</h3>
            <div className="radio-group">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="standard"
                  checked={userDetails.deliveryOption === "standard"}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      deliveryOption: e.target.value,
                    })
                  }
                />
                <span className="radio-text">
                  Standard Delivery (4-7 working days)
                </span>
              </label>
            </div>
            <div className="radio-group">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="express"
                  checked={userDetails.deliveryOption === "express"}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      deliveryOption: e.target.value,
                    })
                  }
                />
                <span className="radio-text">
                  Express Delivery (1-2 working days)
                </span>
              </label>
            </div>
          </div>
        </section>

        <section className="checkout-section">
          <h2>2. Contact Details</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={userDetails.firstName}
                onChange={handleInputChange}
                className={errors.firstName ? "input-error" : ""}
                required
              />
              {errors.firstName && (
                <p className="error-message">{errors.firstName}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={userDetails.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? "input-error" : ""}
                required
              />
              {errors.lastName && (
                <p className="error-message">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                className={errors.email ? "input-error" : ""}
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number *</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={userDetails.contactNumber}
                onChange={handleInputChange}
                className={errors.contactNumber ? "input-error" : ""}
                required
              />
              {errors.contactNumber && (
                <p className="error-message">{errors.contactNumber}</p>
              )}
            </div>
          </div>
        </section>

        <section className="checkout-section">
          <h2>3. Delivery Address</h2>
          <div className="form-group">
            <label htmlFor="street">Street Address *</label>
            <input
              type="text"
              id="street"
              name="street"
              value={userDetails.deliveryAddress.street}
              onChange={(e) => handleInputChange(e, "deliveryAddress")}
              className={errors["deliveryAddress.street"] ? "input-error" : ""}
              required
            />
            {errors["deliveryAddress.street"] && (
              <p className="error-message">
                {errors["deliveryAddress.street"]}
              </p>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City/Town *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={userDetails.deliveryAddress.city}
                onChange={(e) => handleInputChange(e, "deliveryAddress")}
                className={errors["deliveryAddress.city"] ? "input-error" : ""}
                required
              />
              {errors["deliveryAddress.city"] && (
                <p className="error-message">
                  {errors["deliveryAddress.city"]}
                </p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="postcode">Postcode *</label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={userDetails.deliveryAddress.postcode}
                onChange={(e) => handleInputChange(e, "deliveryAddress")}
                className={
                  errors["deliveryAddress.postcode"] ? "input-error" : ""
                }
                required
              />
              {errors["deliveryAddress.postcode"] && (
                <p className="error-message">
                  {errors["deliveryAddress.postcode"]}
                </p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="country">Country *</label>
              <select
                id="country"
                name="country"
                value={userDetails.deliveryAddress.country}
                onChange={(e) => handleInputChange(e, "deliveryAddress")}
                className={
                  errors["deliveryAddress.country"] ? "input-error" : ""
                }
                required
              >
                <option value="United Kingdom">United Kingdom</option>
                <option value="Ireland">Ireland</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
              </select>
              {errors["deliveryAddress.country"] && (
                <p className="error-message">
                  {errors["deliveryAddress.country"]}
                </p>
              )}
            </div>
          </div>

          <div className="checkbox-group">
            <label className="flex items-center gap-2">
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
                  value={userDetails.billingAddress.street}
                  onChange={(e) => handleInputChange(e, "billingAddress")}
                  className={
                    errors["billingAddress.street"] ? "input-error" : ""
                  }
                  required
                />
                {errors["billingAddress.street"] && (
                  <p className="error-message">
                    {errors["billingAddress.street"]}
                  </p>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="billing-city">City/Town *</label>
                  <input
                    type="text"
                    id="billing-city"
                    name="city"
                    value={userDetails.billingAddress.city}
                    onChange={(e) => handleInputChange(e, "billingAddress")}
                    className={
                      errors["billingAddress.city"] ? "input-error" : ""
                    }
                    required
                  />
                  {errors["billingAddress.city"] && (
                    <p className="error-message">
                      {errors["billingAddress.city"]}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="billing-state">County</label>
                  <input
                    type="text"
                    id="billing-state"
                    name="state"
                    value={userDetails.billingAddress.state}
                    onChange={(e) => handleInputChange(e, "billingAddress")}
                    className={
                      errors["billingAddress.state"] ? "input-error" : ""
                    }
                  />
                  {errors["billingAddress.state"] && (
                    <p className="error-message">
                      {errors["billingAddress.state"]}
                    </p>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="billing-postcode">Postcode *</label>
                  <input
                    type="text"
                    id="billing-postcode"
                    name="postcode"
                    value={userDetails.billingAddress.postcode}
                    onChange={(e) => handleInputChange(e, "billingAddress")}
                    className={
                      errors["billingAddress.postcode"] ? "input-error" : ""
                    }
                    required
                  />
                  {errors["billingAddress.postcode"] && (
                    <p className="error-message">
                      {errors["billingAddress.postcode"]}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="billing-country">Country *</label>
                  <select
                    id="billing-country"
                    name="country"
                    value={userDetails.billingAddress.country}
                    onChange={(e) => handleInputChange(e, "billingAddress")}
                    className={
                      errors["billingAddress.country"] ? "input-error" : ""
                    }
                    required
                  >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Scotland">Scotland</option>
                    <option value="Wales">Wales</option>
                    <option value="Germany">Germany</option>
                  </select>
                  {errors["billingAddress.country"] && (
                    <p className="error-message">
                      {errors["billingAddress.country"]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="checkout-section">
          <div className="privacy-notice">
            <p>
              We will use your information in accordance with our{" "}
              <a href="#">privacy notice</a>. Updated April 2025.
            </p>
          </div>

          <label
            htmlFor="savePaymentMethod"
            className="flex items-center justify-start gap-2"
          >
            <input
              type="checkbox"
              className="bg-neutral-100 text-black py-4 px-4 rounded-[0.5rem]"
              name="savePaymentMethod"
              checked={saveInfo} // Bind to saveInfo state
              onChange={(e) => setSaveInfo(e.target.checked)} // Update saveInfo
            />
            <span>Save information for future payment</span>
          </label>

          <button type="submit" className="checkout-btn">
            Proceed to Payment
          </button>
        </section>
      </form>
    </div>
  );
};

export default CheckoutPage;