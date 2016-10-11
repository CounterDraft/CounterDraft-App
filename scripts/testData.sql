INSERT INTO organization_type(name, description, "createdAt", "updatedAt")
    VALUES ('Casino', 'Standard casino organization which is within a regulation', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

#assumeing that we have a orgnization_type of 1;
INSERT INTO organization(id, name, description, has_multi_admin, type, "createdAt", "updatedAt")
    VALUES (999,'test', 'Test Organization', false, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

#add un-need migrations to your database;
INSERT INTO public.sequelize_meta(
	name, "createdAt", "updatedAt")
	VALUES ('20160926231604-adding-isActive-migration.js',current_timestamp ,current_timestamp );

INSERT INTO public.sequelize_meta(
	name, "createdAt", "updatedAt")
	VALUES ('20160928045755-adding-valid-registration-user.js',current_timestamp ,current_timestamp );

INSERT INTO public.sequelize_meta(
	name, "createdAt", "updatedAt")
	VALUES ('20161011165604-adding-isemail-employee-migration.js',current_timestamp ,current_timestamp );
