package com.cardcompany.cardcompany.domain.transaction.util;

import com.cardcompany.cardcompany.domain.transaction.entity.CardType;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ThreadLocalRandom;
import org.springframework.stereotype.Component;

@Component
public class ApproveNumberUtils {

    public String makeApproveNumber(CardType cardType) {
        StringBuilder approveNumber = new StringBuilder();
        if (cardType == CardType.CHECK) {
            approveNumber.append("CH");
        }
        if (cardType == CardType.CREDIT) {
            approveNumber.append("CR");
        }

        approveNumber.append(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")));

        String randomCode = String.valueOf(ThreadLocalRandom.current().nextInt(100000, 1000000));
        approveNumber.append(randomCode);

        return approveNumber.toString();
    }

}
