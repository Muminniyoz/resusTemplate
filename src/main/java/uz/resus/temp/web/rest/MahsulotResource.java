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
import uz.resus.temp.domain.Mahsulot;
import uz.resus.temp.repository.MahsulotRepository;
import uz.resus.temp.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.resus.temp.domain.Mahsulot}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MahsulotResource {

    private final Logger log = LoggerFactory.getLogger(MahsulotResource.class);

    private static final String ENTITY_NAME = "mahsulot";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MahsulotRepository mahsulotRepository;

    public MahsulotResource(MahsulotRepository mahsulotRepository) {
        this.mahsulotRepository = mahsulotRepository;
    }

    /**
     * {@code POST  /mahsulots} : Create a new mahsulot.
     *
     * @param mahsulot the mahsulot to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mahsulot, or with status {@code 400 (Bad Request)} if the mahsulot has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/mahsulots")
    public ResponseEntity<Mahsulot> createMahsulot(@Valid @RequestBody Mahsulot mahsulot) throws URISyntaxException {
        log.debug("REST request to save Mahsulot : {}", mahsulot);
        if (mahsulot.getId() != null) {
            throw new BadRequestAlertException("A new mahsulot cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Mahsulot result = mahsulotRepository.save(mahsulot);
        return ResponseEntity
            .created(new URI("/api/mahsulots/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /mahsulots/:id} : Updates an existing mahsulot.
     *
     * @param id the id of the mahsulot to save.
     * @param mahsulot the mahsulot to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mahsulot,
     * or with status {@code 400 (Bad Request)} if the mahsulot is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mahsulot couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/mahsulots/{id}")
    public ResponseEntity<Mahsulot> updateMahsulot(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Mahsulot mahsulot
    ) throws URISyntaxException {
        log.debug("REST request to update Mahsulot : {}, {}", id, mahsulot);
        if (mahsulot.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, mahsulot.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!mahsulotRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Mahsulot result = mahsulotRepository.save(mahsulot);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mahsulot.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /mahsulots/:id} : Partial updates given fields of an existing mahsulot, field will ignore if it is null
     *
     * @param id the id of the mahsulot to save.
     * @param mahsulot the mahsulot to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mahsulot,
     * or with status {@code 400 (Bad Request)} if the mahsulot is not valid,
     * or with status {@code 404 (Not Found)} if the mahsulot is not found,
     * or with status {@code 500 (Internal Server Error)} if the mahsulot couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/mahsulots/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Mahsulot> partialUpdateMahsulot(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Mahsulot mahsulot
    ) throws URISyntaxException {
        log.debug("REST request to partial update Mahsulot partially : {}, {}", id, mahsulot);
        if (mahsulot.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, mahsulot.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!mahsulotRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Mahsulot> result = mahsulotRepository
            .findById(mahsulot.getId())
            .map(
                existingMahsulot -> {
                    if (mahsulot.getNom() != null) {
                        existingMahsulot.setNom(mahsulot.getNom());
                    }
                    if (mahsulot.getTur() != null) {
                        existingMahsulot.setTur(mahsulot.getTur());
                    }
                    if (mahsulot.getIzoh() != null) {
                        existingMahsulot.setIzoh(mahsulot.getIzoh());
                    }

                    return existingMahsulot;
                }
            )
            .map(mahsulotRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mahsulot.getId().toString())
        );
    }

    /**
     * {@code GET  /mahsulots} : get all the mahsulots.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mahsulots in body.
     */
    @GetMapping("/mahsulots")
    public List<Mahsulot> getAllMahsulots() {
        log.debug("REST request to get all Mahsulots");
        return mahsulotRepository.findAll();
    }

    /**
     * {@code GET  /mahsulots/:id} : get the "id" mahsulot.
     *
     * @param id the id of the mahsulot to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mahsulot, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/mahsulots/{id}")
    public ResponseEntity<Mahsulot> getMahsulot(@PathVariable Long id) {
        log.debug("REST request to get Mahsulot : {}", id);
        Optional<Mahsulot> mahsulot = mahsulotRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mahsulot);
    }

    /**
     * {@code DELETE  /mahsulots/:id} : delete the "id" mahsulot.
     *
     * @param id the id of the mahsulot to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/mahsulots/{id}")
    public ResponseEntity<Void> deleteMahsulot(@PathVariable Long id) {
        log.debug("REST request to delete Mahsulot : {}", id);
        mahsulotRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
