import React, { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import styled from "styled-components";
import PaymentItem from "../../components/card/PaymentItem";
import PaymentDetail from "../../components/card/PaymentDetails";
import NavBar from "components/layout/NavBar";
import { PaymentItemProps } from "../../types/card/cardTypes";
import { getPaymentHistoryAPI, getPaymentDetailAPI } from "../../api/cardApi";
import { PaymentDetailProps } from "../../types/card/cardTypes";
import RefreshIcon from "../../components/common/RefreshIcon";
import UpDownArrow from "../../assets/upDownArrow.png";

export default function PaymentHistoryPage() {
  const [paymentsdata, setPayments] = useState<PaymentItemProps[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<PaymentItemProps[]>(
    [],
  );
  const [selectedPaymentDetail, setSelectedPaymentDetail] = useState<
    PaymentDetailProps["payment"] | null
  >(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null,
  );
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [showOnlyCompleted, setShowOnlyCompleted] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isDescending, setIsDescending] = useState<boolean>(true);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const accessToken = Cookies.get("accessToken");

  const loadPayments = useCallback(async () => {
    try {
      const transactions = await getPaymentHistoryAPI(accessToken || "");
      setPayments(transactions);
      setFilteredPayments(transactions);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const loadPaymentDetail = async (paymentId: string) => {
    try {
      setLoadingDetail(true);
      const paymentDetail = await getPaymentDetailAPI(
        paymentId,
        accessToken || "",
      );
      const payment = paymentsdata.find((p) => p.id === paymentId);

      setSelectedPaymentDetail(paymentDetail);
      setSelectedPaymentId(paymentId);
      setSelectedPaymentStatus(payment?.paymentStatus || null);

      // window.scrollTo({
      //   top: 0,
      //   behavior: "smooth",
      // });
    } catch (error) {
      console.error("Error fetching payment detail:", error);
    } finally {
      setLoadingDetail(false);
    }
  };

  const filterPaymentsByDate = useCallback(() => {
    let filtered = paymentsdata;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      filtered = filtered.filter((payment) => {
        const paymentDate = new Date(payment.date);
        return paymentDate >= start && paymentDate <= end;
      });
    }

    if (showOnlyCompleted) {
      filtered = filtered.filter(
        (payment) => payment.paymentStatus === "PAYMENT",
      );
    }

    if (!isDescending) {
      filtered = filtered.slice().reverse();
    }

    setFilteredPayments(filtered);
    setSelectedPaymentDetail(null);
    setSelectedPaymentId(null);
  }, [startDate, endDate, showOnlyCompleted, paymentsdata, isDescending]);

  const toggleTooltip = () => {
    setIsTooltipVisible(true);
  };

  const hideTooltip = () => {
    setIsTooltipVisible(false);
  };

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  useEffect(() => {
    filterPaymentsByDate();
  }, [filterPaymentsByDate]);

  const toggleShowOnlyCompleted = () => {
    setShowOnlyCompleted((prev) => !prev);
  };

  const handleClearDates = () => {
    setStartDate("");
    setEndDate("");
  };

  const toggleSortOrder = () => {
    setIsDescending((prev) => !prev);
  };

  if (loading) {
    return <div style={{ marginTop: 200 }}>로딩 중...</div>;
  }

  return (
    <>
      <NavBar />
      <PaymentHistoryContainer>
        <FilterContainer>
          <SummaryAndButtonWrapper>
            <ToggleButton
              active={showOnlyCompleted}
              onClick={toggleShowOnlyCompleted}
            >
              결제 완료만 보기
            </ToggleButton>
            <PaymentSummary>
              총 {filteredPayments.length}건의 결제
            </PaymentSummary>
            <ArrowIconWrapper
              onMouseEnter={toggleTooltip}
              onMouseLeave={hideTooltip}
            >
              <ArrowIcon
                src={UpDownArrow}
                alt="UpDown Arrow"
                onClick={toggleSortOrder}
              />
              {isTooltipVisible && (
                <Tooltip>
                  {isDescending ? "오래된순으로 보기" : "최신순으로 보기"}
                </Tooltip>
              )}
            </ArrowIconWrapper>
          </SummaryAndButtonWrapper>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label>
              조회하기
              <StyledDateInput
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                onKeyDown={(e) => e.preventDefault()}
                max={endDate}
              />
            </label>
            <label>
              ~
              <StyledDateInput
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                onKeyDown={(e) => e.preventDefault()}
                min={startDate}
              />
            </label>
            <RefreshIconWrapper onClick={handleClearDates}>
              <RefreshIcon />
            </RefreshIconWrapper>
          </div>
        </FilterContainer>
        <hr />
        <PaymentContentContainer>
          <PaymentList>
            {filteredPayments.length === 0 ? (
              <NoData>조회된 거래내역이 없습니다.</NoData>
            ) : (
              filteredPayments.map((payment) => (
                <PaymentItem
                  key={payment.id}
                  id={payment.id}
                  storeName={payment.storeName}
                  detail={payment.detail}
                  price={payment.price}
                  date={payment.date}
                  paymentStatus={payment.paymentStatus}
                  isSelected={payment.id === selectedPaymentId}
                  onClick={() => loadPaymentDetail(payment.id)}
                />
              ))
            )}
          </PaymentList>
          <PaymentDetailSection>
            {loadingDetail ? (
              <div style={{ marginTop: 200 }}>세부 정보 로딩 중...</div>
            ) : selectedPaymentDetail ? (
              selectedPaymentDetail.storeName ? (
                <>
                  <PaymentDetail
                    payment={selectedPaymentDetail}
                    isRefund={selectedPaymentStatus === "REFUND"}
                  />
                </>
              ) : (
                <div>세부 정보가 없습니다.</div>
              )
            ) : (
              <NoData>확인하실 내역을 선택해주세요.</NoData>
            )}
          </PaymentDetailSection>
        </PaymentContentContainer>
        <hr />
      </PaymentHistoryContainer>
    </>
  );
}

const PaymentHistoryContainer = styled.div`
  margin: 20px auto;
  font-family: Arial, sans-serif;
  width: 900px;
  margin-top: 120px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  label {
    font-size: 16px;
    margin-right: 8px;
  }
  input {
    margin-left: 8px;
  }
`;

const SummaryAndButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PaymentSummary = styled.div`
  font-size: 16px;
  flex-grow: 1;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) =>
    active ? "var(--main-color)" : "#ffffff"};
  color: ${({ active }) => (active ? "#ffffff" : "var(--main-color)")};
  border: 1px solid var(--main-color);
  border-radius: 8px;
  padding: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) =>
      active ? "var(--main-color)" : "#f0f0f0"};
  }
`;

const StyledDateInput = styled.input`
  background-color: #ffffff;
  border: 1px solid var(--main-color);
  padding: 4px;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  width: 110px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--main-color);
  }

  &::-webkit-inner-spin-button,
  &::-webkit-calendar-picker-indicator {
    -webkit-appearance: none;
  }
`;

const NoData = styled.div`
  font-size: 18px;
  color: #b2bec3;
  text-align: center;
  padding: 40px;
  border: 1px solid #dfe6e9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

const PaymentContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PaymentList = styled.div`
  width: 50%;
`;

const PaymentDetailSection = styled.div`
  width: 45%;
  padding-left: 20px;
  border-left: 1px solid #ddd;
`;

const RefreshIconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ArrowIconWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const ArrowIcon = styled.img`
  width: 18px;
  height: 18px;
  vertical-align: middle;
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 10;
  opacity: 0.9;
  pointer-events: none;
`;
