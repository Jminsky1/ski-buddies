class MountainPictureUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  if Rails.env.test?
    storage :file
  else 
    storage :fog
  end
end
