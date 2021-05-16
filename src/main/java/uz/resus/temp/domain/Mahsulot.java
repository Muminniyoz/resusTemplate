package uz.resus.temp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import uz.resus.temp.domain.enumeration.MahsulotTur;

/**
 * A Mahsulot.
 */
@Entity
@Table(name = "mahsulot")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Mahsulot implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @Enumerated(EnumType.STRING)
    @Column(name = "tur")
    private MahsulotTur tur;

    @Column(name = "izoh")
    private String izoh;

    @ManyToOne
    @JsonIgnoreProperties(value = { "mahsulots", "mahsulotVariants" }, allowSetters = true)
    private MahsulotOlchov mahsulotOlchov;

    @OneToMany(mappedBy = "mahsulot")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "mahsulot", "mahsulotOlchov" }, allowSetters = true)
    private Set<MahsulotVariant> mahsulotVariants = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Mahsulot id(Long id) {
        this.id = id;
        return this;
    }

    public String getNom() {
        return this.nom;
    }

    public Mahsulot nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public MahsulotTur getTur() {
        return this.tur;
    }

    public Mahsulot tur(MahsulotTur tur) {
        this.tur = tur;
        return this;
    }

    public void setTur(MahsulotTur tur) {
        this.tur = tur;
    }

    public String getIzoh() {
        return this.izoh;
    }

    public Mahsulot izoh(String izoh) {
        this.izoh = izoh;
        return this;
    }

    public void setIzoh(String izoh) {
        this.izoh = izoh;
    }

    public MahsulotOlchov getMahsulotOlchov() {
        return this.mahsulotOlchov;
    }

    public Mahsulot mahsulotOlchov(MahsulotOlchov mahsulotOlchov) {
        this.setMahsulotOlchov(mahsulotOlchov);
        return this;
    }

    public void setMahsulotOlchov(MahsulotOlchov mahsulotOlchov) {
        this.mahsulotOlchov = mahsulotOlchov;
    }

    public Set<MahsulotVariant> getMahsulotVariants() {
        return this.mahsulotVariants;
    }

    public Mahsulot mahsulotVariants(Set<MahsulotVariant> mahsulotVariants) {
        this.setMahsulotVariants(mahsulotVariants);
        return this;
    }

    public Mahsulot addMahsulotVariant(MahsulotVariant mahsulotVariant) {
        this.mahsulotVariants.add(mahsulotVariant);
        mahsulotVariant.setMahsulot(this);
        return this;
    }

    public Mahsulot removeMahsulotVariant(MahsulotVariant mahsulotVariant) {
        this.mahsulotVariants.remove(mahsulotVariant);
        mahsulotVariant.setMahsulot(null);
        return this;
    }

    public void setMahsulotVariants(Set<MahsulotVariant> mahsulotVariants) {
        if (this.mahsulotVariants != null) {
            this.mahsulotVariants.forEach(i -> i.setMahsulot(null));
        }
        if (mahsulotVariants != null) {
            mahsulotVariants.forEach(i -> i.setMahsulot(this));
        }
        this.mahsulotVariants = mahsulotVariants;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Mahsulot)) {
            return false;
        }
        return id != null && id.equals(((Mahsulot) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Mahsulot{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", tur='" + getTur() + "'" +
            ", izoh='" + getIzoh() + "'" +
            "}";
    }
}
