<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\File;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Programmer>
 */
class ProgrammerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
    $skills = ["Laravel", "React", "Vue", "Python", "Node.js", "Ruby", "Go", "Rust", "C++", "Swift", "Kotlin", "Java", "C#"];
    $randomSkills = $this->faker->randomElements($skills, rand(1, 3));

    // Ruta donde se guardarán las imágenes
    $dir = storage_path('app/public/programmers');

    // Asegúrate de que el directorio exista
    File::ensureDirectoryExists($dir);

    // Genera la imagen y obtén su nombre de archivo
    // En ProgrammerFactory.php
    $photo = 'programmers/' . uniqid() . '.jpg';
    copy('https://i.pravatar.cc/200?u=' . $this->faker->uuid, storage_path('app/public/' . $photo));

// Si falla, forzar nombre único
if (!$photo) {
    $photo = 'programmers/default.jpg';
}

    return [
        "name" => $this->faker->name(),
        "summary" => $this->faker->text(150),
        'photo' => $photo, // Guarda solo el nombre del archivo
        "skills" => implode(", ", $randomSkills),
    ];
}
}
