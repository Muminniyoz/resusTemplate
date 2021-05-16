package uz.resus.temp.cucumber;

import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;
import uz.resus.temp.ResusTemplateApp;

@CucumberContextConfiguration
@SpringBootTest(classes = ResusTemplateApp.class)
@WebAppConfiguration
public class CucumberTestContextConfiguration {}
