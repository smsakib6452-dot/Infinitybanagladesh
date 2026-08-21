/**
 * Payment Provider Abstraction Layer for Infinity Bangladesh
 * Provides clean architecture for bKash, Nagad, Bank Transfer, and Online Gateways.
 */

export type PaymentMethod = 'bKash' | 'Nagad' | 'Bank Transfer' | 'Online Gateway' | 'In-Kind / Physical Support';

export interface PaymentInitiationParams {
  amountBDT: number;
  donorName: string;
  donorEmail?: string;
  donorPhone?: string;
  campaignSlug?: string;
  campaignTitle?: string;
  donationType: 'one-time' | 'monthly' | 'campaign-specific';
  isAnonymous?: boolean;
}

export interface PaymentInitiationResult {
  success: boolean;
  paymentMethod: PaymentMethod;
  transactionReference: string;
  redirectUrl?: string;
  instructions: {
    en: string[];
    bn: string[];
  };
  manualVerificationRequired: boolean;
  message?: string;
}

export interface PaymentVerificationParams {
  paymentMethod: PaymentMethod;
  transactionReference: string;
  senderTransactionId: string;
  senderPhone?: string;
  amountBDT: number;
}

export interface PaymentVerificationResult {
  verified: boolean;
  status: 'Pending' | 'Successful' | 'Failed' | 'Refunded';
  receiptNumber: string;
  verifiedAt: string;
  message: string;
}

export interface IPaymentProvider {
  id: PaymentMethod;
  name: string;
  isConfigured(): boolean;
  initiatePayment(params: PaymentInitiationParams): Promise<PaymentInitiationResult>;
  verifyPayment(params: PaymentVerificationParams): Promise<PaymentVerificationResult>;
}

// Environment Config helper (safely inspects env without exposing secrets)
export const PaymentConfig = {
  isBkashConfigured: Boolean((import.meta as any)?.env?.VITE_BKASH_APP_KEY || false),
  isNagadConfigured: Boolean((import.meta as any)?.env?.VITE_NAGAD_MERCHANT_ID || false),
  isGatewayConfigured: Boolean((import.meta as any)?.env?.VITE_PAYMENT_API_KEY || false),
};

/**
 * bKash Provider Implementation
 */
export class BkashProvider implements IPaymentProvider {
  id: PaymentMethod = 'bKash';
  name = 'bKash (বিকাশ)';

  isConfigured(): boolean {
    return PaymentConfig.isBkashConfigured;
  }

  async initiatePayment(params: PaymentInitiationParams): Promise<PaymentInitiationResult> {
    const trxRef = `BK-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    return {
      success: true,
      paymentMethod: 'bKash',
      transactionReference: trxRef,
      manualVerificationRequired: !this.isConfigured(),
      instructions: {
        en: [
          'Open your bKash App or dial *247#',
          'Select "Send Money" or "Payment" to our official verified number',
          `Enter Amount: ৳${params.amountBDT}`,
          `Enter Reference: ${trxRef.slice(0, 10)}`,
          'Enter your bKash PIN to confirm transaction',
          'Copy the Transaction ID (TrxID) and submit it below to receive your official receipt.'
        ],
        bn: [
          'আপনার বিকাশ অ্যাপ খুলুন অথবা *247# ডায়াল করুন',
          'আমাদের অফিসিয়াল নাম্বারে "Send Money" অথবা "Payment" নির্বাচন করুন',
          `টাকার পরিমাণ লিখুন: ৳${params.amountBDT}`,
          `রেফারেন্স হিসেবে দিন: ${trxRef.slice(0, 10)}`,
          'আপনার বিকাশ পিন নম্বর দিয়ে লেনদেন সম্পন্ন করুন',
          'প্রাপ্ত ট্রানজেকশন আইডি (TrxID) নিচের বক্সে লিখে নিশ্চিত করুন।'
        ]
      }
    };
  }

  async verifyPayment(params: PaymentVerificationParams): Promise<PaymentVerificationResult> {
    const receiptNumber = `REC-BK-${Date.now().toString().slice(-6)}`;
    return {
      verified: true,
      status: 'Successful',
      receiptNumber,
      verifiedAt: new Date().toISOString(),
      message: 'bKash donation record successfully logged and queued for audit verification.'
    };
  }
}

/**
 * Nagad Provider Implementation
 */
export class NagadProvider implements IPaymentProvider {
  id: PaymentMethod = 'Nagad';
  name = 'Nagad (নগদ)';

  isConfigured(): boolean {
    return PaymentConfig.isNagadConfigured;
  }

  async initiatePayment(params: PaymentInitiationParams): Promise<PaymentInitiationResult> {
    const trxRef = `NG-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    return {
      success: true,
      paymentMethod: 'Nagad',
      transactionReference: trxRef,
      manualVerificationRequired: !this.isConfigured(),
      instructions: {
        en: [
          'Open your Nagad App or dial *167#',
          'Select "Send Money" to our verified official number',
          `Enter Amount: ৳${params.amountBDT}`,
          `Enter Reference: ${trxRef.slice(0, 10)}`,
          'Enter your Nagad PIN to confirm',
          'Copy the 8-character Transaction ID (TxnID) and enter it below.'
        ],
        bn: [
          'আপনার নগদ অ্যাপ ওপেন করুন অথবা *167# ডায়াল করুন',
          'অফিসিয়াল নাম্বারে "Send Money" নির্বাচন করুন',
          `টাকার পরিমাণ: ৳${params.amountBDT}`,
          `রেফারেন্স: ${trxRef.slice(0, 10)}`,
          'পিন দিয়ে লেনদেন সম্পন্ন করুন এবং প্রাপ্ত ট্রানজেকশন আইডি নিচে জমা দিন।'
        ]
      }
    };
  }

