INSERT INTO organization_type(name, description, "createdAt", "updatedAt")
    VALUES ('casino', 'Standard casino organization which is within a regulation', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    
INSERT INTO organization(id, name, description, has_multi_admin, type, "createdAt", "updatedAt")
    VALUES (999,'test', 'Testing organization', false, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
