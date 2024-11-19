<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('OpenPages/Main');
});


$routes = ['/womens', '/mens', '/girls', '/boys', '/search']; 

foreach ($routes as $route) {
    Route::get($route, function () {
        return Inertia::render('OpenPages/Search');
    });
    Route::get("{$route}/model/{id}", function ($id) use ($route) {
        return app(\App\Http\Controllers\Publics\ItemViewController::class)->showViewItem($route, $id);
    });
}

Route::get('/states', function () {
    return Inertia::render('OpenPages/StateList');
});
Route::get("/states/state/{id}", function () {
    return Inertia::render('OpenPages/State');
});

Route::get('/busket', function () {
    return Inertia::render('OpenPages/BusketPage');
});

Route::get('/busket/order', function () {
    return Inertia::render('OpenPages/OrderPage');
})->middleware(['auth', 'verified']);


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
}); 


Route::get('/workerpanel/admin', function () {
    return Inertia::render('WorkerPages/Admin/AdminPage');
})->middleware(['auth', 'verified'])->name('workerpanel');




Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/workerpanel/admin/brands', function () {
        return Inertia::render('WorkerPages/Admin/AdminBrandPage');
    })->name('admin.brands');
    Route::get('/workerpanel/admin/items', function () {
        return Inertia::render('WorkerPages/Admin/AdminItemPage');
    })->name('admin.items');
    Route::get('/workerpanel/admin/news', function () {
        return Inertia::render('WorkerPages/Admin/AdminStatePage');
    })->name('admin.state');
    Route::get('/workerpanel/admin/users', function () {
        return Inertia::render('WorkerPages/Admin/AdminUserPage');
    })->name('admin.users');
    Route::get('/workerpanel/admin/discounts', function () {
        return Inertia::render('WorkerPages/Admin/AdminDiscountPage');
    })->name('admin.discounts');
    Route::get('/workerpanel/admin/materials', function () {
        return Inertia::render('WorkerPages/Admin/AdminMaterialsPage');
    })->name('admin.materials');

    Route::get('/workerpanel/admin/postavki', function () {
        return Inertia::render('WorkerPages/Admin/AdminPostavkiPage');
    })->name('admin.postavki');
    Route::get('/workerpanel/admin/orders', function () {
        return Inertia::render('WorkerPages/Admin/AdminOrderPage');
    })->name('admin.orders');


    //rebuild


    Route::get('/workerpanel/moderator', function () {
        return Inertia::render('ModeratorPanel');
    })->name('moderator.panel');

    Route::get('/workerpanel/worker', function () {
        return Inertia::render('WorkerPanel');
    })->name('worker.panel');

    Route::get('/workerpanel/worker/orders', function () {
        return Inertia::render('Worker/Orders');
    })->name('worker.orders');

    Route::get('/workerpanel/worker/items', function () {
        return Inertia::render('Worker/Items');
    })->name('worker.items');

    




    Route::get('/workerpanel/moderator/coments', function () {
        return Inertia::render('Moderator/Coments');
    })->name('moderator.coments');

    Route::get('/workerpanel/moderator/items', function () {
        return Inertia::render('Moderator/Items');
    })->name('moderator.items');
    
    Route::get('/workerpanel/admin/category', function () {
        return Inertia::render('Admin/Category');
    })->name('admin.category');





    Route::get('/workerpanel/admin/setings', function () {
        return Inertia::render('Admin/Settings');
    })->name('admin.settings');
});

require __DIR__.'/auth.php';