  async verifyPayment(params: PaymentVerificationParams): Promise<PaymentVerificationResult> {
    const receiptNumber = `REC-NG-${Date.now().toString().slice(-6)}`;
    return {
      verified: true,
      status: 'Successful',
      receiptNumber,
      verifiedAt: new Date().toISOString(),
      message: 'Nagad donation successfully logged and queued for audit verification.'
    };
  }
}

/**
 * Bank Transfer Provider Implementation
 */
export class BankTransferProvider implements IPaymentProvider {
  id: PaymentMethod = 'Bank Transfer';
  name = 'Bank Transfer (ব্যাংক ট্রান্সফার)';

  isConfigured(): boolean {
    return true;
  }

  async initiatePayment(params: PaymentInitiationParams): Promise<PaymentInitiationResult> {
    const trxRef = `BNK-${Date.now().toString(36).toUpperCase()}`;

    return {
      success: true,
      paymentMethod: 'Bank Transfer',
      transactionReference: trxRef,
      manualVerificationRequired: true,
      instructions: {
        en: [
          'Transfer via NPSB / BEFTN / RTGS or direct branch deposit to our official bank account',
          `Deposit Amount: ৳${params.amountBDT}`,
          `Remarks / Narrative: ${trxRef}`,
          'Keep your transaction deposit slip or online banking reference number',
          'Submit the reference number below to record your contribution.'
        ],
        bn: [
          'NPSB / BEFTN / সরাসরি ব্যাংকে গিয়ে আমাদের প্রাতিষ্ঠানিক একাউন্টে টাকা জমা দিন',
          `জমার পরিমাণ: ৳${params.amountBDT}`,
          `রেফারেন্স বা বিবরণী: ${trxRef}`,
          'জমা স্লিপ বা অনলাইন রেফারেন্স নম্বরটি নিচে এন্ট্রি করে রসিদ সংগ্রহ করুন।'
        ]
      }
    };
  }

  async verifyPayment(params: PaymentVerificationParams): Promise<PaymentVerificationResult> {
    const receiptNumber = `REC-BNK-${Date.now().toString().slice(-6)}`;
    return {
      verified: true,
      status: 'Pending',
      receiptNumber,
      verifiedAt: new Date().toISOString(),
      message: 'Bank transfer record recorded. Verification occurs once bank clearance confirms deposit.'
    };
  }
}

/**
 * Main Payment Service Factory
 */
export class PaymentService {
  private static providers: Record<PaymentMethod, IPaymentProvider> = {
    'bKash': new BkashProvider(),
    'Nagad': new NagadProvider(),
    'Bank Transfer': new BankTransferProvider(),
    'Online Gateway': new BkashProvider(), // Fallback
    'In-Kind / Physical Support': new BankTransferProvider()
  };

  static getProvider(method: PaymentMethod): IPaymentProvider {
    return this.providers[method] || this.providers['bKash'];
  }

  static async processDonation(method: PaymentMethod, params: PaymentInitiationParams): Promise<PaymentInitiationResult> {
    const provider = this.getProvider(method);
    return provider.initiatePayment(params);
  }

  static async verifyDonation(method: PaymentMethod, params: PaymentVerificationParams): Promise<PaymentVerificationResult> {
    const provider = this.getProvider(method);
    return provider.verifyPayment(params);
  }
}
