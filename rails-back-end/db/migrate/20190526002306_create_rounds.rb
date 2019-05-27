class CreateRounds < ActiveRecord::Migration[5.2]
  def change
    create_table :rounds do |t|
      t.references :game
      t.integer :round
      t.integer :question
      t.integer :answer
      t.integer :winner

      t.timestamps
    end
  end
end
