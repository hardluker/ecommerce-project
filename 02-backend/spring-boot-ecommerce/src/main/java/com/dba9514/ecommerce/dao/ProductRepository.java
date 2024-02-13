package com.dba9514.ecommerce.dao;

import com.dba9514.ecommerce.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {

    //Querying by category id and returning it as a Page for the front end.
    //Essentially, this is a list of products only in the specific category.
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

}
