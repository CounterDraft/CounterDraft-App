INSERT INTO organization_type(name, description, "createdAt", "updatedAt")
    VALUES ('Casino', 'Standard casino organization which is within a regulation', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO organization_type(name, description, "createdAt", "updatedAt")
    VALUES ('Bar', 'A sports bar of bar which offers free or paid dfs.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

#assumeing that we have a orgnization_type of 1;
INSERT INTO organization(id, name, description, has_multi_admin, type, "createdAt", "updatedAt")
    VALUES (999,'test', 'Test Organization', false, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

#add un-need migrations to your database;
INSERT INTO public.sequelize_meta(
	name, "createdAt", "updatedAt")
	VALUES ('20160926231604-adding-isActive-migration.js',CURRENT_TIMESTAMP ,CURRENT_TIMESTAMP );

INSERT INTO public.sequelize_meta(
	name, "createdAt", "updatedAt")
	VALUES ('20160928045755-adding-valid-registration-user.js',CURRENT_TIMESTAMP ,CURRENT_TIMESTAMP );

INSERT INTO public.sequelize_meta(
	name, "createdAt", "updatedAt")
	VALUES ('20161011165604-adding-isemail-employee-migration.js',CURRENT_TIMESTAMP ,CURRENT_TIMESTAMP );

INSERT INTO public.sequelize_meta(
	name, "createdAt", "updatedAt")
	VALUES ('20161013230505-add-uuid-to-patron-and-employee-migration.js',CURRENT_TIMESTAMP ,CURRENT_TIMESTAMP );
	
INSERT INTO public.sequelize_meta(
	name, "createdAt", "updatedAt")
	VALUES ('20161013233039-add-email-support-patron-player-migration.js',CURRENT_TIMESTAMP ,CURRENT_TIMESTAMP );
	
INSERT INTO public.sequelize_meta(
	name, "createdAt", "updatedAt")
	VALUES ('20161014041404-add-organization-uuid-migration.js',CURRENT_TIMESTAMP ,CURRENT_TIMESTAMP );

INSERT INTO public.sequelize_meta(
	name, "createdAt", "updatedAt")
	VALUES ('20161014182454-add-organization-key-migration.js',CURRENT_TIMESTAMP ,CURRENT_TIMESTAMP );
	
INSERT INTO public.sequelize_meta(
	name, "createdAt", "updatedAt")
	VALUES ('20161015074349-add-organization-id-to-tables-and-rename.js',CURRENT_TIMESTAMP ,CURRENT_TIMESTAMP );

INSERT INTO public.sequelize_meta(
	name, "createdAt", "updatedAt")
	VALUES ('20161020233338-adding-address-and-dob-patron.js',CURRENT_TIMESTAMP ,CURRENT_TIMESTAMP );

INSERT INTO public.sequelize_meta(
	name, "createdAt", "updatedAt")
	VALUES ('20161023064035-add-retrieve-to-patron-employee.js',CURRENT_TIMESTAMP ,CURRENT_TIMESTAMP );

INSERT INTO public.sequelize_meta(
	name, "createdAt", "updatedAt")
	VALUES ('20161025191631-adding-phone-to-patron.js',CURRENT_TIMESTAMP ,CURRENT_TIMESTAMP );

INSERT INTO public.sequelize_meta(
	name, "createdAt", "updatedAt")
	VALUES ('20161104181626-settings-organization.js',CURRENT_TIMESTAMP ,CURRENT_TIMESTAMP );


	
	



#set all users to password = password
UPDATE public.employee_user
	SET password='sha1$864f5f30$1$fe38b7457a4c2e466f635a3382a207570298d0e2';

UPDATE public.patron_player
	SET password='sha1$864f5f30$1$fe38b7457a4c2e466f635a3382a207570298d0e2';


	