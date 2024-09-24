package com.paymilli.paymilli.domain.payment.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.paymilli.paymilli.domain.card.entity.Card;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "payment")
public class Payment {

	@Id
	@GeneratedValue
	@Column
	private UUID id;

	@ManyToOne
	@JoinColumn(name = "card_id")
	private Card card;

	@ManyToOne
	@JoinColumn(name = "payment_group_id")
	private PaymentGroup paymentGroup;

	// 가격
	@Column(nullable = false)
	private long price;

	// 할부개월
	@Column(nullable = false)
	private int installment;

	// 승인번호
	@Column(nullable = false, name = "approve_number")
	private String approveNumber;

	// 삭제 여부
	@Column(nullable = false)
	@ColumnDefault("false")
	private boolean deleted;


	@Column
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime createdAt;

	@Column
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime updatedAt;

	public void setApproveNumber(String approveNumber) {
		this.approveNumber = approveNumber;
	}
}
