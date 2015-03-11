var gulp = require("gulp"),
    elixir = require("laravel-elixir"),
    iconFont = require('gulp-iconfont'),
    iconFontCss = require('gulp-iconfont-css'),
    _  = require('underscore');

elixir.extend("icons", function (options) {

    var config = this,
        defaultOptions = {
            srcDir:         config.assetsDir + 'icons/',
            sassDir:        config.assetsDir + "sass/",
            fontDir:        "public/fonts/",
            relativeCssDir: "/fonts/",
            iconFontName:   "icon-font",
            template:       __dirname + "/icon-font-template.scss"
        };

    options = _.extend(defaultOptions, options);

    // The icon font SASS file will be saved relative to the fontDir
    // So we need to get to the project root => ../../../
    function getRoot(path) {
        var backPath = '',
            depth = (path.match(/\//g) || []).length;

        for (var i = 0; i < depth; i++) {
            backPath += '../';
        }

        return backPath;
    }

    gulp.task("icons", function () {

        gulp.src([options.srcDir + "*.svg"], {base: './'})
            .pipe(iconFontCss({
                fontName: options.iconFontName,
                path: options.template,
                targetPath: getRoot(options.fontDir) + options.sassDir + "_" + options.iconFontName + ".scss",
                fontPath: options.relativeCssDir
            }))
            .pipe(iconFont({
                fontName: options.iconFontName,
                normalize: true
            }))
            .pipe(gulp.dest(options.fontDir));
    });

    this.registerWatcher("icons", options.srcDir + "*.svg");

    return this.queueTask("icons");

});