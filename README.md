# DB設計

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|         |
|image|string|      |
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association

- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index: true|
|email|atring|null: false, uniqe: true|

### Association

- has_many :group_users
- has_many :group_through
- has_many :group_users
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, uniqe: true|

### Association

- has_many :group_users
- has_many :group_through
- has_many :group_users
- has_many  :messages

## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|users_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association

- belongs_to :group
- belongs_to :user