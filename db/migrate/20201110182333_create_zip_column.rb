class CreateZipColumn < ActiveRecord::Migration[5.2]
  def change
    add_column :mountains, :zip_code, :string
    end
  end
