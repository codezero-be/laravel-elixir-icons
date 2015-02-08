var gulp = require("gulp"),
    elixir = require("laravel-elixir"),
    iconFont = require('gulp-iconfont'),
    iconFontCss = require('gulp-iconfont-css');

elixir.extend("icons", function (outputDir) {

    var iconsName = elixir.config.iconsName || "icon-font",
        iconFontRelativeDir = elixir.config.iconFontRelativeDir || "/fonts/";
        sourceDir = elixir.config.assetsDir + "icons/",
        sassDir = elixir.config.assetsDir + "sass/",
        template = "icon-font-template.scss";


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

        gulp.src([sourceDir + "*.svg"], {base: '.'})
            .pipe(iconFontCss({
                fontName: iconsName,
                path: template,
                targetPath: getRoot(outputDir) + sassDir + "_" + iconsName + ".scss",
                fontPath: iconFontRelativeDir
            }))
            .pipe(iconFont({
                fontName: iconsName,
                normalize: true
            }))
            .pipe(gulp.dest(outputDir));
    });

    this.registerWatcher("icons", sourceDir + "*.svg");

    return this.queueTask("icons");

});