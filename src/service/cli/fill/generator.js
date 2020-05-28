'use strict';

const User = require(`./entities/user`);
const Offer = require(`./entities/offer`);
const OffersComment = require(`./entities/offers-comment`);
const Category = require(`./entities/category`);
const OffersCategory = require(`./entities/offers-category`);

class Generator {
  constructor(entitiesDTO) {
    this._entitiesDTO = entitiesDTO;
    this._result = ``;
  }

  generateSQL() {
    this
      ._add(this._getEncryptFunction())
      ._add(this._getEmptyLine(2));

    this._entitiesDTO.getTablesForTruncate().forEach((table) => {
      this
        ._add(this._getTruncateTableQuery(table))
        ._add(this._getEmptyLine());
    });

    this
      ._add(this._getEmptyLine())
      ._add(this._getInsertQuery(User.tableName(), User.fields(), this._entitiesDTO.users))
      ._add(this._getEmptyLine(2))
      ._add(this._getInsertQuery(Category.tableName(), Category.fields(), this._entitiesDTO.categories))
      ._add(this._getEmptyLine(2))
      ._add(this._getInsertQuery(Offer.tableName(), Offer.fields(), this._entitiesDTO.offers))
      ._add(this._getEmptyLine(2))
      ._add(this._getInsertQuery(OffersComment.tableName(), OffersComment.fields(), this._entitiesDTO.offersComments))
      ._add(this._getEmptyLine(2))
      ._add(this._getInsertQuery(OffersCategory.tableName(), OffersCategory.fields(), this._entitiesDTO.offersCategories));

    return this;
  }

  _getTruncateTableQuery(table) {
    return `TRUNCATE TABLE public.${table} CASCADE;`;
  }

  _getInsertQuery(tableName, fields, values) {
    const joinedValues = values.map((valueRow) => valueRow.join(`, `));
    return `INSERT INTO public.${tableName}(${fields.join(`, `)}) VALUES\n(${(joinedValues).join(`),\n(`)});`;
  }

  _getEmptyLine(quantityOfLines = 1) {
    return Array(quantityOfLines).fill(`\n`).join(``);
  }

  _add(string) {
    this._result += string;

    return this;
  }

  _getEncryptFunction() {
    return `
      -- Function for encrypting primary key
    CREATE OR REPLACE FUNCTION pseudo_encrypt(VALUE int) returns int AS $$
    DECLARE
    l1 int;
    l2 int;
    r1 int;
    r2 int;
    i int:=0;
    BEGIN
     l1:= (VALUE >> 16) & 65535;
     r1:= VALUE & 65535;
     WHILE i < 3 LOOP
       l2 := r1;
       r2 := l1 # ((((1366 * r1 + 150889) % 714025) / 714025.0) * 32767)::int;
       l1 := l2;
       r1 := r2;
       i := i + 1;
     END LOOP;
     RETURN ((r1 << 16) + l1);
    END;
    $$ LANGUAGE plpgsql strict immutable;`.trim();
  }

  getBuiltResult() {
    return this._result;
  }
}

module.exports = Generator;
