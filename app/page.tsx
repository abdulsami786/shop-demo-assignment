'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react';

interface Product {
  brand: string;
  category: string;
  discount: number;
  imageUrl: string;
  name: string;
  newPrice: number;
  oldPrice: number;
  productID: string;
  subCategory: string;
  subSubCategory: string;
  url: string;
}

export default function Home() {
  const ProductCard = ({ product }:{product:Product}) => (
    <div className="relative m-2 md:m-5 flex max-w-[18rem] max-h-[39rem]  md:max-w-1/2 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <a className="relative mx-3 mt-3 flex h-90 overflow-hidden rounded-xl" href="#">
        <Image
          className="object-cover"
          src={product.imageUrl}
          width="330"
          height="495"
          alt="product image"
        />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          {product.discount}% OFF
        </span>
      </a>
      <div className="mt-4 px-5 pb-4">
        <a href="#">
          <h5 className="no-underline text-sm tracking-tight text-slate-900 ">
            {product.name}
          </h5>
        </a>
        <div className="mt-2 mb-2 flex items-center justify-between">
          <p>
            <span className="text-xl font-bold text-slate-900">
              ${product.newPrice}
            </span>
            <span className="ml-2 text-sm text-slate-900 line-through">
              ${product.oldPrice}
            </span>
          </p>
         
        </div>
        <a
          href="#"
          className="flex no-underline items-center justify-center rounded-md bg-slate-900 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          
          Add to cart
        </a>
      </div>
    </div>
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [sortOrder1, setSortOrder1] = useState<'asc' | 'desc'>('asc'); 

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = products.slice(indexOfFirstRecord, indexOfLastRecord);
    
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  
    fetch('https://shop2-a65de-default-rtdb.asia-southeast1.firebasedatabase.app/products.json')
      .then((response) => response.json())
      .then((data) => {
      
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleSort = () => {
    
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';

    // Sort the products based on the price
    const sortedProducts = [...products].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.newPrice - b.newPrice;
      } else {
        return b.newPrice - a.newPrice;
      }
    });


    setProducts(sortedProducts);
    setSortOrder(newSortOrder);
  };

  const handleSortByDiscount = () => {
    const newSortOrder = sortOrder1 === 'asc' ? 'desc' : 'asc';
  
    const sortedProducts = [...products].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.discount - b.discount;
      } else {
        return b.discount - a.discount;
      }
    });
  
    setProducts(sortedProducts);
    setSortOrder1(newSortOrder);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(products.length / recordsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
// Function to handle changing the current page when a page number is clicked
const changePage = (pageNumber: number) => {
  if (pageNumber >= 1 && pageNumber <= Math.ceil(products.length / recordsPerPage)) {
    setCurrentPage(pageNumber);
  }
};
// Calculate the range of page numbers to display (6 pages at a time)
const totalPages = Math.ceil(products.length / recordsPerPage);
const pageRange = 6;
const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
const endPage = Math.min(totalPages, startPage + pageRange - 1);

return (

<div className="container mx-auto mt-2">
      <h1 className="text-xl font-semibold mb-5">Product List</h1>
      <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2   " onClick={handleSort}>
         Sort by Price {sortOrder === 'asc' ? 'High' : 'Low'}
       </button>
       <button className="text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2" onClick={handleSortByDiscount}>
     Sort by Discount {sortOrder1 === 'asc' ? 'High' : 'Low'}
       </button>

      <div className="flex flex-wrap -mx-2">
        {currentRecords.map((product: any, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <div className="mt-5 flex justify-between">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Previous Page
        </button>
        <div className="mb-1 flex justify-center">
        {/* Generate and render page numbers */}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            onClick={() => changePage(startPage + index)}
            className={`mx-1 px-3 py-1 rounded-md text-sm ${currentPage === startPage + index ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white bg-gray-200 text-gray-700'} focus:outline-none`}
          >
            {startPage + index}
          </button>
        ))}
      </div>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(products.length / recordsPerPage)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Next Page
        </button>
      </div>
  
    </div>
    
  );
}
  

