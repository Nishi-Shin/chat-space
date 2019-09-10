# DB設計

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|         |
|image|string|      |
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association

- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: false, uniqe: true|

### Association

- has_many :group_users
- has_many :groups, through: :group_users
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, uniqe: true|

### Association

- has_many :group_users
- has_many :users, through: :group_users
- has_many  :messages

## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|users_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association

- belongs_to :group
- belongs_to :user