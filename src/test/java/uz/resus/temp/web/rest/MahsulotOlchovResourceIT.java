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
import uz.resus.temp.domain.MahsulotOlchov;
import uz.resus.temp.repository.MahsulotOlchovRepository;

/**
 * Integration tests for the {@link MahsulotOlchovResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MahsulotOlchovResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_IZOH = "AAAAAAAAAA";
    private static final String UPDATED_IZOH = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/mahsulot-olchovs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MahsulotOlchovRepository mahsulotOlchovRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMahsulotOlchovMockMvc;

    private MahsulotOlchov mahsulotOlchov;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MahsulotOlchov createEntity(EntityManager em) {
        MahsulotOlchov mahsulotOlchov = new MahsulotOlchov().nom(DEFAULT_NOM).izoh(DEFAULT_IZOH);
        return mahsulotOlchov;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MahsulotOlchov createUpdatedEntity(EntityManager em) {
        MahsulotOlchov mahsulotOlchov = new MahsulotOlchov().nom(UPDATED_NOM).izoh(UPDATED_IZOH);
        return mahsulotOlchov;
    }

    @BeforeEach
    public void initTest() {
        mahsulotOlchov = createEntity(em);
    }

    @Test
    @Transactional
    void createMahsulotOlchov() throws Exception {
        int databaseSizeBeforeCreate = mahsulotOlchovRepository.findAll().size();
        // Create the MahsulotOlchov
        restMahsulotOlchovMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(mahsulotOlchov))
            )
            .andExpect(status().isCreated());

        // Validate the MahsulotOlchov in the database
        List<MahsulotOlchov> mahsulotOlchovList = mahsulotOlchovRepository.findAll();
        assertThat(mahsulotOlchovList).hasSize(databaseSizeBeforeCreate + 1);
        MahsulotOlchov testMahsulotOlchov = mahsulotOlchovList.get(mahsulotOlchovList.size() - 1);
        assertThat(testMahsulotOlchov.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testMahsulotOlchov.getIzoh()).isEqualTo(DEFAULT_IZOH);
    }

    @Test
    @Transactional
    void createMahsulotOlchovWithExistingId() throws Exception {
        // Create the MahsulotOlchov with an existing ID
        mahsulotOlchov.setId(1L);

        int databaseSizeBeforeCreate = mahsulotOlchovRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMahsulotOlchovMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(mahsulotOlchov))
            )
            .andExpect(status().isBadRequest());

        // Validate the MahsulotOlchov in the database
        List<MahsulotOlchov> mahsulotOlchovList = mahsulotOlchovRepository.findAll();
        assertThat(mahsulotOlchovList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = mahsulotOlchovRepository.findAll().size();
        // set the field null
        mahsulotOlchov.setNom(null);

        // Create the MahsulotOlchov, which fails.

        restMahsulotOlchovMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(mahsulotOlchov))
            )
            .andExpect(status().isBadRequest());

        List<MahsulotOlchov> mahsulotOlchovList = mahsulotOlchovRepository.findAll();
        assertThat(mahsulotOlchovList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllMahsulotOlchovs() throws Exception {
        // Initialize the database
        mahsulotOlchovRepository.saveAndFlush(mahsulotOlchov);

        // Get all the mahsulotOlchovList
        restMahsulotOlchovMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mahsulotOlchov.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].izoh").value(hasItem(DEFAULT_IZOH)));
    }

    @Test
    @Transactional
    void getMahsulotOlchov() throws Exception {
        // Initialize the database
        mahsulotOlchovRepository.saveAndFlush(mahsulotOlchov);

        // Get the mahsulotOlchov
        restMahsulotOlchovMockMvc
            .perform(get(ENTITY_API_URL_ID, mahsulotOlchov.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(mahsulotOlchov.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.izoh").value(DEFAULT_IZOH));
    }

    @Test
    @Transactional
    void getNonExistingMahsulotOlchov() throws Exception {
        // Get the mahsulotOlchov
        restMahsulotOlchovMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMahsulotOlchov() throws Exception {
        // Initialize the database
        mahsulotOlchovRepository.saveAndFlush(mahsulotOlchov);

        int databaseSizeBeforeUpdate = mahsulotOlchovRepository.findAll().size();

        // Update the mahsulotOlchov
        MahsulotOlchov updatedMahsulotOlchov = mahsulotOlchovRepository.findById(mahsulotOlchov.getId()).get();
        // Disconnect from session so that the updates on updatedMahsulotOlchov are not directly saved in db
        em.detach(updatedMahsulotOlchov);
        updatedMahsulotOlchov.nom(UPDATED_NOM).izoh(UPDATED_IZOH);

        restMahsulotOlchovMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMahsulotOlchov.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMahsulotOlchov))
            )
            .andExpect(status().isOk());

        // Validate the MahsulotOlchov in the database
        List<MahsulotOlchov> mahsulotOlchovList = mahsulotOlchovRepository.findAll();
        assertThat(mahsulotOlchovList).hasSize(databaseSizeBeforeUpdate);
        MahsulotOlchov testMahsulotOlchov = mahsulotOlchovList.get(mahsulotOlchovList.size() - 1);
        assertThat(testMahsulotOlchov.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testMahsulotOlchov.getIzoh()).isEqualTo(UPDATED_IZOH);
    }

    @Test
    @Transactional
    void putNonExistingMahsulotOlchov() throws Exception {
        int databaseSizeBeforeUpdate = mahsulotOlchovRepository.findAll().size();
        mahsulotOlchov.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMahsulotOlchovMockMvc
            .perform(
                put(ENTITY_API_URL_ID, mahsulotOlchov.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(mahsulotOlchov))
            )
            .andExpect(status().isBadRequest());

        // Validate the MahsulotOlchov in the database
        List<MahsulotOlchov> mahsulotOlchovList = mahsulotOlchovRepository.findAll();
        assertThat(mahsulotOlchovList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMahsulotOlchov() throws Exception {
        int databaseSizeBeforeUpdate = mahsulotOlchovRepository.findAll().size();
        mahsulotOlchov.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMahsulotOlchovMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(mahsulotOlchov))
            )
            .andExpect(status().isBadRequest());

        // Validate the MahsulotOlchov in the database
        List<MahsulotOlchov> mahsulotOlchovList = mahsulotOlchovRepository.findAll();
        assertThat(mahsulotOlchovList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMahsulotOlchov() throws Exception {
        int databaseSizeBeforeUpdate = mahsulotOlchovRepository.findAll().size();
        mahsulotOlchov.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMahsulotOlchovMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(mahsulotOlchov)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the MahsulotOlchov in the database
        List<MahsulotOlchov> mahsulotOlchovList = mahsulotOlchovRepository.findAll();
        assertThat(mahsulotOlchovList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMahsulotOlchovWithPatch() throws Exception {
        // Initialize the database
        mahsulotOlchovRepository.saveAndFlush(mahsulotOlchov);

        int databaseSizeBeforeUpdate = mahsulotOlchovRepository.findAll().size();

        // Update the mahsulotOlchov using partial update
        MahsulotOlchov partialUpdatedMahsulotOlchov = new MahsulotOlchov();
        partialUpdatedMahsulotOlchov.setId(mahsulotOlchov.getId());

        partialUpdatedMahsulotOlchov.nom(UPDATED_NOM).izoh(UPDATED_IZOH);

        restMahsulotOlchovMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMahsulotOlchov.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMahsulotOlchov))
            )
            .andExpect(status().isOk());

        // Validate the MahsulotOlchov in the database
        List<MahsulotOlchov> mahsulotOlchovList = mahsulotOlchovRepository.findAll();
        assertThat(mahsulotOlchovList).hasSize(databaseSizeBeforeUpdate);
        MahsulotOlchov testMahsulotOlchov = mahsulotOlchovList.get(mahsulotOlchovList.size() - 1);
        assertThat(testMahsulotOlchov.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testMahsulotOlchov.getIzoh()).isEqualTo(UPDATED_IZOH);
    }

    @Test
    @Transactional
    void fullUpdateMahsulotOlchovWithPatch() throws Exception {
        // Initialize the database
        mahsulotOlchovRepository.saveAndFlush(mahsulotOlchov);

        int databaseSizeBeforeUpdate = mahsulotOlchovRepository.findAll().size();

        // Update the mahsulotOlchov using partial update
        MahsulotOlchov partialUpdatedMahsulotOlchov = new MahsulotOlchov();
        partialUpdatedMahsulotOlchov.setId(mahsulotOlchov.getId());

        partialUpdatedMahsulotOlchov.nom(UPDATED_NOM).izoh(UPDATED_IZOH);

        restMahsulotOlchovMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMahsulotOlchov.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMahsulotOlchov))
            )
            .andExpect(status().isOk());

        // Validate the MahsulotOlchov in the database
        List<MahsulotOlchov> mahsulotOlchovList = mahsulotOlchovRepository.findAll();
        assertThat(mahsulotOlchovList).hasSize(databaseSizeBeforeUpdate);
        MahsulotOlchov testMahsulotOlchov = mahsulotOlchovList.get(mahsulotOlchovList.size() - 1);
        assertThat(testMahsulotOlchov.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testMahsulotOlchov.getIzoh()).isEqualTo(UPDATED_IZOH);
    }

    @Test
    @Transactional
    void patchNonExistingMahsulotOlchov() throws Exception {
        int databaseSizeBeforeUpdate = mahsulotOlchovRepository.findAll().size();
        mahsulotOlchov.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMahsulotOlchovMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, mahsulotOlchov.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(mahsulotOlchov))
            )
            .andExpect(status().isBadRequest());

        // Validate the MahsulotOlchov in the database
        List<MahsulotOlchov> mahsulotOlchovList = mahsulotOlchovRepository.findAll();
        assertThat(mahsulotOlchovList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMahsulotOlchov() throws Exception {
        int databaseSizeBeforeUpdate = mahsulotOlchovRepository.findAll().size();
        mahsulotOlchov.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMahsulotOlchovMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(mahsulotOlchov))
            )
            .andExpect(status().isBadRequest());

        // Validate the MahsulotOlchov in the database
        List<MahsulotOlchov> mahsulotOlchovList = mahsulotOlchovRepository.findAll();
        assertThat(mahsulotOlchovList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMahsulotOlchov() throws Exception {
        int databaseSizeBeforeUpdate = mahsulotOlchovRepository.findAll().size();
        mahsulotOlchov.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMahsulotOlchovMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(mahsulotOlchov))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MahsulotOlchov in the database
        List<MahsulotOlchov> mahsulotOlchovList = mahsulotOlchovRepository.findAll();
        assertThat(mahsulotOlchovList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMahsulotOlchov() throws Exception {
        // Initialize the database
        mahsulotOlchovRepository.saveAndFlush(mahsulotOlchov);

        int databaseSizeBeforeDelete = mahsulotOlchovRepository.findAll().size();

        // Delete the mahsulotOlchov
        restMahsulotOlchovMockMvc
            .perform(delete(ENTITY_API_URL_ID, mahsulotOlchov.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MahsulotOlchov> mahsulotOlchovList = mahsulotOlchovRepository.findAll();
        assertThat(mahsulotOlchovList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
