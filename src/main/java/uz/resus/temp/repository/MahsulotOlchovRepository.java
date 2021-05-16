package uz.resus.temp.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.resus.temp.domain.MahsulotOlchov;

/**
 * Spring Data SQL repository for the MahsulotOlchov entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MahsulotOlchovRepository extends JpaRepository<MahsulotOlchov, Long> {}
