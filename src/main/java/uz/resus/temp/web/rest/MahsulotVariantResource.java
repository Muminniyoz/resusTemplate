package uz.resus.temp.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import uz.resus.temp.domain.MahsulotVariant;
import uz.resus.temp.repository.MahsulotVariantRepository;
import uz.resus.temp.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.resus.temp.domain.MahsulotVariant}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MahsulotVariantResource {

    private final Logger log = LoggerFactory.getLogger(MahsulotVariantResource.class);

    private static final String ENTITY_NAME = "mahsulotVariant";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MahsulotVariantRepository mahsulotVariantRepository;

    public MahsulotVariantResource(MahsulotVariantRepository mahsulotVariantRepository) {
        this.mahsulotVariantRepository = mahsulotVariantRepository;
    }

    /**
     * {@code POST  /mahsulot-variants} : Create a new mahsulotVariant.
     *
     * @param mahsulotVariant the mahsulotVariant to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mahsulotVariant, or with status {@code 400 (Bad Request)} if the mahsulotVariant has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/mahsulot-variants")
    public ResponseEntity<MahsulotVariant> createMahsulotVariant(@RequestBody MahsulotVariant mahsulotVariant) throws URISyntaxException {
        log.debug("REST request to save MahsulotVariant : {}", mahsulotVariant);
        if (mahsulotVariant.getId() != null) {
            throw new BadRequestAlertException("A new mahsulotVariant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MahsulotVariant result = mahsulotVariantRepository.save(mahsulotVariant);
        return ResponseEntity
            .created(new URI("/api/mahsulot-variants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /mahsulot-variants/:id} : Updates an existing mahsulotVariant.
     *
     * @param id the id of the mahsulotVariant to save.
     * @param mahsulotVariant the mahsulotVariant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mahsulotVariant,
     * or with status {@code 400 (Bad Request)} if the mahsulotVariant is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mahsulotVariant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/mahsulot-variants/{id}")
    public ResponseEntity<MahsulotVariant> updateMahsulotVariant(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MahsulotVariant mahsulotVariant
    ) throws URISyntaxException {
        log.debug("REST request to update MahsulotVariant : {}, {}", id, mahsulotVariant);
        if (mahsulotVariant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, mahsulotVariant.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!mahsulotVariantRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MahsulotVariant result = mahsulotVariantRepository.save(mahsulotVariant);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mahsulotVariant.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /mahsulot-variants/:id} : Partial updates given fields of an existing mahsulotVariant, field will ignore if it is null
     *
     * @param id the id of the mahsulotVariant to save.
     * @param mahsulotVariant the mahsulotVariant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mahsulotVariant,
     * or with status {@code 400 (Bad Request)} if the mahsulotVariant is not valid,
     * or with status {@code 404 (Not Found)} if the mahsulotVariant is not found,
     * or with status {@code 500 (Internal Server Error)} if the mahsulotVariant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/mahsulot-variants/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<MahsulotVariant> partialUpdateMahsulotVariant(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MahsulotVariant mahsulotVariant
    ) throws URISyntaxException {
        log.debug("REST request to partial update MahsulotVariant partially : {}, {}", id, mahsulotVariant);
        if (mahsulotVariant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, mahsulotVariant.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!mahsulotVariantRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MahsulotVariant> result = mahsulotVariantRepository
            .findById(mahsulotVariant.getId())
            .map(
                existingMahsulotVariant -> {
                    if (mahsulotVariant.getNom() != null) {
                        existingMahsulotVariant.setNom(mahsulotVariant.getNom());
                    }
                    if (mahsulotVariant.getIzoh() != null) {
                        existingMahsulotVariant.setIzoh(mahsulotVariant.getIzoh());
                    }

                    return existingMahsulotVariant;
                }
            )
            .map(mahsulotVariantRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mahsulotVariant.getId().toString())
        );
    }

    /**
     * {@code GET  /mahsulot-variants} : get all the mahsulotVariants.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mahsulotVariants in body.
     */
    @GetMapping("/mahsulot-variants")
    public List<MahsulotVariant> getAllMahsulotVariants() {
        log.debug("REST request to get all MahsulotVariants");
        return mahsulotVariantRepository.findAll();
    }

    /**
     * {@code GET  /mahsulot-variants/:id} : get the "id" mahsulotVariant.
     *
     * @param id the id of the mahsulotVariant to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mahsulotVariant, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/mahsulot-variants/{id}")
    public ResponseEntity<MahsulotVariant> getMahsulotVariant(@PathVariable Long id) {
        log.debug("REST request to get MahsulotVariant : {}", id);
        Optional<MahsulotVariant> mahsulotVariant = mahsulotVariantRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mahsulotVariant);
    }

    /**
     * {@code DELETE  /mahsulot-variants/:id} : delete the "id" mahsulotVariant.
     *
     * @param id the id of the mahsulotVariant to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/mahsulot-variants/{id}")
    public ResponseEntity<Void> deleteMahsulotVariant(@PathVariable Long id) {
        log.debug("REST request to delete MahsulotVariant : {}", id);
        mahsulotVariantRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
