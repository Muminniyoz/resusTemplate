package uz.resus.temp.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.resus.temp.domain.MahsulotVariant;

/**
 * Spring Data SQL repository for the MahsulotVariant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MahsulotVariantRepository extends JpaRepository<MahsulotVariant, Long> {}
