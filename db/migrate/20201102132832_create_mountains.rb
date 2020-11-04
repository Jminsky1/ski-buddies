class CreateMountains < ActiveRecord::Migration[5.2]
  def change
    create_table :mountains do |t|
      t.string :name, null: false
      t.string :location, null: false
      t.integer :size, null: false
      t.string :mountain_picture
      
      t.timestamps
    end
  end
end
