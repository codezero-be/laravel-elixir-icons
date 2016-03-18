# Laravel Elixir Icon Font

[![Version](https://img.shields.io/npm/v/laravel-elixir-icons.svg?style=plastic)](https://www.npmjs.com/package/laravel-elixir-icons)
[![Dependencies](https://img.shields.io/david/codezero-be/laravel-elixir-icons.svg?style=plastic)](https://www.npmjs.com/package/laravel-elixir-icons)
[![npm](https://img.shields.io/npm/l/laravel-elixir-icons.svg?style=plastic)](https://www.npmjs.com/package/laravel-elixir-icons)


This is an extension for [Laravel Elixir](https://github.com/laravel/elixir) that lets you create an icon webfont from `.svg` images. This is achieved by the Gulp plugins [gulp-iconfont](https://github.com/nfroidure/gulp-iconfont) and [gulp-iconfont-css](https://github.com/backflip/gulp-iconfont-css).

## Installation

Install Gulp, Laravel Elixir and this extension in your project:

    npm install --save-dev gulp laravel-elixir laravel-elixir-icons 

> **TIP:** You will need to have [NodeJS](http://nodejs.org/) and [Gulp](http://gulpjs.com/) installed on your machine!

## Usage

Create a `gulpfile.js` and run `mix.icons()` like any other elixir function.

    var elixir = require('laravel-elixir');

    require('laravel-elixir-icons');
    
    elixir(function (mix) {
    
        mix.icons();
    
    });
    
By default the extension looks for icons in a directory `icons` under the Laravel assets folder. A `_icon-font.scss` file will be written in the `sass` folder and the webfont will be saved in `public/fonts`. You can change these paths by providing one ore more options as an argument.

    mix.icons({
        iconsPath: "assets/icons/",
        sassPath: "assets/sass/",
        fontPath: "public/fonts/",
        relativeCssDir: "/fonts/",
        iconFontName: "icon-font",
        sassFileName: "_icon-font.scss"
        template: "path/to/custom-icon-font-template.scss"
    });
    
The `relativeCssDir` is the relative path from the production `css` file to the font files. By default it is set from the domain root: `/fonts`. The `iconFontName` will be the filename of the webfont and the generated SASS file.

You can also copy the template for the SASS file, and adjust it if you want. Just point `template` to the right file.

---
[![Analytics](https://ga-beacon.appspot.com/UA-58876018-1/codezero-be/laravel-elixir-icons)](https://github.com/igrigorik/ga-beacon)