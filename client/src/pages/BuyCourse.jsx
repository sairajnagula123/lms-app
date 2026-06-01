import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import loadRazorpay from "../utils/loadRazorpay";

import "./BuyCourse.css";

function BuyCourse() {

  const { id } = useParams();

  const API_URL =
    process.env.REACT_APP_API_URL;

  const [course, setCourse] =
    useState(null);

  useEffect(() => {

    const fetchCourse =
      async () => {

        const res =
          await axios.get(
            `${API_URL}/api/courses/${id}`
          );

        setCourse(res.data);
      };

    fetchCourse();

  }, [id, API_URL]);

  const handlePayment =
    async () => {

      const loaded = await loadRazorpay();

      console.log("Loaded:", loaded);
      console.log("window.Razorpay:", window.Razorpay);

      if (!loaded) {
        alert("Razorpay failed to load");
        return;
      }

      const user =
        JSON.parse(
          localStorage.getItem(
            "user"
          )
        );

      const { data } =
        await axios.post(
          `${API_URL}/api/payment/create-order`,
          {
            courseId:
              course._id,
          }
        );

      const options = {

        key: "rzp_test_SwEtTRS8E3wn9r", // paste your actual Razorpay Test Key ID

        amount:
          data.order.amount,

        currency:
          data.order.currency,

        order_id:
          data.order.id,

        name:
          "LMS Platform",

        description:
          course.title,

        handler: async function (response) {
            await axios.post(
              `${API_URL}/api/payment/verify-payment`,
              {
                ...response,
                userId: user._id,
                courseId: course._id,
                amount: course.price,
              }
            );

            alert("Course Purchased Successfully");
        },
      };

      const paymentObject =
        new window.Razorpay(
          options
        );

      paymentObject.open();
    };

  if (!course)
  return (
    <h2 className="loading-text">
      Loading...
    </h2>
  );

  return (
    <div className="buy-course-container">
      <div className="buy-course-card">

        <img
          src={course.thumbnail}
          alt={course.title}
          className="buy-course-image"
        />

        <div className="buy-course-content">

          <h2 className="buy-course-title">
            {course.title}
          </h2>

          <p className="buy-course-description">
            {course.description}
          </p>

          <h3 className="buy-course-price">
            ₹{course.price}
          </h3>

          <button
            className="buy-course-btn"
            onClick={handlePayment}
          >
            Buy Now
          </button>

        </div>
      </div>
    </div>
  );
}

export default BuyCourse;