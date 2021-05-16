package uz.resus.temp.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.resus.temp.domain.Mahsulot;

/**
 * Spring Data SQL repository for the Mahsulot entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MahsulotRepository extends JpaRepository<Mahsulot, Long> {}
