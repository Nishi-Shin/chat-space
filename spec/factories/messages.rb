FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/elly20160701265118_TP_V4.jpg")}
    user
    group
  end
end