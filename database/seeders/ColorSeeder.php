<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $colors = array_map(function($color){
            return ['code' => $color];
        },['yellow', 'green', 'red', 'orange', 'blue', 'violet', 'pink']);

        Color::upsert($colors, ['id']);
    }
}
