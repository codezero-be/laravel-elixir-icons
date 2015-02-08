var gulp = require("gulp"),
    elixir = require("laravel-elixir"),
    utilities = require('laravel-elixir/ingredients/commands/Utilities'),
    notifications = require('laravel-elixir/ingredients/commands/Notification'),
    iconFont = require('gulp-iconfont'),
    iconFontCss = require('gulp-iconfont-css'),
    _  = require('underscore');

elixir.extend("icons", function (outputDir) {

    var config = this,
        defaultOptions = {
            srcDir:         config.assetsDir + 'icons/',
            sassDir:        config.assetsDir + "sass/",
            outputDir:      outputDir,
            iconFontName:   "icon-font",
            relativeCssDir: "/fonts/",
            template:       "icon-font-template.scss",
            insertGlobals: false,
        };

    options = _.extend(defaultOptions, options);
    //src = "./" + utilities.buildGulpSrc("", options.srcDir);



    // Get Project Root From Child Folder => ../../../
    function getRoot(path) {
        var backPath = '',
            depth = (path.match(/\//g) || []).length;

        for (var i = 0; i < depth; i++) {
            backPath += '../';
        }

        return backPath;
    }

    gulp.task("icons", function () {

        gulp.src(["./" + options.srcDir + "*.svg"], {base: '.'})
            .pipe(iconFontCss({
                fontName: options.iconFontName,
                path: options.template,
                targetPath: getRoot(options.outputDir) + options.sassDir + "_" + options.iconFontName + ".scss",
                fontPath: options.relativeCssDir
            }))
            .pipe(iconFont({
                fontName: options.iconFontName,
                normalize: true
            }))
            .pipe(gulp.dest(options.outputDir));
    });

    this.registerWatcher("icons", options.srcDir + "*.svg");

    return this.queueTask("icons");

});