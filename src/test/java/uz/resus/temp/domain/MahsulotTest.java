package uz.resus.temp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.resus.temp.web.rest.TestUtil;

class MahsulotTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mahsulot.class);
        Mahsulot mahsulot1 = new Mahsulot();
        mahsulot1.setId(1L);
        Mahsulot mahsulot2 = new Mahsulot();
        mahsulot2.setId(mahsulot1.getId());
        assertThat(mahsulot1).isEqualTo(mahsulot2);
        mahsulot2.setId(2L);
        assertThat(mahsulot1).isNotEqualTo(mahsulot2);
        mahsulot1.setId(null);
        assertThat(mahsulot1).isNotEqualTo(mahsulot2);
    }
}
