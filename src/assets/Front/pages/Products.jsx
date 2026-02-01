import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import { formatCurrency } from "../utils/formatters";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/products`);
      setProducts(res.data.products);
    } catch (error) {
      console.error('取得產品失敗', error.response?.data?.message)
    }
  }

  useEffect(() => {
    (async() => {
      getProducts()
    })()
  }, [])

  return (
    <>
      <div className="container">
        <div className="row row-gap-3">
          {products.map((product) => (
            <div className="col-lg-4 col-md-6" key={product.id}>
              <div className="card h-100">
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={`${product.title}圖片`}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">
                    <strong>NT{formatCurrency(product.price)}</strong>元
                    <span> / {product.unit}</span>
                  </p>
                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-primary align-self-end"
                  >
                    查看更多
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
