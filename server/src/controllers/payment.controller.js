import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import crypto from "crypto";

function generateEsewaSignature(secretkey, signatureString) {
  return crypto
    .createHash("sha256", secretkey)
    .update(signatureString)
    .digest("base64");
}

const initiatePayment = asyncHandler(async (req, res) => {
  const { amount, method, transactionId } = req.body;
  if (!transactionId) {
    throw new ApiError(400, "transactionId is required");
  }
  if (!amount) {
    throw new ApiError(400, "could not find amount ");
  }
  try {
    if (method == "Esewa") {
      const txnUUID = `${Date.now()}-${uuidv4()}`;
      const escConfig = {
        amount: Number(amount).toFixed(0),
        failure_url: process.env.ESEWA_FAILURE_URL,
        product_delivery_charge: "0",
        product_service_charge: "0",
        product_code: "EPAYTEST",
        signature: "i94zsd3oXF6ZsSr/kGqT4sSzYQzjj1W/waxjWyRwaME=",
        signed_field_names: "amount,total_amount,transaction_uuid,product_code",
        success_url: process.env.ESEWA_SUCCESS_URL,
        tax_amount: "10",
        total_amount: Number(amount).toFixed(0),
        transaction_uuid: txnUUID,
      };

      const signatureString = `amount=${escConfig.amount},total_amount=${escConfig.total_amount},transaction_uuid=${escConfig.transaction_uuid},product_code=${escConfig.product_code}`;
      const signature = generateEsewaSignature(
        process.env.ESEWA_SECRET_KEY,
        signatureString
      );
      const payload = {
        ...escConfig,
        signature,
      };

      return res
        .status(200)
        .json( new ApiResponse(200, payload, "payment successfull"));
    } else if (method == "Khalti") {
      const khaltiConfig = {
        return_url: `${process.env.BASE_URL}/success?method=khalti`,
        website_url: process.env.BASE_URL,
        amount: Math.round(parseFloat(amount) * 100), // amount in paisa
        purchase_order_id: transactionId,
        purchase_order_name: productName,
        customer_info: {
          // Test user info required by Khalti sandbox
          name: "Test User",
          email: "test@example.com",
          phone: "9800000000",
        },
      };
      const response = await fetch(
        "https://a.khalti.com/api/v2/epayment/initiate/",
        {
          method: "POST",
          headers: {
            Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(khaltiConfig),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Khalti API Error:", errorData);
        return res
          .status(500)
          .json({ error: "Khalti API failed", details: errorData });
      }
      const khaltiRes = await response.json();

      return res
        .status(200)
        .json( new ApiResponse(200, khaltiRes.payment_url, "payment successfull"));
    } else {
      return res
        .status(400)
        .json( new ApiResponse(400, "", "invalid payment method"));
    }
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, "something went wrong during payment"));
  }
});

export {
  initiatePayment
}