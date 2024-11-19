<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->firstName,
            'surname' => $this->faker->lastName,
            'otchestvo' => $this->faker->optional()->firstName,
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => Hash::make('password'), // Используем статическое значение 'password'
            'remember_token' => Str::random(10),
            'phone' => '+374 ' . $this->faker->numberBetween(10, 99) . ' ' . $this->faker->numberBetween(100, 999) . ' ' . $this->faker->numberBetween(1000, 9999),
            'city' => $this->faker->city,
            'street' => $this->faker->streetName,
            'house' => $this->faker->buildingNumber,
            'apartment' => $this->faker->optional()->numerify('##'),
            'role_id' => 1, // Дефолтное значение для роли пользователя
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
