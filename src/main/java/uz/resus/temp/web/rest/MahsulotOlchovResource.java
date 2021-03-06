package uz.resus.temp.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import uz.resus.temp.domain.MahsulotOlchov;
import uz.resus.temp.repository.MahsulotOlchovRepository;
import uz.resus.temp.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.resus.temp.domain.MahsulotOlchov}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MahsulotOlchovResource {

    private final Logger log = LoggerFactory.getLogger(MahsulotOlchovResource.class);

    private static final String ENTITY_NAME = "mahsulotOlchov";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MahsulotOlchovRepository mahsulotOlchovRepository;

    public MahsulotOlchovResource(MahsulotOlchovRepository mahsulotOlchovRepository) {
        this.mahsulotOlchovRepository = mahsulotOlchovRepository;
    }

    /**
     * {@code POST  /mahsulot-olchovs} : Create a new mahsulotOlchov.
     *
     * @param mahsulotOlchov the mahsulotOlchov to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mahsulotOlchov, or with status {@code 400 (Bad Request)} if the mahsulotOlchov has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/mahsulot-olchovs")
    public ResponseEntity<MahsulotOlchov> createMahsulotOlchov(@Valid @RequestBody MahsulotOlchov mahsulotOlchov)
        throws URISyntaxException {
        log.debug("REST request to save MahsulotOlchov : {}", mahsulotOlchov);
        if (mahsulotOlchov.getId() != null) {
            throw new BadRequestAlertException("A new mahsulotOlchov cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MahsulotOlchov result = mahsulotOlchovRepository.save(mahsulotOlchov);
        return ResponseEntity
            .created(new URI("/api/mahsulot-olchovs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /mahsulot-olchovs/:id} : Updates an existing mahsulotOlchov.
     *
     * @param id the id of the mahsulotOlchov to save.
     * @param mahsulotOlchov the mahsulotOlchov to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mahsulotOlchov,
     * or with status {@code 400 (Bad Request)} if the mahsulotOlchov is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mahsulotOlchov couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/mahsulot-olchovs/{id}")
    public ResponseEntity<MahsulotOlchov> updateMahsulotOlchov(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody MahsulotOlchov mahsulotOlchov
    ) throws URISyntaxException {
        log.debug("REST request to update MahsulotOlchov : {}, {}", id, mahsulotOlchov);
        if (mahsulotOlchov.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, mahsulotOlchov.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!mahsulotOlchovRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MahsulotOlchov result = mahsulotOlchovRepository.save(mahsulotOlchov);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mahsulotOlchov.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /mahsulot-olchovs/:id} : Partial updates given fields of an existing mahsulotOlchov, field will ignore if it is null
     *
     * @param id the id of the mahsulotOlchov to save.
     * @param mahsulotOlchov the mahsulotOlchov to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mahsulotOlchov,
     * or with status {@code 400 (Bad Request)} if the mahsulotOlchov is not valid,
     * or with status {@code 404 (Not Found)} if the mahsulotOlchov is not found,
     * or with status {@code 500 (Internal Server Error)} if the mahsulotOlchov couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/mahsulot-olchovs/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<MahsulotOlchov> partialUpdateMahsulotOlchov(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody MahsulotOlchov mahsulotOlchov
    ) throws URISyntaxException {
        log.debug("REST request to partial update MahsulotOlchov partially : {}, {}", id, mahsulotOlchov);
        if (mahsulotOlchov.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, mahsulotOlchov.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!mahsulotOlchovRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MahsulotOlchov> result = mahsulotOlchovRepository
            .findById(mahsulotOlchov.getId())
            .map(
                existingMahsulotOlchov -> {
                    if (mahsulotOlchov.getNom() != null) {
                        existingMahsulotOlchov.setNom(mahsulotOlchov.getNom());
                    }
                    if (mahsulotOlchov.getIzoh() != null) {
                        existingMahsulotOlchov.setIzoh(mahsulotOlchov.getIzoh());
                    }

                    return existingMahsulotOlchov;
                }
            )
            .map(mahsulotOlchovRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mahsulotOlchov.getId().toString())
        );
    }

    /**
     * {@code GET  /mahsulot-olchovs} : get all the mahsulotOlchovs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mahsulotOlchovs in body.
     */
    @GetMapping("/mahsulot-olchovs")
    public List<MahsulotOlchov> getAllMahsulotOlchovs() {
        log.debug("REST request to get all MahsulotOlchovs");
        return mahsulotOlchovRepository.findAll();
    }

    /**
     * {@code GET  /mahsulot-olchovs/:id} : get the "id" mahsulotOlchov.
     *
     * @param id the id of the mahsulotOlchov to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mahsulotOlchov, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/mahsulot-olchovs/{id}")
    public ResponseEntity<MahsulotOlchov> getMahsulotOlchov(@PathVariable Long id) {
        log.debug("REST request to get MahsulotOlchov : {}", id);
        Optional<MahsulotOlchov> mahsulotOlchov = mahsulotOlchovRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mahsulotOlchov);
    }

    /**
     * {@code DELETE  /mahsulot-olchovs/:id} : delete the "id" mahsulotOlchov.
     *
     * @param id the id of the mahsulotOlchov to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/mahsulot-olchovs/{id}")
    public ResponseEntity<Void> deleteMahsulotOlchov(@PathVariable Long id) {
        log.debug("REST request to delete MahsulotOlchov : {}", id);
        mahsulotOlchovRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
