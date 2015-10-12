"use strict";

function repositoryBase() {
    this.tag = 'counter-repository';

    this.getTag = function() {
        return this.name;
    }
}

module.exports = repositoryBase;
