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
import uz.resus.temp.domain.MahsulotVariant;
import uz.resus.temp.repository.MahsulotVariantRepository;

/**
 * Integration tests for the {@link MahsulotVariantResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MahsulotVariantResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_IZOH = "AAAAAAAAAA";
    private static final String UPDATED_IZOH = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/mahsulot-variants";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MahsulotVariantRepository mahsulotVariantRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMahsulotVariantMockMvc;

    private MahsulotVariant mahsulotVariant;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MahsulotVariant createEntity(EntityManager em) {
        MahsulotVariant mahsulotVariant = new MahsulotVariant().nom(DEFAULT_NOM).izoh(DEFAULT_IZOH);
        return mahsulotVariant;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MahsulotVariant createUpdatedEntity(EntityManager em) {
        MahsulotVariant mahsulotVariant = new MahsulotVariant().nom(UPDATED_NOM).izoh(UPDATED_IZOH);
        return mahsulotVariant;
    }

    @BeforeEach
    public void initTest() {
        mahsulotVariant = createEntity(em);
    }

    @Test
    @Transactional
    void createMahsulotVariant() throws Exception {
        int databaseSizeBeforeCreate = mahsulotVariantRepository.findAll().size();
        // Create the MahsulotVariant
        restMahsulotVariantMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(mahsulotVariant))
            )
            .andExpect(status().isCreated());

        // Validate the MahsulotVariant in the database
        List<MahsulotVariant> mahsulotVariantList = mahsulotVariantRepository.findAll();
        assertThat(mahsulotVariantList).hasSize(databaseSizeBeforeCreate + 1);
        MahsulotVariant testMahsulotVariant = mahsulotVariantList.get(mahsulotVariantList.size() - 1);
        assertThat(testMahsulotVariant.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testMahsulotVariant.getIzoh()).isEqualTo(DEFAULT_IZOH);
    }

    @Test
    @Transactional
    void createMahsulotVariantWithExistingId() throws Exception {
        // Create the MahsulotVariant with an existing ID
        mahsulotVariant.setId(1L);

        int databaseSizeBeforeCreate = mahsulotVariantRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMahsulotVariantMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(mahsulotVariant))
            )
            .andExpect(status().isBadRequest());

        // Validate the MahsulotVariant in the database
        List<MahsulotVariant> mahsulotVariantList = mahsulotVariantRepository.findAll();
        assertThat(mahsulotVariantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMahsulotVariants() throws Exception {
        // Initialize the database
        mahsulotVariantRepository.saveAndFlush(mahsulotVariant);

        // Get all the mahsulotVariantList
        restMahsulotVariantMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mahsulotVariant.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].izoh").value(hasItem(DEFAULT_IZOH)));
    }

    @Test
    @Transactional
    void getMahsulotVariant() throws Exception {
        // Initialize the database
        mahsulotVariantRepository.saveAndFlush(mahsulotVariant);

        // Get the mahsulotVariant
        restMahsulotVariantMockMvc
            .perform(get(ENTITY_API_URL_ID, mahsulotVariant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(mahsulotVariant.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.izoh").value(DEFAULT_IZOH));
    }

    @Test
    @Transactional
    void getNonExistingMahsulotVariant() throws Exception {
        // Get the mahsulotVariant
        restMahsulotVariantMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMahsulotVariant() throws Exception {
        // Initialize the database
        mahsulotVariantRepository.saveAndFlush(mahsulotVariant);

        int databaseSizeBeforeUpdate = mahsulotVariantRepository.findAll().size();

        // Update the mahsulotVariant
        MahsulotVariant updatedMahsulotVariant = mahsulotVariantRepository.findById(mahsulotVariant.getId()).get();
        // Disconnect from session so that the updates on updatedMahsulotVariant are not directly saved in db
        em.detach(updatedMahsulotVariant);
        updatedMahsulotVariant.nom(UPDATED_NOM).izoh(UPDATED_IZOH);

        restMahsulotVariantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMahsulotVariant.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMahsulotVariant))
            )
            .andExpect(status().isOk());

        // Validate the MahsulotVariant in the database
        List<MahsulotVariant> mahsulotVariantList = mahsulotVariantRepository.findAll();
        assertThat(mahsulotVariantList).hasSize(databaseSizeBeforeUpdate);
        MahsulotVariant testMahsulotVariant = mahsulotVariantList.get(mahsulotVariantList.size() - 1);
        assertThat(testMahsulotVariant.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testMahsulotVariant.getIzoh()).isEqualTo(UPDATED_IZOH);
    }

    @Test
    @Transactional
    void putNonExistingMahsulotVariant() throws Exception {
        int databaseSizeBeforeUpdate = mahsulotVariantRepository.findAll().size();
        mahsulotVariant.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMahsulotVariantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, mahsulotVariant.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(mahsulotVariant))
            )
            .andExpect(status().isBadRequest());

        // Validate the MahsulotVariant in the database
        List<MahsulotVariant> mahsulotVariantList = mahsulotVariantRepository.findAll();
        assertThat(mahsulotVariantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMahsulotVariant() throws Exception {
        int databaseSizeBeforeUpdate = mahsulotVariantRepository.findAll().size();
        mahsulotVariant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMahsulotVariantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(mahsulotVariant))
            )
            .andExpect(status().isBadRequest());

        // Validate the MahsulotVariant in the database
        List<MahsulotVariant> mahsulotVariantList = mahsulotVariantRepository.findAll();
        assertThat(mahsulotVariantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMahsulotVariant() throws Exception {
        int databaseSizeBeforeUpdate = mahsulotVariantRepository.findAll().size();
        mahsulotVariant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMahsulotVariantMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(mahsulotVariant))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MahsulotVariant in the database
        List<MahsulotVariant> mahsulotVariantList = mahsulotVariantRepository.findAll();
        assertThat(mahsulotVariantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMahsulotVariantWithPatch() throws Exception {
        // Initialize the database
        mahsulotVariantRepository.saveAndFlush(mahsulotVariant);

        int databaseSizeBeforeUpdate = mahsulotVariantRepository.findAll().size();

        // Update the mahsulotVariant using partial update
        MahsulotVariant partialUpdatedMahsulotVariant = new MahsulotVariant();
        partialUpdatedMahsulotVariant.setId(mahsulotVariant.getId());

        partialUpdatedMahsulotVariant.nom(UPDATED_NOM).izoh(UPDATED_IZOH);

        restMahsulotVariantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMahsulotVariant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMahsulotVariant))
            )
            .andExpect(status().isOk());

        // Validate the MahsulotVariant in the database
        List<MahsulotVariant> mahsulotVariantList = mahsulotVariantRepository.findAll();
        assertThat(mahsulotVariantList).hasSize(databaseSizeBeforeUpdate);
        MahsulotVariant testMahsulotVariant = mahsulotVariantList.get(mahsulotVariantList.size() - 1);
        assertThat(testMahsulotVariant.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testMahsulotVariant.getIzoh()).isEqualTo(UPDATED_IZOH);
    }

    @Test
    @Transactional
    void fullUpdateMahsulotVariantWithPatch() throws Exception {
        // Initialize the database
        mahsulotVariantRepository.saveAndFlush(mahsulotVariant);

        int databaseSizeBeforeUpdate = mahsulotVariantRepository.findAll().size();

        // Update the mahsulotVariant using partial update
        MahsulotVariant partialUpdatedMahsulotVariant = new MahsulotVariant();
        partialUpdatedMahsulotVariant.setId(mahsulotVariant.getId());

        partialUpdatedMahsulotVariant.nom(UPDATED_NOM).izoh(UPDATED_IZOH);

        restMahsulotVariantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMahsulotVariant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMahsulotVariant))
            )
            .andExpect(status().isOk());

        // Validate the MahsulotVariant in the database
        List<MahsulotVariant> mahsulotVariantList = mahsulotVariantRepository.findAll();
        assertThat(mahsulotVariantList).hasSize(databaseSizeBeforeUpdate);
        MahsulotVariant testMahsulotVariant = mahsulotVariantList.get(mahsulotVariantList.size() - 1);
        assertThat(testMahsulotVariant.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testMahsulotVariant.getIzoh()).isEqualTo(UPDATED_IZOH);
    }

    @Test
    @Transactional
    void patchNonExistingMahsulotVariant() throws Exception {
        int databaseSizeBeforeUpdate = mahsulotVariantRepository.findAll().size();
        mahsulotVariant.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMahsulotVariantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, mahsulotVariant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(mahsulotVariant))
            )
            .andExpect(status().isBadRequest());

        // Validate the MahsulotVariant in the database
        List<MahsulotVariant> mahsulotVariantList = mahsulotVariantRepository.findAll();
        assertThat(mahsulotVariantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMahsulotVariant() throws Exception {
        int databaseSizeBeforeUpdate = mahsulotVariantRepository.findAll().size();
        mahsulotVariant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMahsulotVariantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(mahsulotVariant))
            )
            .andExpect(status().isBadRequest());

        // Validate the MahsulotVariant in the database
        List<MahsulotVariant> mahsulotVariantList = mahsulotVariantRepository.findAll();
        assertThat(mahsulotVariantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMahsulotVariant() throws Exception {
        int databaseSizeBeforeUpdate = mahsulotVariantRepository.findAll().size();
        mahsulotVariant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMahsulotVariantMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(mahsulotVariant))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MahsulotVariant in the database
        List<MahsulotVariant> mahsulotVariantList = mahsulotVariantRepository.findAll();
        assertThat(mahsulotVariantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMahsulotVariant() throws Exception {
        // Initialize the database
        mahsulotVariantRepository.saveAndFlush(mahsulotVariant);

        int databaseSizeBeforeDelete = mahsulotVariantRepository.findAll().size();

        // Delete the mahsulotVariant
        restMahsulotVariantMockMvc
            .perform(delete(ENTITY_API_URL_ID, mahsulotVariant.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MahsulotVariant> mahsulotVariantList = mahsulotVariantRepository.findAll();
        assertThat(mahsulotVariantList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
