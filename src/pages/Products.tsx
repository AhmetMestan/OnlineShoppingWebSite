import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { allProducts } from '../services/productService'
import { Product } from '../models/IProduct'
import { NavLink } from 'react-router-dom'
import "@fortawesome/fontawesome-free/css/all.min.css";
//Login.css page import 
import '../CSS/Login.css';
import { useNavigate } from "react-router-dom";
import  Pagination  from '../components/Pagination';





function Products() {

  const [arr, setArr] = useState<Product[]>([])
  const [page, setPage] = useState<number>(1); // Mevcut sayfa
  const [perPage, setPerPage] = useState<number>(12); // Sayfa başına ürün sayısı
  const [total_pages, setTotalPages] = useState<number>(1); // Toplam sayfa sayısı
  const [loading, setLoading] = useState<boolean>(false); // Yükleme durumu
  const navigate = useNavigate();

useEffect(() => {
  setLoading(true);
  allProducts(page.toString() , perPage.toString()).then(response => {
setArr(response.data.data) //ürünler
console.log("Toplam sayfa sayısı : " + response.data.meta.total_pages);
setTotalPages(response.data.meta.total_pages); //toplam sayfa sayısı
setLoading(false); //yükleme durumu
  })
}, [page, perPage]) // page veya perPage değiştiğinde yeniden çalışır
const handlePageChange = (newPage: number) => {
  setPage(newPage); // Sayfa değiştirme
};

// Sayfa numaralarını oluşturma
const renderPageNumbers = () => {
  const pages = [];
  const maxPagesToShow = 5; // Gösterilecek maksimum sayfa sayısı
  let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(total_pages, startPage + maxPagesToShow - 1);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        style={{
          margin: '0 5px',
          padding: '5px 10px',
          backgroundColor: i === page ? '#007bff' : '#fff',
          color: i === page ? '#fff' : '#000',
          border: '1px solid #ddd',
          cursor: 'pointer',
        }}
      >
        {i}
      </button>
    );
  }

  return pages;
};

  return (
    <>
   <h2>Products</h2>
<div className="row">

   {arr.map((item ,index)=> 
   <div className="col-12 col-md-4 col-lg-4 mb-4" key={index}>
  
    
   <div className="card text-center " onClick={() => navigate(`/productDetail/${item.id}`)} // Kartın tamamını tıklanabilir yapıyoruz
   style={{ cursor: "pointer" }} >
  <img src={item.images[0]} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{item.title}</h5>
    <p className="card-text">{item.price}</p>
    <NavLink to={'/productDetail/'+ item.id} className="btn btn-primary cart-button btn-block"><i className="fas fa-shopping-cart mr-2"></i> Sepete Ekle</NavLink>

  </div>
</div>
</div>
    )}
    </div>

 {/* Pagination Bileşeni */}
 <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          style={{ margin: '0 5px', padding: '5px 10px', cursor: 'pointer' }}
        >
          Önceki
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === total_pages}
          style={{ margin: '0 5px', padding: '5px 10px', cursor: 'pointer' }}
        >
          Sonraki
        </button>
      </div>
      
    </>
  )
}

export default Products



