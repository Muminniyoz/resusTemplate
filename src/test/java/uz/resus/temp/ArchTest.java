package uz.resus.temp;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("uz.resus.temp");

        noClasses()
            .that()
            .resideInAnyPackage("uz.resus.temp.service..")
            .or()
            .resideInAnyPackage("uz.resus.temp.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..uz.resus.temp.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
