package com.dba9514.ecommerce.config;

import com.dba9514.ecommerce.entities.Country;
import com.dba9514.ecommerce.entities.Product;
import com.dba9514.ecommerce.entities.ProductCategory;
import com.dba9514.ecommerce.entities.State;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] unsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

        //Disable HTTP methods for specific repos:  PUT, POST, and DELETE
        //Effectively making the repository read only.
        disableHttpMethods(Product.class, config, unsupportedActions);
        disableHttpMethods(ProductCategory.class, config, unsupportedActions);
        disableHttpMethods(Country.class, config, unsupportedActions);
        disableHttpMethods(State.class, config, unsupportedActions);

        //Call an internal helper method to expose Ids
        exposeIds(config);
    }

    //Implementation for disabling certain HTTP methods.
    private static void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] unsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        // expose entity ids
        //

        // - get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // - create an array of the entity types
        List<Class> entityClasses = new ArrayList<>();

        // - get the entity types for the entities
        for (EntityType tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }

        // - expose the entity ids for the array of entity/domain types
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);

    }
}
