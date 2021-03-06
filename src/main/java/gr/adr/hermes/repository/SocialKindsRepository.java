package gr.adr.hermes.repository;

import gr.adr.hermes.domain.SocialKinds;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the SocialKinds entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SocialKindsRepository extends JpaRepository<SocialKinds, Long>, JpaSpecificationExecutor<SocialKinds> {}
