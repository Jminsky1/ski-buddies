class AddDescriptionToMountains < ActiveRecord::Migration[5.2]
  def change
    add_column :mountains, :description, :string
  end
end
