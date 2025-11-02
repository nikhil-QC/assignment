package com.example.Assignment.service;

import com.example.Assignment.model.Certificate;
import com.example.Assignment.repository.CertificateRepository;
import org.springframework.stereotype.Service;
import org.springframework.lang.NonNull;

import java.time.LocalDate;
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

        // Automatically set certificate status
        if (certificate.getValidTo().isBefore(LocalDate.now())) {
            certificate.setStatus("EXPIRED");
        } else {
            certificate.setStatus("ACTIVE");
        }

        return repository.save(certificate);
    }

    public List<Certificate> getAllCertificates() {
        return repository.findAll();
    }

    public Certificate getCertificateById(@NonNull Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Certificate not found"));
    }

    public void deleteCertificate(@NonNull Long id) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("Certificate with ID " + id + " not found");
        }
        repository.deleteById(id);
    }
}
