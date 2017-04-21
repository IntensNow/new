"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var pug = require("gulp-pug");
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var minify = require("gulp-csso");

//cоздаем переменную с масивом всех плагинов Postccss который мы будем использовать, пока один autoprefixer будет 
	let postplugins = [
		autoprefixer({
			browsers: ["last 3 versions"]})  // поддержка последних трех версий всех браузеров
		];

	gulp.task("styles", function() {
		gulp.src("./source/sass/main.scss") // говорим какой файл взять
			.pipe(plumber())   //не обрывается при ошибках
			.pipe(sass())  // запускаем плагин
			.pipe(postcss(postplugins))  // передаем переменную postplugins 
			.pipe(gulp.dest("./public/css/")) //задаем папку куда вставлять 
			.pipe(browserSync.reload({stream: true}));
	});
//пишем таск для работы со страницами
	gulp.task("pages", function() {
		return gulp.src("./source/pages/*.pug")
			.pipe(pug({pretty: true}))  //с переносом pretty: true
			.pipe(gulp.dest("./public"))
			.pipe(browserSync.reload({stream: true}));
	});
	
	gulp.task("browser-sync", function() {
		browserSync({
			server: {
				baseDir: "public"
			},
				open: true,
				notify: false
		})
	});

	gulp.task('mincss', function(){  // пока не подключил
		return gulp.src(paths.css)
			.pipe(minify())
			.pipe(gulp.dest('main'))
			.pipe(reload({stream:true}));
	});

	gulp.task("watch", ["browser-sync"], function() {   //определим ватчер и слежение за всем изминениями , и делаем слежку за всеми файлами во всех каталог и подкаталогах

		gulp.watch(["./source/sass/main.scss", "./source/**/*.scss"], ["styles"]); // указываем какие Taski должны выполняться при изминении в этих файлах (в данном случае это "styles")
		gulp.watch("./source/**/*.pug", ["pages"]);
	});

	gulp.task("public", ["pages","styles", "watch"]); //определаем дефолтный таск и  укажем масив. То есть при определении таска, вторым аругментов может быть не только callback который выполняет все задачи, но и масивы с названиями тасков - styles and watch. При запуске gulp выполнит команду(таск) default, который выполнит styles  and watch
