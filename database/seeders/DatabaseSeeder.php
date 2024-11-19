<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $this->call(ColorsTableSeeder::class);
        $this->call(SizesTableSeeder::class);
        $this->call(MaterialSolesTableSeeder::class);
        $this->call(HeelpieceTypesTableSeeder::class);
        $this->call(ClaspTypesTableSeeder::class);
        $this->call(SeasonsTableSeeder::class);
        $this->call(MaterialInsidesTableSeeder::class);
        $this->call(MaterialOutsidesTableSeeder::class);
        $this->call(MainCategoriesTableSeeder::class);
        $this->call(ChildCategoriesTableSeeder::class);
        $this->call(BrandsTableSeeder::class);
        $this->call(StorageTypesTableSeeder::class);
        $this->call(ActionFotosTableSeeder::class);
        $this->call(DeliveryTypeSeeder::class);
        $this->call(OrderStatusSeeder::class);
        $this->call(UserDeliveryTypesSeeder::class);
        $this->call(UserRolesTableSeeder::class);
        $this->call(PaymentTypesSeeder::class);

        //temp large seeders
        // $this->call(TempLargeSeeders\ItemsTableSeeder::class);
        // $this->call(TempLargeSeeders\UsersTableSeeder::class);
        // $this->call(TempLargeSeeders\UserWorkersTableSeeder::class);
        // $this->call(TempLargeSeeders\StoragesTableSeeder::class);
        $this->call(TempLargeSeeders\StatesTableSeeder::class);
        // $this->call(TempLargeSeeders\ActionTableSeeder::class);
        // $this->call(TempLargeSeeders\ActionItemListTableSeeder::class);
        // $this->call(TempLargeSeeders\OrdersTableSeeder::class);
        // $this->call(TempLargeSeeders\NotificationsTableSeeder::class);
        // $this->call(TempLargeSeeders\ReviewsTableSeeder::class);
        // $this->call(TempLargeSeeders\MessagesTableSeeder::class);

        
        //temp seeders
        // $this->call(TempSeeders\StorageWorkerListTableSeeder::class);
        // $this->call(TempSeeders\ItemColorListTableSeeder::class);
        // $this->call(TempSeeders\ItemSizesListTableSeeder::class);
        // $this->call(TempSeeders\ItemMaterialInsListTableSeeder::class);
        // $this->call(TempSeeders\ItemMaterialOutListTableSeeder::class);
        // $this->call(TempSeeders\ItemClaspTypeListTableSeeder::class);
        // $this->call(TempSeeders\StorageItemSizeLisTableSeeder::class);
        // $this->call(TempSeeders\OrderItemListTableSeeder::class);

        
    
    }
}
