<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriController extends Controller
{
    public function index()
    {

        return Inertia::render('Categories/Index', [
            'categories' => Category::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'name_category' => 'required|unique:categories|max:255',
        ]);



        Category::create($validated);

        return redirect()->route('categories.index')
            ->with('success', 'Category created successfully.');
    }

    public function edit(Category $category)
    {
        return Inertia::render('Categories/Edit', [
            'category' => $category
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name_category' => 'required|unique:categories,name_category,'.$category->id.'|max:255'
        ]);

        $category->update($validated);

        return redirect()->route('categories.index')
        ->with('success', 'Category updated successfuly.');
    }

    public function destroy(Category $category){

        $category->delete();

        return redirect()->route('categories.index')
        ->with('success', 'Category deleted successfuly.');

    }
}
