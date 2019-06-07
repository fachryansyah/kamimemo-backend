'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MemoSchema extends Schema {
  up () {
    this.create('memos', (table) => {
      table.increments()
      table.integer("user_id").unsigned().references("id").inTable("users")
      table.string("title", 80).notNullable()
      table.string("content", 2000).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('memos')
  }
}

module.exports = MemoSchema
