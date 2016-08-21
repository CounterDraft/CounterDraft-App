INSERT INTO organization_type(name, description, "createdAt", "updatedAt")
    VALUES ('casino', 'Standard casino organization which is within a regulation', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    
INSERT INTO organization(name, description, has_multi_admin, type, "createdAt", "updatedAt")
    VALUES ('test', 'Testing organization', false, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
