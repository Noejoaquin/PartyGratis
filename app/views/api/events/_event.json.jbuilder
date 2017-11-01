json.extract! event, :id, :category_id, :organizer_id, :name, :description, :location, :ticket_type, :price, :start_time, :end_time
json.image_url asset_path(event.image.url)
json.organizer User.find(event.organizer_id).first_name + ' ' + User.find(event.organizer_id).last_name
