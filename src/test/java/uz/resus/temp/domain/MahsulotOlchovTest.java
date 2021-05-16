package uz.resus.temp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.resus.temp.web.rest.TestUtil;

class MahsulotOlchovTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MahsulotOlchov.class);
        MahsulotOlchov mahsulotOlchov1 = new MahsulotOlchov();
        mahsulotOlchov1.setId(1L);
        MahsulotOlchov mahsulotOlchov2 = new MahsulotOlchov();
        mahsulotOlchov2.setId(mahsulotOlchov1.getId());
        assertThat(mahsulotOlchov1).isEqualTo(mahsulotOlchov2);
        mahsulotOlchov2.setId(2L);
        assertThat(mahsulotOlchov1).isNotEqualTo(mahsulotOlchov2);
        mahsulotOlchov1.setId(null);
        assertThat(mahsulotOlchov1).isNotEqualTo(mahsulotOlchov2);
    }
}
