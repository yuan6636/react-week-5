import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

import { formatCurrency } from '../utils/formatters';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const SingleProduct = () => {
  const params = useParams();
  const { id } = params;

  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleChangeQty = (e) => {
    const { value } = e.target;
    const regex = /^[1-9]*$/g;

    // 檢查產品數量是否為數字
    if (value && regex.test(value)) {
      setQty(Number(value));
    }
  };

  const increaseQty = () => {
    setQty(prevQty => prevQty + 1)
  };

  const decreaseQty = () => {
    setQty((prevQty) => {
      return prevQty <= 1 ? 1 :prevQty - 1;
    });
  };

  const addToCart = async () => {
    const data = {
      data: {
        "product_id": product.id,
        qty
      }
    }
    try {
      const res = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, data);
      alert(res.data.message || '已成功加入購物車！');
      navigate('/cart');
    } catch (error) {
      const errMsg = error?.response?.data?.message || error.message;
      console.error('加入購物車失敗:', errMsg);
      navigate(-1);
      alert('加入購物車失敗!');
    }
  }

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/api/${API_PATH}/product/${id}`,
        );
        setProduct(res.data.product);
      } catch (error) {
        const errMsg = error.response?.data?.message || error.message;
        console.error('取得產品失敗:', errMsg);
        setProduct(null);
      } finally {
        // 資料取得完成或失敗後，將 loading 狀態改成 false
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return (<div className='position-fixed top-50 start-50 fs-1 text-secondary fw-bold'>Loading...</div>)
  }

  return (
    <>
      <div className="container py-2">
        <div className="row">
          <div className="col-lg-6">
            <img
              className="mb-3 w-100"
              src={product.imageUrl || null}
              alt={`${product.title}圖片`}
              height={400}
            />
            <ul className="row row-cols-lg-5 row-cols-sm-3 row-cols-2 row-gap-3">
              {product.imagesUrl?.map((url, index) => {
                return (
                  <li className="col" key={index}>
                    <img
                      className="w-100"
                      src={url}
                      alt={`${product.title}圖片`}
                      height={100}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-lg-6 p-4">
            <h1>{product.title}</h1>
            <p className="fs-5 mb-3">
              類別：<span>{product.category}</span>
            </p>
            <div className="mb-3">
              <p className="fw-bold">商品內容：</p>
              <p>{product.content}</p>
            </div>
            <div className="mb-5">
              <p className="fw-bold">詳細介紹：</p>
              <p>{product.description}</p>
            </div>
            <div>
              <p>
                原價：
                <span>
                  <del className="me-3">
                    NT<span>{formatCurrency(product.origin_price)}</span>
                  </del>
                  <strong className="text-danger">
                    NT<span>{formatCurrency(product.price)}</span>
                  </strong>
                </span>
              </p>
            </div>
            <div>
              <p>
                單位：<span>{product.unit}</span>
              </p>
            </div>
            <div className="d-flex flex-xxl-row flex-column justify-content-between align-items-xxl-center gap-4">
              <div className="d-flex align-items-center">
                <label className="me-2" htmlFor="count">
                  數量：
                </label>
                <div className="input-group w-auto">
                  <button
                    className="btn btn-warning"
                    type="button"
                    id="button-addon1"
                    onClick={(e) => increaseQty(e)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-plus"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                  </button>
                  <input
                    id="count"
                    type="text"
                    className="form-control text-center"
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                    value={qty}
                    inputMode="numeric"
                    pattern="[1-9]*"
                    onChange={handleChangeQty}
                  />
                  <button
                    className="btn btn-warning"
                    type="button"
                    id="button-addon1"
                    onClick={decreaseQty}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-dash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary align-self-start me-2"
                  onClick={() => addToCart()}
                >
                  加入購物車
                </button>
                <Link
                  to="/products"
                  type="button"
                  className="btn btn-secondary"
                >
                  返回列表
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
