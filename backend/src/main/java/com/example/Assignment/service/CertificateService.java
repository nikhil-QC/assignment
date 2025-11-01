package com.example.Assignment.service;

import com.example.Assignment.model.Certificate;
import com.example.Assignment.repository.CertificateRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CertificateService {

    private final CertificateRepository repository;

    public CertificateService(CertificateRepository repository) {
        this.repository = repository;
    }

    public Certificate addCertificate(Certificate certificate) {
        if (certificate.getValidTo().isBefore(certificate.getValidFrom())) {
            throw new IllegalArgumentException("Valid To date must be after Valid From date");
        }
        return repository.save(certificate);
    }

    public List<Certificate> getAllCertificates() {
        return repository.findAll();
    }
}
