package com.paymilli.paymilli.domain.payment.service;

import com.paymilli.paymilli.domain.payment.entity.PaymentGroup;

public interface PaymentDetailService {

	boolean requestPaymentGroup(PaymentGroup paymentGroup);

	boolean refundPaymentGroup(PaymentGroup paymentGroup);

}
