<?php

namespace Database\Seeders\TempLargeSeeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'John',
                'surname' => 'Doe',
                'otchestvo' => 'Ivanovich',
                'email' => 'john.doe@example.com',
                'password' => Hash::make('password'),
                'phone' => '+374 10 123 4567',
                'city' => 'Yerevan',
                'street' => 'Main Street',
                'house' => '1',
                'apartment' => '10',
                'role_id' => 1,
            ],
            [
                'name' => 'Jane',
                'surname' => 'Smith',
                'otchestvo' => null,
                'email' => 'jane.smith@example.com',
                'password' => Hash::make('password'),
                'phone' => '+374 11 234 5678',
                'city' => 'Gyumri',
                'street' => 'Second Street',
                'house' => '2',
                'apartment' => '20',
                'role_id' => 1,
            ],
            [
                'name' => 'Alice',
                'surname' => 'Johnson',
                'otchestvo' => 'Petrovna',
                'email' => 'alice.johnson@example.com',
                'password' => Hash::make('password'),
                'phone' => '+374 12 345 6789',
                'city' => 'Vanadzor',
                'street' => 'Third Street',
                'house' => '3',
                'apartment' => '30',
                'role_id' => 1,
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
