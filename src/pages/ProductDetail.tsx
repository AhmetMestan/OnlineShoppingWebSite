import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa'
import { singleProduct } from '../services/productService'
import { Product } from '../models/IProduct'
 



function ProductDetail() {

  const [bigImage, setbigImage] = useState('')

  const [item, setitem] = useState<Product>()

  const params = useParams()

  const [IsLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!IsLiked);
  };

  

  useEffect(() => {
    const pid = params.pid
    if (pid) {
      singleProduct(pid).then(response => {
        setitem(response.data.data)
        setbigImage(response.data.data.images[0])
      })
    }
  }, [])

  return (
    <>
      {item && (
        <div className="container mt-4">
          <div className="row">
            {/* Sol Taraf - Ürün Görselleri */}
            <div className="col-md-5">
              <div className="border p-3 bg-white">
                <img src={bigImage} className="img-fluid rounded shadow-sm" alt="Ürün Görseli" />
                <div className="d-flex justify-content-center gap-2 mt-3">
                  {item.images.map((image, index) => (
                    <img
                      key={index}
                      role="button"
                      onClick={() => setbigImage(image)}
                      src={image}
                      className="img-thumbnail border"
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
  
            {/* Sağ Taraf - Ürün Bilgileri & Satın Alma Alanı */}
            <div className="col-md-7 ">
              <div className="border p-4 bg-white d-flex flex-column justify-content-center "  style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px',minHeight: '480px' }}>
                <h2 className="mb-2">{item.title}</h2>
                <p className="text-muted">Marka: {item.brand || "Bilinmiyor"}</p>
  
                {/* Kullanıcı Puanı */}
                <div className="d-flex align-items-center mb-3">
                  <span className="badge bg-warning text-dark">{item.rating || "4.5"}</span>
                  <small className="ms-2">({item.reviews || "120"} Değerlendirme)</small>
                </div>
  
                {/* Fiyat Bilgisi */}
                <h3 className="text-success fw-bold">
                  {item.discountPrice ? (
                    <>
                      <span className="text-decoration-line-through text-muted me-2">
                        ${item.price}
                      </span>
                      ${item.discountPrice}
                    </>
                  ) : (
                    `$${item.price}`
                  )}
                </h3>
  
                {/* Stok Durumu */}
                <p className="mt-2">
                  {item.stock > 0 ? (
                    <span className="text-success fw-bold">Stokta Var</span>
                  ) : (
                    <span className="text-danger fw-bold">Tükendi</span>
                  )}
                </p>
  
                {/* Kargo Bilgisi */}
                <p className="text-muted">
                  📦 Ücretsiz Kargo & Tahmini Teslimat: <strong>2-3 gün</strong>
                </p>
  
                {/* Satıcı Bilgisi */}
                <p className="text-muted">
                  🏪 Satıcı: <strong>{item.seller || "Yetkili Satıcı"}</strong>
                </p>
  
                {/* Butonlar */}
                <div className="d-flex gap-3 mt-4">
      <button 
        className="btn fw-bold py-2 w-100 custom-orange-btn"
        style={{ backgroundColor: '#ff6b00', color: 'white' }}
      >
        <FaShoppingCart className="me-2" />
        Sepete Ekle
      </button>
      
      <button
  className="btn p-0 border-0 bg-transparent"
  onClick={handleLike}
  style={{ boxShadow: 'none' }}
>
  {IsLiked ? (
    <FaHeart className="text-danger" size={24}/>
  ) : (
    <FaRegHeart size={24} />
  )}
</button>
    </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
  
}

export default ProductDetail