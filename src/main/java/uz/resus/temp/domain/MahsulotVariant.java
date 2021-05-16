package uz.resus.temp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A MahsulotVariant.
 */
@Entity
@Table(name = "mahsulot_variant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MahsulotVariant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "izoh")
    private String izoh;

    @ManyToOne
    @JsonIgnoreProperties(value = { "mahsulotOlchov", "mahsulotVariants" }, allowSetters = true)
    private Mahsulot mahsulot;

    @ManyToOne
    @JsonIgnoreProperties(value = { "mahsulots", "mahsulotVariants" }, allowSetters = true)
    private MahsulotOlchov mahsulotOlchov;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MahsulotVariant id(Long id) {
        this.id = id;
        return this;
    }

    public String getNom() {
        return this.nom;
    }

    public MahsulotVariant nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getIzoh() {
        return this.izoh;
    }

    public MahsulotVariant izoh(String izoh) {
        this.izoh = izoh;
        return this;
    }

    public void setIzoh(String izoh) {
        this.izoh = izoh;
    }

    public Mahsulot getMahsulot() {
        return this.mahsulot;
    }

    public MahsulotVariant mahsulot(Mahsulot mahsulot) {
        this.setMahsulot(mahsulot);
        return this;
    }

    public void setMahsulot(Mahsulot mahsulot) {
        this.mahsulot = mahsulot;
    }

    public MahsulotOlchov getMahsulotOlchov() {
        return this.mahsulotOlchov;
    }

    public MahsulotVariant mahsulotOlchov(MahsulotOlchov mahsulotOlchov) {
        this.setMahsulotOlchov(mahsulotOlchov);
        return this;
    }

    public void setMahsulotOlchov(MahsulotOlchov mahsulotOlchov) {
        this.mahsulotOlchov = mahsulotOlchov;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MahsulotVariant)) {
            return false;
        }
        return id != null && id.equals(((MahsulotVariant) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MahsulotVariant{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", izoh='" + getIzoh() + "'" +
            "}";
    }
}
