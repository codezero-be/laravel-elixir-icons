var gulp = require("gulp"),
    Elixir = require("laravel-elixir"),
    Task = Elixir.Task,
    config = Elixir.config,
    iconFont = require('gulp-iconfont'),
    iconFontCss = require('gulp-iconfont-css'),
    _  = require('underscore');

Elixir.extend("icons", function (options) {

    var defaultOptions = {
        iconsPath:      config.assetsPath + "/icons/",
        sassPath:       config.assetsPath + "/" + config.css.sass.folder + "/",
        fontPath:       config.publicPath + "/fonts/",
        relativeCssDir: "/fonts/",
        iconFontName:   "icon-font",
        template:       __dirname + "/icon-font-template.scss",
        sassFileName:   null
    };

    options = _.extend(defaultOptions, options);
    options.sassFileName = options.sassFileName ? options.sassFileName : '_' + options.iconFontName + '.scss';

    // The icon font SASS file will be saved relative to the font path
    // So we need to get to the project root => ../../../
    function getRoot(path) {
        var backPath = '',
            depth = (path.match(/\//g) || []).length;

        for (var i = 0; i < depth; i++) {
            backPath += '../';
        }

        return backPath;
    }

    new Task('icons', function() {

        return gulp.src([options.iconsPath + "*.svg"], {base: '.'})
            .pipe(iconFontCss({
                fontName: options.iconFontName,
                path: options.template,
                targetPath: getRoot(options.fontPath) + options.sassPath + options.sassFileName,
                fontPath: options.relativeCssDir
            }))
            .pipe(iconFont({
                fontName: options.iconFontName,
                normalize: true
            }))
            .pipe(gulp.dest(options.fontPath));

    })
        .watch(options.iconsPath + "*.svg");

});