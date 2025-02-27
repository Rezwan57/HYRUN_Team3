"use client";
import { useState, useEffect } from "react";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    description: "",
    category_id: "",
    brand_id: "",
    gender_id: "",
    buying_price: "",
    selling_price: "",
    stock_quantity: "",
    size_id: [],
    color_id: [],
    images: [],
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [genders, setGenders] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
    fetch("/api/brands")
      .then((res) => res.json())
      .then(setBrands);
    fetch("/api/genders")
      .then((res) => res.json())
      .then(setGenders);
    fetch("/api/sizes")
      .then((res) => res.json())
      .then(setSizes);
    fetch("/api/colors")
      .then((res) => res.json())
      .then(setColors);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (name === "name") {
      const slug = value
        .toLowerCase()
        .replace(/\s+/g, "-") 
        .replace(/[^\w\-]+/g, "") 
        .replace(/\-\-+/g, "-");
      setFormData({ ...formData, [name]: value, slug });
    } else if (type === "file") {
      setFormData({ ...formData, images: Array.from(files) });
    } else if (type === "checkbox") {
      const list = [...formData[name]];
      if (e.target.checked) {
        list.push(value);
      } else {
        const index = list.indexOf(value);
        if (index > -1) list.splice(index, 1);
      }
      setFormData({ ...formData, [name]: list });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();

    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((val) => submitData.append(`${key}[]`, val));
      } else {
        submitData.append(key, formData[key]);
      }
    });

    formData.images.forEach((file) => submitData.append("images[]", file));

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: submitData,
      });

      if (response.ok) {
        alert("Product added successfully!");
        setFormData({
          slug: "",
          name: "",
          description: "",
          category_id: "",
          brand_id: "",
          gender_id: "",
          buying_price: "",
          selling_price: "",
          stock_quantity: "",
          size_id: [],
          color_id: [],
          images: [],
        });
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSizeChange = (size_id) => {
    const newSizes = formData.size_id.includes(size_id)
      ? formData.size_id.filter((id) => id !== size_id)
      : [...formData.size_id, size_id];
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      size_id: newSizes,
    }));
  };
  
  const handleColorChange = (color_id) => {
    const newColors = formData.color_id.includes(color_id)
      ? formData.color_id.filter((id) => id !== color_id)
      : [...formData.color_id, color_id];
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      color_id: newColors,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.category_name}
            </option>
          ))}
        </select>

        <select
          name="brand_id"
          value={formData.brand_id}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand.brand_id} value={brand.brand_id}>
              {brand.brand_name}
            </option>
          ))}
        </select>

        <select
          name="gender_id"
          value={formData.gender_id}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Gender</option>
          {genders.map((gender) => (
            <option key={gender.gender_id} value={gender.gender_id}>
              {gender.gender_name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="buying_price"
          placeholder="Buying Price"
          value={formData.buying_price}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="selling_price"
          placeholder="Selling Price"
          value={formData.selling_price}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="stock_quantity"
          placeholder="Stock Quantity"
          value={formData.stock_quantity}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <div>
          <label className="block mb-2">Select Sizes:</label>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              <div
                key={size.size_id}
                onClick={() => handleSizeChange(size.size_id)}
                className={`cursor-pointer px-4 py-2 m-2 rounded-lg text-center ${
                  formData.size_id.includes(size.size_id)
                    ? "border-2 border-blue-500"
                    : "border border-gray-300"
                }`}
              >
                UK {size.uk_size} / US {size.us_size} / EU {size.eu_size}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2">Select Colors:</label>
          <div className="flex flex-wrap">
            {colors.map((color) => (
              <div
                key={color.color_id}
                onClick={() => handleColorChange(color.color_id)}
                className={`cursor-pointer px-4 py-2 m-2 rounded-lg text-center flex items-center justify-center ${
                  formData.color_id.includes(color.color_id)
                    ? "border-2 border-blue-500"
                    : "border border-gray-300"
                }`}
              >
                <span style={{ backgroundColor: color.hex_code }} className="w-4 h-4 rounded- mr-2"></span>
                {color.color_name}
              </div>
            ))}
          </div>
        </div>

        <input
          type="file"
          name="images"
          onChange={handleChange}
          accept="image/*"
          multiple
          className="border p-2 w-full"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
