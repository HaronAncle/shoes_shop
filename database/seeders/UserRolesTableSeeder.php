<?php

namespace Database\Seeders;

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserRolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_roles')->insert([
            ['search_title' => 'user'],
            [ 'search_title' => 'worker_simple'],
            [ 'search_title' => 'worker_boss'],
            [ 'search_title' => 'worker_moderator'],
            [ 'search_title' => 'admin'],
        ]);
    }
}
