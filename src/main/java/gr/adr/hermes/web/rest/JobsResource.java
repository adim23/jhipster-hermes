package gr.adr.hermes.web.rest;

import gr.adr.hermes.domain.Jobs;
import gr.adr.hermes.repository.JobsRepository;
import gr.adr.hermes.service.JobsQueryService;
import gr.adr.hermes.service.JobsService;
import gr.adr.hermes.service.criteria.JobsCriteria;
import gr.adr.hermes.web.rest.errors.BadRequestAlertException;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link gr.adr.hermes.domain.Jobs}.
 */
@RestController
@RequestMapping("/api")
public class JobsResource {

    private final Logger log = LoggerFactory.getLogger(JobsResource.class);

    private static final String ENTITY_NAME = "jobs";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final JobsService jobsService;

    private final JobsRepository jobsRepository;

    private final JobsQueryService jobsQueryService;

    public JobsResource(JobsService jobsService, JobsRepository jobsRepository, JobsQueryService jobsQueryService) {
        this.jobsService = jobsService;
        this.jobsRepository = jobsRepository;
        this.jobsQueryService = jobsQueryService;
    }

    /**
     * {@code POST  /jobs} : Create a new jobs.
     *
     * @param jobs the jobs to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new jobs, or with status {@code 400 (Bad Request)} if the jobs has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/jobs")
    public ResponseEntity<Jobs> createJobs(@Valid @RequestBody Jobs jobs) throws URISyntaxException {
        log.debug("REST request to save Jobs : {}", jobs);
        if (jobs.getId() != null) {
            throw new BadRequestAlertException("A new jobs cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Jobs result = jobsService.save(jobs);
        return ResponseEntity
            .created(new URI("/api/jobs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /jobs/:id} : Updates an existing jobs.
     *
     * @param id the id of the jobs to save.
     * @param jobs the jobs to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated jobs,
     * or with status {@code 400 (Bad Request)} if the jobs is not valid,
     * or with status {@code 500 (Internal Server Error)} if the jobs couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/jobs/{id}")
    public ResponseEntity<Jobs> updateJobs(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Jobs jobs)
        throws URISyntaxException {
        log.debug("REST request to update Jobs : {}, {}", id, jobs);
        if (jobs.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, jobs.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!jobsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Jobs result = jobsService.save(jobs);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, jobs.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /jobs/:id} : Partial updates given fields of an existing jobs, field will ignore if it is null
     *
     * @param id the id of the jobs to save.
     * @param jobs the jobs to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated jobs,
     * or with status {@code 400 (Bad Request)} if the jobs is not valid,
     * or with status {@code 404 (Not Found)} if the jobs is not found,
     * or with status {@code 500 (Internal Server Error)} if the jobs couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/jobs/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Jobs> partialUpdateJobs(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Jobs jobs
    ) throws URISyntaxException {
        log.debug("REST request to partial update Jobs partially : {}, {}", id, jobs);
        if (jobs.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, jobs.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!jobsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Jobs> result = jobsService.partialUpdate(jobs);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, jobs.getId().toString())
        );
    }

    /**
     * {@code GET  /jobs} : get all the jobs.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of jobs in body.
     */
    @GetMapping("/jobs")
    public ResponseEntity<List<Jobs>> getAllJobs(JobsCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Jobs by criteria: {}", criteria);
        Page<Jobs> page = jobsQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /jobs/count} : count all the jobs.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/jobs/count")
    public ResponseEntity<Long> countJobs(JobsCriteria criteria) {
        log.debug("REST request to count Jobs by criteria: {}", criteria);
        return ResponseEntity.ok().body(jobsQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /jobs/:id} : get the "id" jobs.
     *
     * @param id the id of the jobs to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the jobs, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/jobs/{id}")
    public ResponseEntity<Jobs> getJobs(@PathVariable Long id) {
        log.debug("REST request to get Jobs : {}", id);
        Optional<Jobs> jobs = jobsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(jobs);
    }

    /**
     * {@code DELETE  /jobs/:id} : delete the "id" jobs.
     *
     * @param id the id of the jobs to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<Void> deleteJobs(@PathVariable Long id) {
        log.debug("REST request to delete Jobs : {}", id);
        jobsService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
