import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface StripePaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
  disabled: boolean;
  customerEmail: string;
}

export const StripePayment = ({
  amount,
  onSuccess,
  onError,
  disabled,
  customerEmail,
}: StripePaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onError("");
    if (disabled) {
      onError("Compila tutti i campi obbligatori");
      return;
    }

    setIsProcessing(true);

    if (!stripe || !elements) {
      onError("Stripe non è inizializzato");
      return;
    }

    // 1. Chiama il backend per creare un PaymentIntentF
    fetch("http://localhost:8080/payments/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amount * 100, // Converti in centesimi
        currency: "eur",
        prenotazioneEmail: customerEmail,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // 2. Conferma il pagamento con Stripe
        return stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        });
      })
      .then((result) => {
        if (result.error) {
          onError(t("PaymentDeclined"));
        } else {
          onSuccess(); // Pagamento riuscito!
          onError("");
        }
      })
      .catch(() => {
        onError("Errore durante il pagamento");
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
  options={{
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        lineHeight: '24px' 
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: true, 
    classes: {
      focus: 'stripe-focus', 
    }
  }}
/>
      <button
        type="submit"
        disabled={!stripe || isProcessing || disabled}
        className="btn btn-primary mt-3"
      >
        {isProcessing ? "Processing..." : `Paga ${amount}€`}
      </button>
    </form>
  );
};
export default StripePayment;
