"use client";
import { useState, useEffect } from "react";
import ProductSlider from "@/components/ProductSlider"; // კომპონენტის სწორი იმპორტი

export default function Home() {
  const [productData, setProductData] = useState<any[]>([]); // პროდუქციის მონაცემები
  const [loading, setLoading] = useState(true); // თუ დაველოდებით მონაცემების დატვირთვას
  const [error, setError] = useState<string | null>(null); // შეცდომა

  useEffect(() => {
    // აქ ხდება API-ს გაზრდა
    const fetchProductData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products"); // fakestoreapi.com-დან მონაცემების მიღება
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProductData(data); // აქ გსურთ მონაცემების დაწერა
      } catch (error) {
        setError("Failed to load products"); // თუ მოხდა შეცდომა
      } finally {
        setLoading(false); // დაიწია მონაცემების დატვირთვის პროცესი
      }
    };

    fetchProductData();
  }, []); // მხოლოდ ერთხელ დავამთავრებთ ამ პროცესს

  if (loading) return <div>Loading...</div>; // თუ ტვირთავს, დაიმახსოვრეთ
  if (error) return <div>Error: {error}</div>; // თუ შეცდომაა

  return (
    <div style={{ maxWidth: "1170px", margin: "auto", marginTop: "150px" }}>
      <ProductSlider rows={1} products={productData} />
      <ProductSlider rows={2} products={productData} />
    </div>
  );
}
