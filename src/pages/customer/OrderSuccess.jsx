import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../../../api.js";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const orderId = params.get("orderId");

        if (!orderId) {
          navigate("/");
          return;
        }

        const token = localStorage.getItem("token");

        await axios.post(
          `${API}/api/order/verify-payment`,
          { orderId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        navigate("/order-trace");
      } catch (error) {
        console.log("Verify Error:", error);
        navigate("/order-trace");
      }
    };

    verifyPayment();
  }, []);

  return <h2>Payment Success...</h2>;
};

export default OrderSuccess;