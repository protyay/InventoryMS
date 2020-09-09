CREATE TABLE state_master (
	id INT NOT NULL AUTO_INCREMENT,
	stateCode VARCHAR(4) NOT NULL,
	stateName VARCHAR(30) NOT NULL,
	createdAt DATE,
	updatedAt DATE,
	PRIMARY KEY (id)
) ENGINE=InnoDB;