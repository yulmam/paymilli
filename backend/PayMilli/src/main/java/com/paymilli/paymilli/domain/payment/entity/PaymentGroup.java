package com.paymilli.paymilli.domain.payment.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.paymilli.paymilli.domain.member.entity.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "payment_group")
public class PaymentGroup {

	@Id
	@GeneratedValue
	@Column
	private UUID id;

	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

	@OneToMany(mappedBy = "paymentGroup")
	private List<Payment> payments;

	@Column(name = "total_price", nullable = false)
	private long totalPrice;

	@Column(name = "transmission_date", nullable = false)
	private LocalDateTime transmissionDate;

	@Column(name = "store_name", nullable = false)
	private String storeName;

	@Column(name = "product_name", nullable = false)
	private String productName;

	// 삭제 여부
	@ColumnDefault("false")
	@Column(nullable = false)
	private boolean deleted;

	@Column
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime createdAt;

	@Column
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime updatedAt;
}
