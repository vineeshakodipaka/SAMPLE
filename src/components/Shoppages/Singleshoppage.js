import React, { useEffect, useState } from "react";
import spimg1 from "../../Images/image 55.png";

import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import "./Singleshoppage.css";
import Shopcardslide from "./Shopcardslide";
import Shopcardslide2 from "./Shopcardslide2";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { useCartContext } from "../../CartContext";
import { addToCart, fetchProducts } from "../../actions";
import { useSpring, animated } from "react-spring";

const Singleshoppage = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showInfo1, setShowInfo1] = useState(false);
  //single cartpage

  const { handleAddToCart } = useCartContext(); // Use the useCartContext hook to access the handleAddToCart function
  const navigate = useNavigate();
  const [showCartPopup, setShowCartPopup] = useState(false);

  const userId = Cookies.get("userId"); // Use your method to get the user ID from cookies
  const { cardId } = useParams() || {};
  const card = useSelector((state) =>
    state.products.filteredProducts.find(
      (product) => product.Product_id === cardId
    )
  );
  const notificationAnimation = useSpring({
    opacity: showCartPopup ? 1 : 0,
    transform: showCartPopup ? "translateY(0)" : "translateY(-100%)",
  });
  const dispatch = useDispatch();

  const [Qty, setQty] = useState("1");
  const [selectedImage, setSelectedImage] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);


  const handleImageClick = (newImage) => {
    setSelectedImage(newImage);
  };
  // Handle input change for custom quantity
  const handleInputChange = (e) => {
    const inputNumber = parseInt(e.target.value, 10);
    if (!isNaN(inputNumber) && inputNumber >= 1 && inputNumber <= 100) {
      setQty(inputNumber.toString());
      // Removed the setSelectedQuantity line since selectedQuantity is not used
      console.log(Qty);
    } else {
      setQty("1");
    }
  };

  // Toggle showInfo state for product information
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  // Toggle showInfo1 state for additional information
  const toggleInfo1 = () => {
    setShowInfo1(!showInfo1);
  };

  //single cart

 useEffect(() => {
   if (!dataLoaded) {
     dispatch(fetchProducts());

     if (card && card.Product_img) {
       setSelectedImage(card.Product_img);
       setDataLoaded(true);
     }
   }
 }, [cardId, dispatch, card, dataLoaded]);
  if (!card) {
    return (
      <Container>
        <p>Card not found.</p>
      </Container>
    );
  }
 
  const handleAddToCart3 = () => {
    setShowCartPopup(true);

    setTimeout(() => {
      setShowCartPopup(false);
    }, 8000); // Updated to 5 seconds
  };

  const handleAddToCart1 = (product, Qty) => {
    window.scrollTo(0, 0);
    if (!userId) {
      dispatch(addToCart(product, Qty));
      setShowCartPopup(true);
    } else {
      setShowCartPopup(true);
    }
  };

  const handleViewCart = () => {
    setShowCartPopup(false); // Close the popup
    if (!userId) {
      navigate("/cartpage"); // Navigate to cartpage if userId is not available
    } else {
      navigate("/cart"); // Navigate to cart if userId is available
    }
  };

  return (
    <div className="singleproductpage">
      <div className="position-relative mb-3">
        <img src={spimg1} width="100%" style={{ height: "250px" }} alt="img" />
        <h3
          className="position-absolute top-50 start-50 translate-middle"
          style={{ color: "white" }}
        >
          {card.Product_name}
        </h3>
      </div>
      <Container>
        <Row className="justify-content-center d-md-flex flex-md-row d-sm-block">
          <Col
            lg={2}
            md={2}
            className="pt-md-4 px-xl-5 mt-md-5 imgcol order-md-0 order-2"
          >
            <Row className="justify-content-center mt-md-0 mt-4">
              <Col md={12} xs={3}>
                <img
                  src={card.Product_img2}
                  alt="product"
                  className="pb-3"
                  onClick={() => handleImageClick(card.Product_img2)}
                />
              </Col>
              <Col md={12} xs={3}>
                <img
                  src={card.Product_img3}
                  alt="product"
                  className="pb-3"
                  onClick={() => handleImageClick(card.Product_img3)}
                />
              </Col>
              <Col md={12} xs={3}>
                <img
                  src={card.Product_img}
                  alt="product"
                  className="pb-3"
                  onClick={() => handleImageClick(card.Product_img)}
                />
              </Col>
            </Row>
          </Col>
          <Col lg={4} md={4} className="mt-md-5 order-md-1 order-1">
            <div>
              <br />
              <Card style={{ border: "none" }}>
                <Card.Img
                  variant="top"
                  className=" singlecardprdctimg p-3"
                  src={selectedImage}
                  alt="product"
                  style={{
                    boxShadow: "0 2px 10px rgba(0,0,0,.1)",
                    border: "none",
                  }}
                />
              </Card>
            </div>
          </Col>

          {/* carameldiv column */}
          <Col lg={6} md={6} className="px-xl-5 order-md-1 order-3">
            <div className="carameldiv mt-md-5">
              <p className="fs-3">{card.Product_name}</p>
              {card.isSale && (
                <button
                  className="sale-button rounded-3  px-4"
                  style={{
                    background: "#DC0000",
                    border: "none",
                    color: "white",
                  }}
                >
                  Sale
                </button>
              )}
              <p className="fs-4 mb-1 mt-1">
                Price
                <br />
                {card.isSale ? (
                  <span className="fw-bold">₹{card.Product_offerPrice}</span>
                ) : (
                  <span className="fw-bold">₹{card.Product_originalPrice}</span>
                )}
                &nbsp;
                {card.isSale && (
                  <span className="fw-normal" style={{ color: "#B8B8B8" }}>
                    <s>₹{card.Product_originalPrice}</s>
                  </span>
                )}
              </p>
              <p className="fs-4 fw-bolder ">Description:</p>
              <p className="mt-3">{card.Product_desc}</p>
              <div>
                <Row className="quantitycls mt-4 mb-5">
                  <Col>
                    <div className="mb-2">
                      <div className="d-flex">
                        <h6 className="mt-1">Quantity:</h6>
                        <div>
                          <input
                            className="quantity"
                            type="number"
                            placeholder="1"
                            value={Qty}
                            onChange={handleInputChange}
                            style={{ width: "50px" }}
                          />
                        </div>
                      </div>
                    </div>

                    <button className="px-4 p-3 mt-3 mb-2 text-center rounded-4 shareproductbtn">
                      {" "}
                      Share this Product
                    </button>
                  </Col>
                  <Col>
                    <button
                      className="p-md-3 p-2 px-lg-4 px-md-3 p-lg-3 text-center addtocart"
                      onClick={() => {
                        handleAddToCart(card, Qty);
                        handleAddToCart1(card, Qty);
                        handleAddToCart3();
                      }}
                    >
                      ADD TO CART
                      <FaArrowRight
                        className="ms-2 rounded-circle  text-black p-1"
                        style={{ backgroundColor: "#FFDAA9" }}
                      />
                    </button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>

        <center>
          {/* Buttons to toggle product information and additional information */}
          <button
            className="mx-5 mt-2 mb-2 p-3 text-center rounded-4 productinfobtn"
            onClick={toggleInfo1}
          >
            Product Information
          </button>
          <button
            className="mx-5 mt-2 mb-2 p-3 text-center rounded-4 additionalinfotbtn"
            onClick={toggleInfo}
          >
            Additional Info
          </button>
        </center>

        {/* Welcome paragraphs */}
        <div className="welcomeparaclses">
          {showInfo1 && (
            <Row className=" text-center mt-5 mb-4">
              <Col>
                {/* Product welcome information */}
                Welcome to the world of natural and organic. Here you can
                discover the bounty of nature. We have grown on the principles
                of health, ecology, and care. We aim to give our customers a
                healthy chemical-free meal for perfect nutrition. It offers
                about 8-10% carbs. Simple sugars — such as glucose and fructose
                — make up 70% and 80% of the carbs in raw. Welcome to the world
                of natural and organic. Here you can discover the bounty of
                nature. We have grown on the principles of health, ecology, and
                care. We aim to give our customers a healthy chemical-free meal
                for perfect nutrition. It offers about 8–10% healthy
                chemical-free meal for perfect nutrition. It offers about 8-10%
                carbs. Simple sugars — such as glucose and fructose — make up
                70% and 80% of the carbs in raw.
              </Col>
            </Row>
          )}

          {showInfo && (
            <Row className="text-center mt-5 mb-4">
              <p>
                {/* Additional welcome information */}
                Welcome to the world of natural and organic. Here you can
                discover the bounty of nature. We have grown on the principles
                of health, ecology, and care. We aim to give our customers a
                healthy chemical-free meal for perfect nutrition. It offers
                about 8-10% carbs. Simple sugars — such as glucose and fructose
                — make up 70% and 80% of the carbs in raw.
              </p>
              <p>
                Welcome to the world of natural and organic. Here you can
                discover the bounty of nature. We have grown on the principles
                of health, ecology, and care. We aim to give our customers a
                healthy chemical-free meal for perfect nutrition. It offers
                about 8-10% carbs. Simple sugars — such as glucose and fructose
                — make up 70% and 80% of the carbs in raw.
              </p>
            </Row>
          )}

          <Row className="relaprds">
            <h3 className=" text-center mt-5 mb-4">Related Products</h3>
            {/* Render related products from the Shoppage component */}
            <Shopcardslide />
            <Shopcardslide2 />
          </Row>
        </div>
      </Container>

      {/* Cart Pop-up */}
      <animated.div
        className="notification m-2"
        style={{
          ...notificationAnimation,
          position: "fixed",
          top: 0,
          right: 0,
        }}
      >
        <Card className="popupcart text-center pt-2 pb-2 ">
          <p>Item Added to Cart</p>
          <p>Your item has been added to the cart.</p>
          <Container className="d-flex justify-content-center align-items-center ">
            <ButtonGroup>
              <Button
                className="cartpopupbtn2 p-2 rounded-3"
                onClick={handleViewCart}
              >
                View Cart
              </Button>
              <Button
                className="cartpopupbtn1 p-2 px-4 mx-1 rounded-3"
                onClick={() => setShowCartPopup(false)}
              >
                Close
              </Button>
            </ButtonGroup>
          </Container>
        </Card>
      </animated.div>
    </div>
  );
};

export default Singleshoppage;
