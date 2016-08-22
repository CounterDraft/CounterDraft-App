INSERT INTO organization_type(name, description, "createdAt", "updatedAt")
    VALUES ('Casino', 'Standard casino organization which is within a regulation', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

#assumeing that we have a orgnization_type of 1;
INSERT INTO organization(id, name, description, has_multi_admin, type, "createdAt", "updatedAt")
    VALUES (999,'test', 'Test Organization', false, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
