package uz.resus.temp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import uz.resus.temp.IntegrationTest;
import uz.resus.temp.domain.Mahsulot;
import uz.resus.temp.domain.enumeration.MahsulotTur;
import uz.resus.temp.repository.MahsulotRepository;

/**
 * Integration tests for the {@link MahsulotResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MahsulotResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final MahsulotTur DEFAULT_TUR = MahsulotTur.DOIMIY;
    private static final MahsulotTur UPDATED_TUR = MahsulotTur.ICHIMLIKLAR;

    private static final String DEFAULT_IZOH = "AAAAAAAAAA";
    private static final String UPDATED_IZOH = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/mahsulots";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MahsulotRepository mahsulotRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMahsulotMockMvc;

    private Mahsulot mahsulot;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mahsulot createEntity(EntityManager em) {
        Mahsulot mahsulot = new Mahsulot().nom(DEFAULT_NOM).tur(DEFAULT_TUR).izoh(DEFAULT_IZOH);
        return mahsulot;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mahsulot createUpdatedEntity(EntityManager em) {
        Mahsulot mahsulot = new Mahsulot().nom(UPDATED_NOM).tur(UPDATED_TUR).izoh(UPDATED_IZOH);
        return mahsulot;
    }

    @BeforeEach
    public void initTest() {
        mahsulot = createEntity(em);
    }

    @Test
    @Transactional
    void createMahsulot() throws Exception {
        int databaseSizeBeforeCreate = mahsulotRepository.findAll().size();
        // Create the Mahsulot
        restMahsulotMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(mahsulot)))
            .andExpect(status().isCreated());

        // Validate the Mahsulot in the database
        List<Mahsulot> mahsulotList = mahsulotRepository.findAll();
        assertThat(mahsulotList).hasSize(databaseSizeBeforeCreate + 1);
        Mahsulot testMahsulot = mahsulotList.get(mahsulotList.size() - 1);
        assertThat(testMahsulot.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testMahsulot.getTur()).isEqualTo(DEFAULT_TUR);
        assertThat(testMahsulot.getIzoh()).isEqualTo(DEFAULT_IZOH);
    }

    @Test
    @Transactional
    void createMahsulotWithExistingId() throws Exception {
        // Create the Mahsulot with an existing ID
        mahsulot.setId(1L);

        int databaseSizeBeforeCreate = mahsulotRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMahsulotMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(mahsulot)))
            .andExpect(status().isBadRequest());

        // Validate the Mahsulot in the database
        List<Mahsulot> mahsulotList = mahsulotRepository.findAll();
        assertThat(mahsulotList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = mahsulotRepository.findAll().size();
        // set the field null
        mahsulot.setNom(null);

        // Create the Mahsulot, which fails.

        restMahsulotMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(mahsulot)))
            .andExpect(status().isBadRequest());

        List<Mahsulot> mahsulotList = mahsulotRepository.findAll();
        assertThat(mahsulotList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllMahsulots() throws Exception {
        // Initialize the database
        mahsulotRepository.saveAndFlush(mahsulot);

        // Get all the mahsulotList
        restMahsulotMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mahsulot.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].tur").value(hasItem(DEFAULT_TUR.toString())))
            .andExpect(jsonPath("$.[*].izoh").value(hasItem(DEFAULT_IZOH)));
    }

    @Test
    @Transactional
    void getMahsulot() throws Exception {
        // Initialize the database
        mahsulotRepository.saveAndFlush(mahsulot);

        // Get the mahsulot
        restMahsulotMockMvc
            .perform(get(ENTITY_API_URL_ID, mahsulot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(mahsulot.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.tur").value(DEFAULT_TUR.toString()))
            .andExpect(jsonPath("$.izoh").value(DEFAULT_IZOH));
    }

    @Test
    @Transactional
    void getNonExistingMahsulot() throws Exception {
        // Get the mahsulot
        restMahsulotMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMahsulot() throws Exception {
        // Initialize the database
        mahsulotRepository.saveAndFlush(mahsulot);

        int databaseSizeBeforeUpdate = mahsulotRepository.findAll().size();

        // Update the mahsulot
        Mahsulot updatedMahsulot = mahsulotRepository.findById(mahsulot.getId()).get();
        // Disconnect from session so that the updates on updatedMahsulot are not directly saved in db
        em.detach(updatedMahsulot);
        updatedMahsulot.nom(UPDATED_NOM).tur(UPDATED_TUR).izoh(UPDATED_IZOH);

        restMahsulotMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMahsulot.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMahsulot))
            )
            .andExpect(status().isOk());

        // Validate the Mahsulot in the database
        List<Mahsulot> mahsulotList = mahsulotRepository.findAll();
        assertThat(mahsulotList).hasSize(databaseSizeBeforeUpdate);
        Mahsulot testMahsulot = mahsulotList.get(mahsulotList.size() - 1);
        assertThat(testMahsulot.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testMahsulot.getTur()).isEqualTo(UPDATED_TUR);
        assertThat(testMahsulot.getIzoh()).isEqualTo(UPDATED_IZOH);
    }

    @Test
    @Transactional
    void putNonExistingMahsulot() throws Exception {
        int databaseSizeBeforeUpdate = mahsulotRepository.findAll().size();
        mahsulot.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMahsulotMockMvc
            .perform(
                put(ENTITY_API_URL_ID, mahsulot.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(mahsulot))
            )
            .andExpect(status().isBadRequest());

        // Validate the Mahsulot in the database
        List<Mahsulot> mahsulotList = mahsulotRepository.findAll();
        assertThat(mahsulotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMahsulot() throws Exception {
        int databaseSizeBeforeUpdate = mahsulotRepository.findAll().size();
        mahsulot.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMahsulotMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(mahsulot))
            )
            .andExpect(status().isBadRequest());

        // Validate the Mahsulot in the database
        List<Mahsulot> mahsulotList = mahsulotRepository.findAll();
        assertThat(mahsulotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMahsulot() throws Exception {
        int databaseSizeBeforeUpdate = mahsulotRepository.findAll().size();
        mahsulot.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMahsulotMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(mahsulot)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Mahsulot in the database
        List<Mahsulot> mahsulotList = mahsulotRepository.findAll();
        assertThat(mahsulotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMahsulotWithPatch() throws Exception {
        // Initialize the database
        mahsulotRepository.saveAndFlush(mahsulot);

        int databaseSizeBeforeUpdate = mahsulotRepository.findAll().size();

        // Update the mahsulot using partial update
        Mahsulot partialUpdatedMahsulot = new Mahsulot();
        partialUpdatedMahsulot.setId(mahsulot.getId());

        partialUpdatedMahsulot.tur(UPDATED_TUR).izoh(UPDATED_IZOH);

        restMahsulotMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMahsulot.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMahsulot))
            )
            .andExpect(status().isOk());

        // Validate the Mahsulot in the database
        List<Mahsulot> mahsulotList = mahsulotRepository.findAll();
        assertThat(mahsulotList).hasSize(databaseSizeBeforeUpdate);
        Mahsulot testMahsulot = mahsulotList.get(mahsulotList.size() - 1);
        assertThat(testMahsulot.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testMahsulot.getTur()).isEqualTo(UPDATED_TUR);
        assertThat(testMahsulot.getIzoh()).isEqualTo(UPDATED_IZOH);
    }

    @Test
    @Transactional
    void fullUpdateMahsulotWithPatch() throws Exception {
        // Initialize the database
        mahsulotRepository.saveAndFlush(mahsulot);

        int databaseSizeBeforeUpdate = mahsulotRepository.findAll().size();

        // Update the mahsulot using partial update
        Mahsulot partialUpdatedMahsulot = new Mahsulot();
        partialUpdatedMahsulot.setId(mahsulot.getId());

        partialUpdatedMahsulot.nom(UPDATED_NOM).tur(UPDATED_TUR).izoh(UPDATED_IZOH);

        restMahsulotMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMahsulot.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMahsulot))
            )
            .andExpect(status().isOk());

        // Validate the Mahsulot in the database
        List<Mahsulot> mahsulotList = mahsulotRepository.findAll();
        assertThat(mahsulotList).hasSize(databaseSizeBeforeUpdate);
        Mahsulot testMahsulot = mahsulotList.get(mahsulotList.size() - 1);
        assertThat(testMahsulot.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testMahsulot.getTur()).isEqualTo(UPDATED_TUR);
        assertThat(testMahsulot.getIzoh()).isEqualTo(UPDATED_IZOH);
    }

    @Test
    @Transactional
    void patchNonExistingMahsulot() throws Exception {
        int databaseSizeBeforeUpdate = mahsulotRepository.findAll().size();
        mahsulot.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMahsulotMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, mahsulot.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(mahsulot))
            )
            .andExpect(status().isBadRequest());

        // Validate the Mahsulot in the database
        List<Mahsulot> mahsulotList = mahsulotRepository.findAll();
        assertThat(mahsulotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMahsulot() throws Exception {
        int databaseSizeBeforeUpdate = mahsulotRepository.findAll().size();
        mahsulot.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMahsulotMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(mahsulot))
            )
            .andExpect(status().isBadRequest());

        // Validate the Mahsulot in the database
        List<Mahsulot> mahsulotList = mahsulotRepository.findAll();
        assertThat(mahsulotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMahsulot() throws Exception {
        int databaseSizeBeforeUpdate = mahsulotRepository.findAll().size();
        mahsulot.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMahsulotMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(mahsulot)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Mahsulot in the database
        List<Mahsulot> mahsulotList = mahsulotRepository.findAll();
        assertThat(mahsulotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMahsulot() throws Exception {
        // Initialize the database
        mahsulotRepository.saveAndFlush(mahsulot);

        int databaseSizeBeforeDelete = mahsulotRepository.findAll().size();

        // Delete the mahsulot
        restMahsulotMockMvc
            .perform(delete(ENTITY_API_URL_ID, mahsulot.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Mahsulot> mahsulotList = mahsulotRepository.findAll();
        assertThat(mahsulotList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
