class MountainSerializer < ActiveModel::Serializer 
  attributes :id, :name, :location, :zip_code, :size, :description, :mountain_picture
end

