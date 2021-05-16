package uz.resus.temp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A MahsulotOlchov.
 */
@Entity
@Table(name = "mahsulot_olchov")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MahsulotOlchov implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "izoh")
    private String izoh;

    @OneToMany(mappedBy = "mahsulotOlchov")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "mahsulotOlchov", "mahsulotVariants" }, allowSetters = true)
    private Set<Mahsulot> mahsulots = new HashSet<>();

    @OneToMany(mappedBy = "mahsulotOlchov")
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

    public MahsulotOlchov id(Long id) {
        this.id = id;
        return this;
    }

    public String getNom() {
        return this.nom;
    }

    public MahsulotOlchov nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getIzoh() {
        return this.izoh;
    }

    public MahsulotOlchov izoh(String izoh) {
        this.izoh = izoh;
        return this;
    }

    public void setIzoh(String izoh) {
        this.izoh = izoh;
    }

    public Set<Mahsulot> getMahsulots() {
        return this.mahsulots;
    }

    public MahsulotOlchov mahsulots(Set<Mahsulot> mahsulots) {
        this.setMahsulots(mahsulots);
        return this;
    }

    public MahsulotOlchov addMahsulot(Mahsulot mahsulot) {
        this.mahsulots.add(mahsulot);
        mahsulot.setMahsulotOlchov(this);
        return this;
    }

    public MahsulotOlchov removeMahsulot(Mahsulot mahsulot) {
        this.mahsulots.remove(mahsulot);
        mahsulot.setMahsulotOlchov(null);
        return this;
    }

    public void setMahsulots(Set<Mahsulot> mahsulots) {
        if (this.mahsulots != null) {
            this.mahsulots.forEach(i -> i.setMahsulotOlchov(null));
        }
        if (mahsulots != null) {
            mahsulots.forEach(i -> i.setMahsulotOlchov(this));
        }
        this.mahsulots = mahsulots;
    }

    public Set<MahsulotVariant> getMahsulotVariants() {
        return this.mahsulotVariants;
    }

    public MahsulotOlchov mahsulotVariants(Set<MahsulotVariant> mahsulotVariants) {
        this.setMahsulotVariants(mahsulotVariants);
        return this;
    }

    public MahsulotOlchov addMahsulotVariant(MahsulotVariant mahsulotVariant) {
        this.mahsulotVariants.add(mahsulotVariant);
        mahsulotVariant.setMahsulotOlchov(this);
        return this;
    }

    public MahsulotOlchov removeMahsulotVariant(MahsulotVariant mahsulotVariant) {
        this.mahsulotVariants.remove(mahsulotVariant);
        mahsulotVariant.setMahsulotOlchov(null);
        return this;
    }

    public void setMahsulotVariants(Set<MahsulotVariant> mahsulotVariants) {
        if (this.mahsulotVariants != null) {
            this.mahsulotVariants.forEach(i -> i.setMahsulotOlchov(null));
        }
        if (mahsulotVariants != null) {
            mahsulotVariants.forEach(i -> i.setMahsulotOlchov(this));
        }
        this.mahsulotVariants = mahsulotVariants;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MahsulotOlchov)) {
            return false;
        }
        return id != null && id.equals(((MahsulotOlchov) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MahsulotOlchov{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", izoh='" + getIzoh() + "'" +
            "}";
    }
}
