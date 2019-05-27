# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_26_005555) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cards", force: :cascade do |t|
    t.boolean "isQuestion"
    t.string "content"
    t.boolean "fromInternet"
    t.bigint "deck_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deck_id"], name: "index_cards_on_deck_id"
  end

  create_table "decks", force: :cascade do |t|
    t.string "theme"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "games", force: :cascade do |t|
    t.integer "maxRound"
    t.integer "currentRound"
    t.boolean "isEveryoneDeck"
    t.integer "currentQuestion"
    t.integer "currentAnswer"
    t.integer "maxPlayers"
    t.integer "creator"
    t.integer "currentQuestioner"
    t.integer "roundWinner"
    t.integer "deck_id"
    t.string "gameStatus"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rounds", force: :cascade do |t|
    t.bigint "game_id"
    t.integer "round"
    t.integer "question"
    t.integer "answer"
    t.integer "winner"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_rounds_on_game_id"
  end

  create_table "user_game_infos", force: :cascade do |t|
    t.integer "user_id"
    t.integer "game_id"
    t.integer "roundPoints"
    t.string "userStatus"
    t.text "hands", default: [], array: true
    t.integer "selectedCard"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password"
    t.boolean "isAdult"
    t.boolean "isBot"
    t.integer "leaderboardPoints"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
