<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
class AddTriggersAndFunctions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('DROP TRIGGER IF EXISTS tr_order_item_list_after_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS tr_order_item_list_after_update');
        DB::unprepared('DROP TRIGGER IF EXISTS tr_order_item_list_after_delete');
        DB::unprepared('DROP TRIGGER IF EXISTS tr_storage_itemsize_list_after_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS tr_storage_itemsize_list_after_update');
        DB::unprepared('DROP TRIGGER IF EXISTS tr_storage_itemsize_list_after_delete');
        DB::unprepared('DROP TRIGGER IF EXISTS tr_storage_itemsize_list_after_send_update');
        
        DB::unprepared('DROP TRIGGER IF EXISTS tr_order_item_list_before_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS tr_order_item_list_before_update');
        DB::unprepared('DROP TRIGGER IF EXISTS tr_order_item_list_before_delete');
        DB::unprepared('DROP TRIGGER IF EXISTS tr_storage_itemsize_list_before_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS tr_storage_itemsize_list_before_update');
        DB::unprepared('DROP TRIGGER IF EXISTS tr_storage_itemsize_list_before_delete');
        DB::unprepared('DROP TRIGGER IF EXISTS tr_storage_itemsize_list_before_send_update');
        DB::unprepared('DROP TRIGGER IF EXISTS before_order_item_list_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS before_order_item_list_update');
        DB::unprepared('DROP TRIGGER IF EXISTS after_order_item_list_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS after_order_item_list_update');
        DB::unprepared('DROP TRIGGER IF EXISTS after_order_item_list_delete');

        // Триггер для order_item_list
        DB::unprepared('
            CREATE TRIGGER tr_order_item_list_after_insert
            AFTER INSERT ON order_item_list
            FOR EACH ROW
            BEGIN
                UPDATE item_sizes_lists
                SET total_count = total_count - NEW.count,
                    total_ordered = total_ordered + NEW.count
                WHERE id = NEW.item_size_id;
            END
        ');

        DB::unprepared('
            CREATE TRIGGER tr_order_item_list_after_update
            AFTER UPDATE ON order_item_list
            FOR EACH ROW
            BEGIN
                UPDATE item_sizes_lists
                SET total_count = total_count - (NEW.count - OLD.count),
                    total_ordered = total_ordered + (NEW.count - OLD.count)
                WHERE id = NEW.item_size_id;
            END
        ');

        DB::unprepared('
            CREATE TRIGGER tr_order_item_list_after_delete
            AFTER DELETE ON order_item_list
            FOR EACH ROW
            BEGIN
                UPDATE item_sizes_lists
                SET total_count = total_count + OLD.count,
                    total_ordered = total_ordered - OLD.count
                WHERE id = OLD.item_size_id;
            END
        ');

        // Триггеры для storage_itemsize_list
        DB::unprepared('
            CREATE TRIGGER tr_storage_itemsize_list_after_insert
            AFTER INSERT ON storage_itemsize_list
            FOR EACH ROW
            BEGIN
                UPDATE item_sizes_lists
                SET total_in_storage = total_in_storage + NEW.count,
                    total_count = total_count + NEW.count
                WHERE id = NEW.item_size_id;
            END
        ');

        DB::unprepared('
            CREATE TRIGGER tr_storage_itemsize_list_after_update
            AFTER UPDATE ON storage_itemsize_list
            FOR EACH ROW
            BEGIN
                UPDATE item_sizes_lists
                SET total_in_storage = total_in_storage + (NEW.count - OLD.count),
                    total_count = total_count + (NEW.count - OLD.count)
                WHERE id = NEW.item_size_id;
            END
        ');

        DB::unprepared('
            CREATE TRIGGER tr_storage_itemsize_list_after_delete
            AFTER DELETE ON storage_itemsize_list
            FOR EACH ROW
            BEGIN
                UPDATE item_sizes_lists
                SET total_in_storage = total_in_storage - OLD.count,
                    total_count = total_count - OLD.count
                WHERE id = OLD.item_size_id;
            END
        ');

        DB::unprepared('
            CREATE TRIGGER tr_storage_itemsize_list_after_send_update
            AFTER UPDATE ON storage_itemsize_list
            FOR EACH ROW
            BEGIN
                UPDATE item_sizes_lists
                SET total_delivered = total_delivered + (NEW.total_sended - OLD.total_sended),
                    total_ordered = total_ordered - (NEW.total_sended - OLD.total_sended)
                WHERE id = NEW.item_size_id;
            END
        ');
        
        DB::unprepared('
            CREATE TRIGGER before_order_item_list_insert
            BEFORE INSERT ON order_item_list
            FOR EACH ROW
            BEGIN
                SET NEW.total_price = ROUND(NEW.this_price * NEW.count, 2);
            END
        ');

        // Trigger before update on order_item_list
        DB::unprepared('
            CREATE TRIGGER before_order_item_list_update
            BEFORE UPDATE ON order_item_list
            FOR EACH ROW
            BEGIN
                SET NEW.total_price = ROUND(NEW.this_price * NEW.count, 2);
            END
        ');

        // Trigger after insert on order_item_list
        DB::unprepared('
            CREATE TRIGGER after_order_item_list_insert
            AFTER INSERT ON order_item_list
            FOR EACH ROW
            BEGIN
                UPDATE orders
                SET total_items = total_items + NEW.count,
                    total_price = total_price + NEW.total_price
                WHERE id = NEW.order_id;
            END
        ');

        // Trigger after update on order_item_list
        DB::unprepared('
            CREATE TRIGGER after_order_item_list_update
            AFTER UPDATE ON order_item_list
            FOR EACH ROW
            BEGIN
                UPDATE orders
                SET total_items = total_items - OLD.count + NEW.count,
                    total_price = total_price - OLD.total_price + NEW.total_price
                WHERE id = NEW.order_id;
            END
        ');

        // Trigger after delete on order_item_list
        DB::unprepared('
            CREATE TRIGGER after_order_item_list_delete
            AFTER DELETE ON order_item_list
            FOR EACH ROW
            BEGIN
                UPDATE orders
                SET total_items = total_items - OLD.count,
                    total_price = total_price - OLD.total_price
                WHERE id = OLD.order_id;
            END
        ');
        // Функция SendItemStorage
        DB::unprepared('
            DROP PROCEDURE IF EXISTS SendItemStorage;
            CREATE PROCEDURE  SendItemStorage(IN item_size_id BIGINT, IN storage_id BIGINT, IN amount BIGINT)
            BEGIN
                DECLARE current_count BIGINT;
                SELECT count INTO current_count
                FROM storage_itemsize_list
                WHERE item_size_id = item_size_id AND storage_id = storage_id;

                IF current_count < amount THEN
                    SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "Not enough items in storage.";
                ELSE
                    UPDATE storage_itemsize_list
                    SET count = count - amount, total_sended = total_sended + amount
                    WHERE item_size_id = item_size_id AND storage_id = storage_id;
                END IF;
            END
        ');

        // Функция BackItemStorage
        DB::unprepared('
            DROP PROCEDURE IF EXISTS BackItemStorage;
            CREATE PROCEDURE BackItemStorage(IN item_size_id BIGINT, IN storage_id BIGINT, IN amount BIGINT)
            BEGIN
                DECLARE current_sended BIGINT;
                SELECT total_sended INTO current_sended
                FROM storage_itemsize_list
                WHERE item_size_id = item_size_id AND storage_id = storage_id;

                IF current_sended < amount THEN
                    SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "Cannot return more items than were sent.";
                ELSE
                    UPDATE storage_itemsize_list
                    SET count = count + amount, total_sended = total_sended - amount
                    WHERE item_size_id = item_size_id AND storage_id = storage_id;
                END IF;
            END
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Удаление триггеров
        DB::unprepared('DROP TRIGGER IF EXISTS tr_order_item_list_after_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS tr_order_item_list_after_update');
        DB::unprepared('DROP TRIGGER IF EXISTS tr_order_item_list_after_delete');
        DB::unprepared('DROP TRIGGER IF EXISTS tr_storage_itemsize_list_after_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS tr_storage_itemsize_list_after_update');
        DB::unprepared('DROP TRIGGER IF EXISTS tr_storage_itemsize_list_after_delete');
        DB::unprepared('DROP TRIGGER IF EXISTS tr_storage_itemsize_list_after_send_update');

        // Удаление функций
        DB::unprepared('DROP PROCEDURE IF EXISTS SendItemStorage');
        DB::unprepared('DROP PROCEDURE IF EXISTS BackItemStorage');
    }
}