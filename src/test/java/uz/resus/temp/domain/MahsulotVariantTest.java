package uz.resus.temp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.resus.temp.web.rest.TestUtil;

class MahsulotVariantTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MahsulotVariant.class);
        MahsulotVariant mahsulotVariant1 = new MahsulotVariant();
        mahsulotVariant1.setId(1L);
        MahsulotVariant mahsulotVariant2 = new MahsulotVariant();
        mahsulotVariant2.setId(mahsulotVariant1.getId());
        assertThat(mahsulotVariant1).isEqualTo(mahsulotVariant2);
        mahsulotVariant2.setId(2L);
        assertThat(mahsulotVariant1).isNotEqualTo(mahsulotVariant2);
        mahsulotVariant1.setId(null);
        assertThat(mahsulotVariant1).isNotEqualTo(mahsulotVariant2);
    }
}
