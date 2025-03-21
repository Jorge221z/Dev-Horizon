<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Programmer extends Model
{
    /** @use HasFactory<\Database\Factories\ProgrammerFactory> */
    use HasFactory;

    // En el modelo Programmer
protected $appends = ["full_photo"];

public function getFullPhotoAttribute()
{
    return asset("storage/" . $this->photo);
}

}
